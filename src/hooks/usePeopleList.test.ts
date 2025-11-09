import { vi, it, describe, beforeEach, expect } from "vitest";
import { useInfiniteQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { usePeopleList } from "./usePeopleList";
import { mockPerson } from "@/mock/mockData";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: vi.fn(),
}));

class IntersectionObserverMock {
  callback: IntersectionObserverCallback;
  static instance: IntersectionObserverMock | null = null;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    IntersectionObserverMock.instance = this;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

describe("usePeopleList", () => {
  const mockLoadMoreRef = {
    current: document.createElement("div"),
  } as React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the query data correctly", () => {
    const mockData = { pages: [{ results: [mockPerson] }] };
    vi.mocked(useInfiniteQuery).mockReturnValue({
      data: mockData,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetching: false,
      isFetchingNextPage: false,
      status: "success",
    } as unknown as UseInfiniteQueryResult);

    const { result } = renderHook(() => usePeopleList(mockLoadMoreRef));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.status).toBe("success");
  });

  it("calls fetchNextPage when intersection occurs", () => {
    const fetchNextPage = vi.fn();
    vi.mocked(useInfiniteQuery).mockReturnValue({
      data: { pages: [{ results: [] }] },
      error: null,
      fetchNextPage,
      hasNextPage: true,
      isFetching: false,
      isFetchingNextPage: false,
      status: "success",
    } as unknown as UseInfiniteQueryResult);
    renderHook(() => usePeopleList(mockLoadMoreRef));

    const observerInstance = IntersectionObserverMock.instance!;
    observerInstance.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      observerInstance as unknown as IntersectionObserver,
    );

    expect(fetchNextPage).toHaveBeenCalled();
  });

  it("returns error when query fails", () => {
    vi.mocked(useInfiniteQuery).mockReturnValue({
      data: null,
      error: { message: "Failed" },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
      status: "error",
    } as unknown as UseInfiniteQueryResult);

    const { result } = renderHook(() => usePeopleList(mockLoadMoreRef));

    expect(result.current.error).toEqual({ message: "Failed" });
    expect(result.current.status).toBe("error");
  });
});
