import React, { useContext } from "react";
import Image from "next/image";
import Info from "./Info";
import { PokemonType } from "@/types/interface";
import { PokemonContext } from "@/context/PokemonContext";

interface CardProps {
  toggleCard: () => void;
  setSelectedPokemon: (pokemon: PokemonType) => void;
}

const Card: React.FC<CardProps> = ({ toggleCard }) => {
  const context = useContext(PokemonContext);

  // Add a check to make sure context is defined
  if (!context) {
    return <div>Error: Context is not available.</div>;
  }

  const { selectedPokemon, setSelectedPokemon } = context;

  // Add a check to ensure selectedPokemon is not null
  if (!selectedPokemon) {
    return <div>Select a Pokémon to see the details.</div>;
  }

  const firstType = selectedPokemon.types[0];

  const typeColors: { [key in PokemonType["types"][number]]: string } = {
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

  const imageBgColors: { [key in PokemonType["types"][number]]: string } = {
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

  function formatPokemonName(pokemonName: string) {
    const parts = pokemonName.split("-");

    const baseName = parts[0][0].toUpperCase() + parts[0].slice(1);
    let formattedName = baseName;
    let form = "";

    if (parts.length > 1) {
      const firstPart = parts[1].toLowerCase();
      if (firstPart.startsWith("mega")) {
        form = "Mega";
      } else if (firstPart.startsWith("gmax")) {
        form = "GMax";
      } else {
        form = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
      }
    }

    if (parts.length > 2) {
      const thirdPart =
        parts[2].charAt(0).toUpperCase() + parts[2].slice(1).toLowerCase();
      formattedName = `${formattedName} ${thirdPart}`;
    }

    if (form) {
      formattedName = `${form} ${formattedName}`;
    }

    return formattedName;
  }

  return (
    <div
      className={`w-full md:w-5/12 h-full fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40 overflow-hidden shadow-lg bg-white`}
    >
      <div
        className={`relative h-full w-full m-auto ${
          imageBgColors[firstType as keyof typeof imageBgColors]
        }`}
      >
        <div className="w-11/12 m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="absolute top-4 left-4 z-50 fill-white"
            onClick={() => {
              setSelectedPokemon(null);
              toggleCard();
            }}
          >
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
          </svg>
          <div className={``}>
            <div className="pt-12 flex justify-between items-center">
              <h1 className="text-xl font-bold text-white ">
                {formatPokemonName(selectedPokemon.name)}
              </h1>
              <p className="text-sm text-white font-bold">
                ID: {selectedPokemon.id}
              </p>
            </div>
            <div className="flex my-2">
              {selectedPokemon.types.map((type) => (
                <div
                  key={type}
                  className={`${
                    typeColors[type as keyof typeof typeColors]
                  } flex py-1 px-3 mr-4 rounded-full`}
                >
                  <div className="bg-white rounded-full p-1 mr-2 w-6 h-6 flex items-center align-middle">
                    <Image
                      src={`/images/${type}.png`}
                      alt={type}
                      width={12}
                      height={12}
                      className="m-auto"
                    />
                  </div>
                  <p className="text-white text-sm">
                    {capitalizeFirstLetter(type)}
                  </p>
                </div>
              ))}
            </div>
            <Image
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              width={300}
              height={300}
              className="m-auto absolute top-28 left-1/2 -translate-x-1/2 z-30"
            />
          </div>
        </div>
      </div>
      <div className="w-full py-16 h-[55%] m-auto bg-white rounded-t-3xl z-10 absolute bottom-0">
        <div className="w-11/12 m-auto">
          <Info />
        </div>
      </div>
    </div>
  );
};

export default Card;
