import React, { useContext } from "react";
import { PokemonContext } from "@/context/PokemonContext";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const context = useContext(PokemonContext);

  // Add a check to make sure context is defined
  if (!context) {
    return <div>Error: Context is not available.</div>;
  }

  const { selectedPokemon } = context;

  // Add a check to ensure selectedPokemon is not null
  if (!selectedPokemon) {
    return <div>Select a Pokémon to see the details.</div>;
  }

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="">
      <p className="text-sm mt-8 mb-4 text-center">
        {selectedPokemon.description}
      </p>
      <div className="flex items-center">
        <p className="w-1/4 text-sm my-2">Species</p>
        <p className="text-sm">{selectedPokemon.species}</p>
      </div>
      <div className="flex items-center">
        <p className="w-1/4 text-sm my-2">Height</p>
        <p className="text-sm">{selectedPokemon.height}</p>
      </div>
      <div className="flex items-center">
        <p className="w-1/4 text-sm my-2">Weight</p>
        <p className="text-sm">{selectedPokemon.weight}</p>
      </div>
      <div className="flex items-center">
        <p className="w-1/4 text-sm my-2">Abilities</p>
        {selectedPokemon.abilities.map((ability, index) => (
          <span className="text-sm" key={index}>
            {capitalizeFirstLetter(ability)}
            {index < selectedPokemon.abilities.length - 1 && ", "}
            {index < selectedPokemon.abilities.length - 1 && <>&nbsp;</>}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default About;
