// import React from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import type { PokemonListResponse } from "../types/pokemonTypes";
import { Button, Card, Pagination, TextField } from "@mui/material";
import Loading from "../components/Loading";
import React from "react";

export default function PokemonList() {
  const [search, setSearch] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
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
    if (isSearching) {
      navigate(
        `/?page=${page}&limit=${currentLimit}&name=${encodeURIComponent(
          search
        )}&max=${pokemonList.count}`
      );
    } else {
      navigate(`/?page=${page}&limit=${currentLimit}`);
    }
  };

  const handleSearchChange = () => {
    setIsSearching(true);
    if (!search.trim()) {
      setIsSearching(false);
      navigate(`/?page=1&limit=${currentLimit}`);
    }
    navigate(
      `/?page=1&limit=${currentLimit}&name=${encodeURIComponent(search)}&max=${
        pokemonList.count
      }`
    );
  };

  if (navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex w-full justify-end">
        <div className="flex items-center gap-2 m-2">
          <TextField
            label="Search Pokémon"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" onClick={handleSearchChange}>
            Search
          </Button>
        </div>
      </div>
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
        count={
          pokemonList.countSearch
            ? Math.ceil(pokemonList.countSearch / currentLimit)
            : Math.ceil(pokemonList.count / currentLimit)
        }
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
