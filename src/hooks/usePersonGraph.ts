import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchPerson, fetchFilm, fetchStarship } from "@/queries/queries";
import { useParams } from "react-router";
import type { Node, Edge } from "@xyflow/react";
import {
  createFilmNodes,
  createFilmEdges,
  createFilmToShipEdges,
  createRootNode,
  createStarshipNodes,
} from "@/utils/graph";

type GraphData = {
  personName: string;
  nodes: Node[];
  edges: Edge[];
  isLoading: boolean;
  error?: string | null;
};

export function usePersonGraph(): GraphData {
  const { personId } = useParams<{ personId: string }>();

  const { data: person } = useQuery({
    queryKey: ["person", personId],
    queryFn: () => fetchPerson(Number(personId)),
    enabled: Boolean(personId),
  });

  const filmQueries = useQueries({
    queries: (person?.films ?? []).map((filmId) => ({
      queryKey: ["film", filmId],
      queryFn: () => fetchFilm(filmId),
      enabled: Boolean(person),
    })),
  });

  const starshipIds = person?.starships || [];

  const starshipQueries = useQueries({
    queries: starshipIds.map((shipId) => ({
      queryKey: ["starship", shipId],
      queryFn: () => fetchStarship(shipId),
      enabled: Boolean(starshipIds.length),
    })),
  });

  return useMemo((): GraphData => {
    if (!person)
      return { personName: "", nodes: [], edges: [], isLoading: false };

    const rootId = person.id.toString();
    // Filter out only successful queries
    const films = filmQueries.filter((q) => q.isSuccess).map((q) => q.data);
    const starships = starshipQueries
      .filter((starshipQuery) => starshipQuery.isSuccess)
      .map((starshipQuery) => starshipQuery.data);

    // Create graph nodes and edges
    const rootNode = createRootNode(person);
    const filmNodes = createFilmNodes(films);
    const filmEdges = createFilmEdges(rootId, films);
    const starshipNodes = createStarshipNodes(starships);
    const filmToShipEdges = createFilmToShipEdges(films, starships);

    const isLoading =
      filmQueries.some((query) => query.isLoading) ||
      starshipQueries.some((query) => query.isLoading);

    const errors = [...filmQueries, ...starshipQueries]
      .map((query) => query.error)
      .filter(Boolean);
    const error = errors.length ? errors[0]?.toString() : null;

    return {
      personName: person.name,
      nodes: [rootNode, ...filmNodes, ...starshipNodes],
      edges: [...filmEdges, ...filmToShipEdges],
      isLoading,
      error,
    };
  }, [person, filmQueries, starshipQueries]);
}
