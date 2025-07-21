export interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonSpecies {
  id: number;
  name: string;
  has_gender_differences: boolean;
  flavor_text_entries: {
    flavor_text: string;
  }[];
  form_descriptions: {
    description: string
  }[];
}

export interface PokemonResource {
  id: number;
  name: string;
  image?: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  species: {
    url: string;
  }
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string; url: string };
  }[];
}

export interface PokemonResourcePruned {
  id: number;
  name: string;
  image?: string;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
}