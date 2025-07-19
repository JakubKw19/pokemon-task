import type { PokemonListResponse } from "../types/pokemonTypes";

export async function fetchPokemonList(
  page: number,
  limit: number
): Promise<PokemonListResponse> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
      (page - 1) * limit
    }`
  );
  if (res.status === 404) {
    throw new Response("Not found", { status: 404 });
  }
  if (!res.ok) {
    throw new Response("Failed to load Pokemon list.", { status: res.status });
  }
  return (await res.json()) as PokemonListResponse;
}

export async function fetchPokemonDetails(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (res.status === 404) {
    throw new Response("Not found", { status: 404 });
  }
  if (!res.ok) {
    throw new Response("Failed to load Pokemon details.", {
      status: res.status,
    });
  }
  return await res.json();
}
