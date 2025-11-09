import { describe, it, expect } from "vitest";
import {
  createRootNode,
  createFilmNodes,
  createStarshipNodes,
  createFilmEdges,
  createFilmToShipEdges,
} from "./graph";
import type { Starship } from "@/types/types";

import { mockPerson, mockFilms, mockStarships } from "@/mock/mockData";

describe("Graph Utils", () => {
  describe("createRootNode", () => {
    it("creates node with default position", () => {
      const node = createRootNode(mockPerson);
      expect(node).toEqual({
        id: "11",
        data: { label: "Anakin Skywalker" },
        position: { x: 250, y: 5 },
        type: "default",
      });
    });

    it("creates node with custom position", () => {
      const node = createRootNode(mockPerson, { x: 100, y: 100 });
      expect(node.position).toEqual({ x: 100, y: 100 });
    });
  });

  describe("createFilmNodes", () => {
    it("creates correct number of film nodes with default spacing", () => {
      const nodes = createFilmNodes(mockFilms);
      expect(nodes).toHaveLength(3);
      expect(nodes[0].position).toEqual({ x: 50, y: 150 });
      expect(nodes[1].position).toEqual({ x: 250, y: 150 });
      expect(nodes[2].position).toEqual({ x: 450, y: 150 });
    });

    it("creates film nodes with custom spacing", () => {
      const nodes = createFilmNodes(mockFilms, { startY: 200, xDistance: 300 });
      expect(nodes[0].position).toEqual({ x: 50, y: 200 });
      expect(nodes[1].position).toEqual({ x: 350, y: 200 });
    });
  });

  describe("createStarshipNodes", () => {
    it("creates correct number of starship nodes with default spacing", () => {
      const nodes = createStarshipNodes(mockStarships);
      expect(nodes).toHaveLength(3);
      expect(nodes[0].position).toEqual({ x: 30, y: 350 });
      expect(nodes[1].position).toEqual({ x: 200, y: 350 });
      expect(nodes[2].position).toEqual({ x: 370, y: 350 });
    });

    it("creates starship nodes with custom spacing", () => {
      const nodes = createStarshipNodes(mockStarships, {
        startY: 400,
        xDistance: 250,
      });
      expect(nodes[0].position).toEqual({ x: 30, y: 400 });
      expect(nodes[1].position).toEqual({ x: 280, y: 400 });
    });
  });

  describe("createFilmEdges", () => {
    it("creates correct edges from root to films", () => {
      const edges = createFilmEdges("1", mockFilms);
      expect(edges).toHaveLength(3);
      expect(edges[0]).toEqual({
        id: "edge-1-5",
        source: "1",
        target: "5",
      });
      expect(edges[1]).toEqual({
        id: "edge-1-6",
        source: "1",
        target: "6",
      });
    });
  });

  describe("createFilmToShipEdges", () => {
    it("creates correct edges between films and starships", () => {
      const edges = createFilmToShipEdges(mockFilms, mockStarships);
      expect(edges).toHaveLength(5);
    });

    it("handles empty starships array", () => {
      const edges = createFilmToShipEdges(mockFilms, []);
      expect(edges).toHaveLength(0);
    });
    it("only creates edges for matching starships", () => {
      const limitedStarships: Starship[] = [mockStarships[0]];
      const edges = createFilmToShipEdges(mockFilms, limitedStarships);
      expect(edges).toHaveLength(1);
      expect(edges.every((edge) => edge.target === "1")).toBe(false);
    });
  });
});
