import Wrapper from "@/app/components/layout/wrapper";
import PokemonProfile from "@/app/components/page/pokemonProfile";
import { API_ROOT, fetchJSON } from "@/lib/pokeapi";
import { PokemonResource, PokemonSpecies } from "@/lib/types/pokeapi";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Pokemon({ params }: Props) {
  try {
    const reqParams = await params;
    // It's a single page request + Next.js caches the responses for 24hrs, so it should be safe w/o proxy & disk cache
    const data = await fetchJSON<PokemonResource>(`${API_ROOT}/pokemon/${reqParams.id}`);
    const species = await fetchJSON<PokemonSpecies>(`${data.species.url}`);
    return (
      <Wrapper>
        <PokemonProfile data={data} species={species} />
      </Wrapper>
    );
  } catch {
    return notFound();
  }
}