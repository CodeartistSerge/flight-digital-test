import type { PokemonListResponse, PokemonResource } from "@/types/pokeapi";
import pQueue from "p-queue";
import pTimeout from "p-timeout";

const API_ROOT = "https://pokeapi.co/api/v2";
const cache = new Map<string, unknown>();

// This should load the whole thing in ~3 secods
// Being fairly generous to the API, not bombarding it close to DDOS rates :)
const queue = new pQueue({
  concurrency: 10,
  intervalCap: 50,
  interval: 1000,
});

async function fetchJSON<T>(url: string):Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;

  const data = await queue.add(() =>
    pTimeout(
      fetch(url).then(async (res) => {
        if (!res.ok) {
          throw new Error(`ERROR: ${res.status} / ${url}`);
        }
        return (await res.json()) as T;
      }),
      {
        milliseconds: 5000,
        message: 'bail out if hangs for 10 sec',
      }
    )
  );

  cache.set(url, data);
  return data as T;
}

/** First 151 Pokémon, mapped to UI‑friendly shape */
export async function getAllPokemon():Promise<PokemonResource[]> {
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

  return pokemons;
}

export async function getPokemon(idOrName:number | string):Promise<PokemonResource> {
  return await fetchJSON<PokemonResource>(
    `${API_ROOT}/pokemon/${idOrName}`
  );
}
