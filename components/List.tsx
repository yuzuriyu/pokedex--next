"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Card from "./Card";
import { PokemonType } from "@/types/interface";
import Header from "./Header";
import { PokemonContext } from "@/context/PokemonContext";

const List = () => {
  const {
    pokemonList,
    setPokemonList,
    setSelectedPokemon,
    selectedPokemon,
    searchQuery,
  } = useContext(PokemonContext);

  const reverseList = () => {
    setPokemonList((prevList) => [...prevList].reverse()); // Reverse the list
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const typeColors: { [key: string]: string } = {
    normal: "bg-[#A8A878]", // Normal
    fire: "bg-[#F08030]", // Fire
    water: "bg-[#6890F0]", // Water
    electric: "bg-[#F8D030]", // Electric
    grass: "bg-[#78C850]", // Grass
    ice: "bg-[#98D8D8]", // Ice
    fighting: "bg-[#C03028]", // Fighting
    poison: "bg-[#A040A0]", // Poison
    ground: "bg-[#E0C068]", // Ground
    flying: "bg-[#A890F0]", // Flying
    psychic: "bg-[#F85888]", // Psychic
    bug: "bg-[#A8B820]", // Bug
    rock: "bg-[#B8A038]", // Rock
    ghost: "bg-[#705898]", // Ghost
    dragon: "bg-[#7038F8]", // Dragon
    dark: "bg-[#705848]", // Dark
    steel: "bg-[#B8B8D0]", // Steel
    fairy: "bg-[#F0A0A0]", // Fairy
  };

  // Lighter background colors for Pokémon images
  const imageBgColors: { [key: string]: string } = {
    normal: "bg-[#E0E0E0]", // Normal
    fire: "bg-[#F7D1C1]", // Fire
    water: "bg-[#D0E0F0]", // Water
    electric: "bg-[#FDF6C3]", // Electric
    grass: "bg-[#D9F2D9]", // Grass
    ice: "bg-[#D3F0F0]", // Ice
    fighting: "bg-[#F4B3B3]", // Fighting
    poison: "bg-[#D8A8D8]", // Poison
    ground: "bg-[#F4E8C6]", // Ground
    flying: "bg-[#D6D8F0]", // Flying
    psychic: "bg-[#F9D5D6]", // Psychic
    bug: "bg-[#D9E4B8]", // Bug
    rock: "bg-[#D0B9A8]", // Rock
    ghost: "bg-[#D9C7E1]", // Ghost
    dragon: "bg-[#D8C0F4]", // Dragon
    dark: "bg-[#D1BEB2]", // Dark
    steel: "bg-[#D2D3D8]", // Steel
    fairy: "bg-[#FDD6D6]", // Fairy
  };

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const toggleCard = () => {
    setIsCardOpen((prevStatus) => !prevStatus);
  };

  return (
    <>
      <Header reverseList={reverseList} />

      <div className="w-11/12 m-auto md:w-5/12">
        {filteredPokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => {
              setSelectedPokemon(pokemon);
              toggleCard();
            }}
            className={`flex mb-8 rounded-lg p-2 ${pokemon.types
              .map((type) => imageBgColors[pokemon.types[0]] || "bg-gray-200")
              .join(" ")}`}
          >
            <div className="w-1/2">
              <p className="text-sm">#{pokemon.id}</p>
              <p className="text-xl font-bold ">
                {capitalizeFirstLetter(pokemon.name)}
              </p>
              <div className="flex my-4">
                {pokemon.types.map((type, index) => (
                  <div
                    key={type}
                    className={`${
                      typeColors[type]
                    } flex py-1 px-3 rounded-full ${index === 0 ? "mr-2" : ""}`} // Add mr-2 to the first type only
                  >
                    <div className="bg-white rounded-full p-1 mr-2 w-6 h-6 flex items-center align-middle">
                      <Image
                        src={`/images/${type}.png`} // Ensure the type image path is correct
                        alt={type}
                        width={12}
                        height={12}
                        className="m-auto"
                      />
                    </div>
                    <p
                      className={` text-white text-sm ${index === 0 ? "" : ""}`}
                    >
                      {capitalizeFirstLetter(type)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`w-1/2 relative`}>
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={150}
                height={150}
                className="absolute -top-8 -right-4 z-20"
              />

              <div />
              <div className="relative  h-full w-full">
                <Image
                  src={`/images/pokeball.png`}
                  alt=""
                  width={125}
                  height={125}
                  className=" absolute z-10  top-1/2 -translate-y-1/2 right-0 opacity-20"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {isCardOpen && selectedPokemon && (
        <Card toggleCard={toggleCard} setSelectedPokemon={setSelectedPokemon} />
      )}
    </>
  );
};

export default List;
