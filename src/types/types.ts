export type Person = {
  id?: number;
  name: string;
  birth_year?: string;
  eye_color?: string;
  gender?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  skin_color?: string;
  homeworld?: number | string;
  films?: number[]; // API docs show numeric IDs in arrays
  species?: number[];
  starships?: number[];
  vehicles?: number[];
  url?: string;
  created?: string;
  edited?: string;
};
