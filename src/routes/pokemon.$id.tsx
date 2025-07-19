import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";
import type { PokemonDetails } from "../types/pokemonTypes";

export default function PokemonId() {
  const pokemon = useLoaderData() as PokemonDetails;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold capitalize text-center">
        {pokemon.name}
      </h1>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-48 h-48 mx-auto mt-4 object-contain"
        loading="lazy"
      />

      <section className="mt-6">
        <h2 className="font-semibold">Types</h2>
        <ul className="list-disc list-inside capitalize">
          {pokemon.types.map((t) => (
            <li key={t.type.name}>{t.type.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Abilities</h2>
        <ul className="list-disc list-inside capitalize">
          {pokemon.abilities.map((a) => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Stats</h2>
        <ul className="list-disc list-inside capitalize">
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
