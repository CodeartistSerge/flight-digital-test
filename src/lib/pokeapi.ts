import type { PokemonListResponse, PokemonResource, PokemonResourcePruned } from "@/lib/types/pokeapi";

const API_ROOT = "https://pokeapi.co/api/v2";

// This should load the whole thing in ~3 secods
// Being fairly generous to the API, not bombarding it close to DDOS rates :)

async function fetchJSON<T>(url: string):Promise<T> {

  const data = await fetch(url, {
        next: { revalidate: 20 } // in 24hrs / 86400s
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`ERROR: ${res.status} / ${url}`);
        }
        console.log('[getAllPokemon] Response status:', res.status);
        return (await res.json()) as T;
      });
  return data as T;
}

/** First 151 Pokémon, mapped to UI‑friendly shape */
export async function getAllPokemon():Promise<PokemonResourcePruned[]> {
  const { results } = await fetchJSON<PokemonListResponse>(
    `${API_ROOT}/pokemon?limit=151`
  );
  /**
   * Shape of results is:
   * [
   *  {
   *    name:string,
   *    url:string
   *  },
   *  ...
   * ]
   */

  const pokemons = await Promise.all(
    results.map(async ({ url }) => {
      const p = await fetchJSON<PokemonResource>(url);
      const image = p.sprites.other["official-artwork"].front_default ?? "/placeholder.svg";

      return {
        ...p,
        image: image
      };
    })
  );

  return pokemons.map(v => ({
    id: v.id,
    name: v.name,
    image: v.image,
    types: v.types
  }));
}

export async function getPokemon(idOrName:number | string):Promise<PokemonResource> {
  return await fetchJSON<PokemonResource>(
    `${API_ROOT}/pokemon/${idOrName}`
  );
}
