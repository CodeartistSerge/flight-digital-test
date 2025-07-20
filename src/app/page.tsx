import { headers } from "next/headers";
import Container from "@/app/components/layout/container";
import PokemonGrid from "./components/home/pokemonGrid";
import { PokemonResource } from "@/lib/types/pokeapi";

export default async function Home() {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") || "http"; // works for Vercel or local
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/fetchEmAll`, {
    cache: "no-store", // ensures freshness on each request (disable Next.js page caching)
  });
  if (!res.ok) {
    throw new Error("Proxy endpoint not responding");
  }
  const { data }: { data: PokemonResource[] } = await res.json();
  return (
    <Container>
      <PokemonGrid pokemons={data} />
    </Container>
  );
}