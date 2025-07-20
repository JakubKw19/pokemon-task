import type { PokemonListResponse } from "../types/pokemonTypes";

export async function fetchPokemonList(
  page: number,
  limit: number,
  name?: string,
  max?: number
): Promise<PokemonListResponse> {
  if (name && max) {
    const data = await fetchAllFilteredPokemons(name, max);
    if (!data) {
      throw new Response("Failed to load Pokémon list.", { status: 500 });
    }
    data.countSearch = data.results.length;
    data.results = data.results.slice((page - 1) * limit, page * limit);
    return data;
  }
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

export async function fetchAllFilteredPokemons(
  name: string,
  limit: number
): Promise<PokemonListResponse> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
  );
  if (res.status === 404) {
    throw new Response("Not found", { status: 404 });
  }
  if (!res.ok) {
    throw new Response("Failed to load Pokémon list.", { status: res.status });
  }

  const data = (await res.json()) as PokemonListResponse;
  data.results = data.results.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(name.toLowerCase())
  );

  return data;
}
