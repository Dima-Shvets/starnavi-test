import { renderHook } from "@testing-library/react";
import { vi, it, describe, beforeEach, expect } from "vitest";
import { usePersonGraph } from "./usePersonGraph";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useParams } from "react-router";
import { mockPerson, mockFilms, mockStarships } from "@/mock/mockData";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Person } from "@/types/types";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useQueries: vi.fn(),
}));

vi.mock("react-router", () => ({
  useParams: vi.fn(),
}));

vi.mock("@/queries/queries", () => ({
  fetchPerson: vi.fn(),
  fetchFilm: vi.fn(),
  fetchStarship: vi.fn(),
}));

vi.mock("@/utils/graph", () => ({
  createRootNode: vi.fn(() => ({ id: "root" })),
  createFilmNodes: vi.fn(() => [{ id: "film1" }]),
  createFilmEdges: vi.fn(() => [{ id: "edge1" }]),
  createStarshipNodes: vi.fn(() => [{ id: "ship1" }]),
  createFilmToShipEdges: vi.fn(() => [{ id: "edge2" }]),
}));

describe("usePersonGraph", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useParams).mockReturnValue({ personId: "1" });
  });

  it("returns empty graph when person not loaded", () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
    } as unknown as UseQueryResult<Person, Error>);
    const { result } = renderHook(() => usePersonGraph());
    expect(result.current).toEqual({
      personName: "",
      nodes: [],
      edges: [],
      isLoading: false,
    });
  });

  it("returns graph data when person and films/starships loaded", () => {
    vi.mocked(useQuery).mockReturnValue({
      data: mockPerson,
    } as unknown as UseQueryResult<Person, Error>);
    vi.mocked(useQueries)
      .mockReturnValueOnce([
        {
          isSuccess: true,
          data: mockFilms[0],
          isLoading: false,
        },
      ])
      .mockReturnValueOnce([
        { isSuccess: true, data: mockStarships[0], isLoading: false },
      ]);

    const { result } = renderHook(() => usePersonGraph());

    expect(result.current.personName).toBe("Anakin Skywalker");
    expect(result.current.nodes).toEqual([
      { id: "root" },
      { id: "film1" },
      { id: "ship1" },
    ]);
    expect(result.current.edges).toEqual([{ id: "edge1" }, { id: "edge2" }]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets isLoading when any query is loading", () => {
    vi.mocked(useQuery).mockReturnValue({
      data: mockPerson,
    } as unknown as UseQueryResult<Person, Error>);
    vi.mocked(useQueries)
      .mockReturnValueOnce([{ isLoading: true }]) // films
      .mockReturnValueOnce([{ isLoading: false }]); // ships
    const { result } = renderHook(() => usePersonGraph());
    expect(result.current.isLoading).toBe(true);
  });

  it("sets error when a query fails", () => {
    vi.mocked(useQuery).mockReturnValue({
      data: mockPerson,
    } as unknown as UseQueryResult<Person, Error>);
    vi.mocked(useQueries)
      .mockReturnValueOnce([
        { isSuccess: false, error: new Error("film failed") },
      ])
      .mockReturnValueOnce([{ isSuccess: true, data: mockStarships[0] }]);

    const { result } = renderHook(() => usePersonGraph());
    expect(result.current.error).toContain("film failed");
  });
});
