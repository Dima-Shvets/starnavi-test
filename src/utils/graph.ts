import type { Person, Film, Starship } from "@/types/types";
import type { Node, Edge } from "@xyflow/react";

export const createRootNode = (
  person: Person,
  initialPosition: { x: number; y: number } = { x: 250, y: 5 },
): Node => ({
  id: person.id.toString(),
  data: { label: person.name },
  position: initialPosition,
  type: "default",
});

/**
 * Creates an array of nodes representing films
 * @param films - Array of Film objects to create nodes from
 * @param options - Optional configuration object
 * @param options.startY - Starting Y coordinate for the nodes (defaults to 150)
 * @param options.xDistance - Horizontal distance between nodes (defaults to 200)
 * @returns Array of Node objects representing films
 */
export const createFilmNodes = (
  films: Film[],
  options?: { startY?: number; xDistance?: number },
): Node[] =>
  films.map((film, index) => ({
    id: film.id.toString(),
    data: { label: film.title },
    position: {
      x: 50 + index * (options?.xDistance || 200),
      y: options?.startY || 150,
    },
  }));

export const createStarshipNodes = (
  starships: Starship[],
  options?: { startY?: number; xDistance?: number },
): Node[] =>
  starships.map((starship, index) => ({
    id: starship.id.toString(),
    data: { label: starship.name },
    position: {
      x: 30 + index * (options?.xDistance || 170),
      y: options?.startY || 350,
    },
  }));

export const createFilmEdges = (rootId: string, films: Film[]): Edge[] =>
  films.map((film) => ({
    id: `edge-${rootId}-${film.id}`,
    source: rootId,
    target: film.id.toString(),
  }));

export const createFilmToShipEdges = (
  films: Film[],
  starships: Starship[],
): Edge[] => {
  const starshipIds = new Set(starships.map((starship) => starship.id));

  return films.flatMap((film) => {
    const filmNodeId = film.id.toString();
    return film.starships
      .filter((filmStarshipId) => starshipIds.has(filmStarshipId))
      .map((filmStarshipId) => ({
        id: `edge-${filmNodeId}-${filmStarshipId}`,
        source: filmNodeId,
        target: filmStarshipId.toString(),
      }));
  });
};
