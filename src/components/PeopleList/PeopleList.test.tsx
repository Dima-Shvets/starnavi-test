import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import PeopleList from "./PeopleList";
import { usePeopleList } from "@/hooks/usePeopleList";
import { mockPeople } from "@/mock/mockData";
import { PEOPLE_ENDPOINT } from "@/consts/api";

vi.mock("@/hooks/usePeopleList", () => ({
  usePeopleList: vi.fn(),
}));

vi.mock("@/components/PersonCard", () => ({
  default: vi.fn(({ person }) => (
    <div data-testid="person-card">{person.name}</div>
  )),
}));

export const mockPage = {
  results: mockPeople,
  count: 2,
  next: `${PEOPLE_ENDPOINT}?page=2`,
  previous: `${PEOPLE_ENDPOINT}`,
};

describe("PeopleList", () => {
  it("renders title", () => {
    vi.mocked(usePeopleList).mockReturnValue({
      data: { pages: [mockPage], pageParams: [null] },
      isFetching: false,
      hasNextPage: false,
      error: null,
      isFetchingNextPage: false,
      status: "success",
    });
    render(<PeopleList />);
    expect(screen.getByText(/list of star wars heroes/i)).toBeInTheDocument();
  });

  it("renders person cards", () => {
    vi.mocked(usePeopleList).mockReturnValue({
      data: { pages: [mockPage], pageParams: [null] },
      isFetching: false,
      hasNextPage: false,
      error: null,
      isFetchingNextPage: false,
      status: "success",
    });
    render(<PeopleList />);
    const cards = screen.getAllByTestId("person-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Anakin Skywalker");
    expect(cards[1]).toHaveTextContent("Luke Skywalker");
  });

  it("shows skeletons when fetching", () => {
    vi.mocked(usePeopleList).mockReturnValue({
      data: undefined,
      isFetching: true,
      hasNextPage: false,
      error: null,
      isFetchingNextPage: false,
      status: "pending",
    });
    render(<PeopleList />);
    // Each PeopleListSkeleton renders 10 <li> elements
    const skeletons = screen.getAllByRole("listitem");
    expect(skeletons).toHaveLength(10);
  });

  it("shows error message", () => {
    vi.mocked(usePeopleList).mockReturnValue({
      data: undefined,
      isFetching: false,
      hasNextPage: false,
      error: { name: "Error Name", message: "Failed to fetch people" },
      isFetchingNextPage: false,
      status: "error",
    });
    render(<PeopleList />);
    expect(screen.getByText("Failed to fetch people")).toBeInTheDocument();
  });

  it("renders the loadMore target div", () => {
    vi.mocked(usePeopleList).mockReturnValue({
      data: { pages: [mockPage], pageParams: [null] },
      isFetching: false,
      hasNextPage: false,
      error: null,
      isFetchingNextPage: false,
      status: "success",
    });
    render(<PeopleList />);
    expect(document.querySelector(".target")).toBeInTheDocument();
  });
});
