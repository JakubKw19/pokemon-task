// import React from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import type { PokemonListResponse } from "../types/pokemonTypes";
import { Card, Pagination } from "@mui/material";
import Loading from "../components/Loading";

export default function PokemonList() {
  const pokemonList = useLoaderData() as PokemonListResponse;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const currentLimit = Number(searchParams.get("limit") ?? "20");

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    navigate(`/?page=${page}&limit=${currentLimit}`);
  };

  if (navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        {pokemonList.results.map((pokemon) => (
          <Card
            key={pokemon.name}
            className="p-3 flex flex-col items-center justify-center"
          >
            <Link
              to={`/pokemon/${pokemon.id}`}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <img
                src={pokemon.img}
                alt={pokemon.name}
                loading="lazy"
                className="w-20 h-20 object-contain mb-2"
              />
              <h3 className="font-semibold capitalize">{pokemon.name}</h3>
            </Link>
          </Card>
        ))}
      </div>
      <Pagination
        className="flex justify-center w-full mt-10"
        count={Math.ceil(pokemonList.count / currentLimit)}
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
