export type Person = {
  id: number;
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: number;
  films: number[];
  species: number[];
  starships: number[];
  vehicles: number[];
  url: string;
  created: string;
  edited: string;
};

export type Film = {
  id: number;
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  characters: number[];
  planets: number[];
  starships: number[];
  vehicles: number[];
  url: string;
  created: string;
  edited: string;
};

export type Starship = {
  id: number;
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  films: number[];
  pilots: number[];
  url: string;
  created: string;
  edited: string;
};
