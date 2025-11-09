import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PersonGraph from "./PersonGraph";
import { usePersonGraph } from "@/hooks/usePersonGraph";
import type { ReactNode } from "react";

vi.mock("@/hooks/usePersonGraph", () => ({
  usePersonGraph: vi.fn(),
}));

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("@xyflow/react", () => ({
  ReactFlow: ({ children }: { children?: ReactNode }) => (
    <div data-testid="reactflow">{children}</div>
  ),
  Background: () => <div />,
}));

describe("PersonGraph", () => {
  it("shows skeleton while loading", () => {
    vi.mocked(usePersonGraph).mockReturnValue({
      personName: "Luke",
      nodes: [],
      edges: [],
      isLoading: true,
      error: null,
    });
    render(<PersonGraph />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument(); // or use getByTestId if Skeleton doesn’t have role
  });
  it("shows error message", () => {
    vi.mocked(usePersonGraph).mockReturnValue({
      personName: "Luke",
      nodes: [],
      edges: [],
      isLoading: false,
      error: "Failed to load",
    });
    render(<PersonGraph />);
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });
  it("renders ReactFlow when data is loaded", () => {
    vi.mocked(usePersonGraph).mockReturnValue({
      personName: "Luke",
      nodes: [{ id: "1", position: { x: 0, y: 0 }, data: { label: "A" } }],
      edges: [],
      isLoading: false,
      error: null,
    });
    render(<PersonGraph />);
    expect(screen.getByTestId("reactflow")).toBeInTheDocument();
  });
  it("displays correct title", () => {
    vi.mocked(usePersonGraph).mockReturnValue({
      personName: "Luke",
      nodes: [],
      edges: [],
      isLoading: false,
      error: null,
    });
    render(<PersonGraph />);
    expect(
      screen.getByText("Films and Starships Graph of Luke"),
    ).toBeInTheDocument();
  });
});
