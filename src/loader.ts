import type { LoaderFunctionArgs } from "react-router-dom";
import { fetchPokemonDetails, fetchPokemonList } from "./api/fetchPokemon";
import type { PokemonListResponse } from "./types/pokemonTypes";

export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export async function pokemonListLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const limit = Number(url.searchParams.get("limit") ?? "20");
  const list = (await fetchPokemonList(page, limit)) as PokemonListResponse;
  if (!list) {
    throw new Response("Failed to load Pokemon list.", { status: 500 });
  }
  for (const pokemon of list.results) {
    const url = pokemon.url;
    const id = getPokemonIdFromUrl(url);
    pokemon.id = id;
    pokemon.img = getSpriteUrl(id);
  }
  return list;
}

export async function pokemonDetailsLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response("Pokémon id is required.", { status: 400 });
  }
  return fetchPokemonDetails(id);
}
