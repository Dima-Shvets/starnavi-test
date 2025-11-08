import type { Person, Film, Starship } from "@/types/types";

import {
  PEOPLE_ENDPOINT,
  FILMS_ENDPOINT,
  STARSHIPS_ENDPOINT,
} from "@/consts/api";

const safeFetch = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return await res.json();
};

export const getPeople = async ({
  pageParam = 1,
}): Promise<{
  results: Person[];
  count?: number;
  next?: string;
  previous?: string;
}> => {
  const url = `${PEOPLE_ENDPOINT}?page=${pageParam}`;
  return safeFetch(url);
};

export async function fetchPerson(id: number): Promise<Person> {
  return safeFetch<Person>(`${PEOPLE_ENDPOINT}/${id}/`);
}

export async function fetchFilm(id: number): Promise<Film> {
  return safeFetch<Film>(`${FILMS_ENDPOINT}/${id}/`);
}

export async function fetchStarship(id: number): Promise<Starship> {
  return safeFetch<Starship>(`${STARSHIPS_ENDPOINT}/${id}/`);
}
