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
  // Create a set of all starship IDs for quick lookup
  const starshipIds = new Set(starships.map((starship) => starship.id));

  // For each film, create edges to starships that exist in the starships array
  return films.flatMap((film) => {
    const filmNodeId = film.id.toString();

    // Filter the film's starships to only those present in the starshipIds set
    return (
      film.starships
        .filter((filmStarshipId) => starshipIds.has(filmStarshipId))
        // For each matching starship, create an edge from the film to the starship
        .map((filmStarshipId) => ({
          id: `edge-${filmNodeId}-${filmStarshipId}`,
          source: filmNodeId,
          target: filmStarshipId.toString(),
        }))
    );
  });
};
