import React from "react";
import { fetchGeneration } from "@/lib/actions";
import List from "@/components/List";
import { PokemonContextProvider } from "@/context/PokemonContext";

const Home = async () => {
  const initialPokemons = await fetchGeneration(1);

  return (
    <>
      <PokemonContextProvider initialPokemons={initialPokemons}>
        <List />
      </PokemonContextProvider>
    </>
  );
};

export default Home;
