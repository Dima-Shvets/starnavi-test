import type { Person } from "@/types/types";

import { PEOPLE_ENDPOINT } from "@/consts/api";

const safeFetch = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
  const res = await fetch(url, { signal });
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
