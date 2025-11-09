import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { MemoryRouter } from "react-router";
import PersonCard from "./PersonCard";
import { mockPerson } from "@/mock/mockData";

describe("PersonCard", () => {
  it("renders all person details", () => {
    render(
      <MemoryRouter>
        <PersonCard person={mockPerson} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Anakin Skywalker")).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/birth year: 41.9BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 188 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/mass: 84 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/hair color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/eyes color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/skin color: fair/i)).toBeInTheDocument();
  });

  it("links to the correct person page", () => {
    render(
      <MemoryRouter>
        <PersonCard person={mockPerson} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/person/11");
  });
});
