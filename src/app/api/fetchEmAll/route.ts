import { NextResponse } from "next/server";
import { getAllPokemon } from "@/lib/pokeapi";
import { PokemonResource, PokemonResourcePruned } from "@/lib/types/pokeapi";
import fs from "fs/promises";
import path from "path";

const CACHE_FILE = path.resolve(".cache/pokemon-cache.json");
const TTL_MS = 60 * 60 * 1000; // 1 hour

type CacheData = {
  lastFetched: number;
  data: PokemonResourcePruned[];
};

async function saveCache(data: PokemonResourcePruned[]) {
  const payload: CacheData = {
    lastFetched: Date.now(),
    data,
  };
  await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(payload, null, 2));
}

async function loadCache(): Promise<CacheData | null> {
  try {
    const json = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(json) as CacheData;
  } catch {
    return null;
  }
}

export async function GET() {
  const cache = await loadCache();
  const now = Date.now();

  if (cache && now - cache.lastFetched < TTL_MS) {
    return NextResponse.json({
      source: "disk cache",
      data: cache.data,
    });
  }

  try {
    const freshData = await getAllPokemon();
    await saveCache(freshData);

    return NextResponse.json({
      source: "pokeapi",
      data: freshData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch",
        data: cache?.data ?? [],
      }
    );
  }
}
