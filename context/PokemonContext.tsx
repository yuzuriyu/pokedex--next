"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { fetchGeneration } from "@/lib/actions"; // Make sure this function is correctly typed
import { PokemonType } from "@/types/interface"; // Ensure this interface is defined correctly

interface PokemonContextProps {
  pokemonList: PokemonType[]; // Updated to use the correct type
  setPokemonList: React.Dispatch<React.SetStateAction<PokemonType[]>>;
  selectedPokemon: PokemonType | null; // Assuming it can be null initially
  setSelectedPokemon: React.Dispatch<React.SetStateAction<PokemonType | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleGenerationClick: (generation: number) => void;
  selectedGen: number; // Include selectedGen in the context
  setSelectedGen: React.Dispatch<React.SetStateAction<number>>; // Include setter for selectedGen
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

const PokemonContextProvider: React.FC<{
  children: ReactNode;
  initialPokemons: PokemonType[]; // Ensure this uses the correct type
}> = ({ children, initialPokemons }) => {
  const [pokemonList, setPokemonList] =
    useState<PokemonType[]>(initialPokemons);
  const [selectedGen, setSelectedGen] = useState<number>(1); // Default to Gen 1
  const [currentGenData, setCurrentGenData] =
    useState<PokemonType[]>(initialPokemons);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input

  // Fetch data whenever the selected generation changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGeneration(selectedGen);
        setCurrentGenData(data);
        setPokemonList(data); // Populate pokemonList with the fetched data
      } catch (error) {
        console.error(
          `Error fetching data for Generation ${selectedGen}:`,
          error
        );
      }
    };
    fetchData();
  }, [selectedGen]);

  // Function to handle generation change
  const handleGenerationClick = (generation: number) => {
    setSelectedGen(generation); // Update the selected generation state
  };

  const value: PokemonContextProps = {
    pokemonList,
    setPokemonList,
    selectedPokemon,
    setSelectedPokemon,
    searchQuery,
    setSearchQuery,
    handleGenerationClick,
    selectedGen, // Include selectedGen in the context value
    setSelectedGen, // Include setter for selectedGen
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonContextProvider };

export default PokemonContextProvider;
