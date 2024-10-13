import React, { useContext } from "react";
import Image from "next/image";
import { EvolutionType } from "@/types/interface"; // Ensure that this interface is properly defined
import { PokemonContext } from "@/context/PokemonContext";

// Define the props interface if necessary, or leave it empty if not used
interface EvolutionProps {}

const Evolution: React.FC<EvolutionProps> = () => {
  const context = useContext(PokemonContext);

  // Throw an error if context is not available
  if (!context) {
    throw new Error("Context is not available.");
  }

  const { selectedPokemon } = context;

  // Throw an error if selectedPokemon is not available
  if (!selectedPokemon) {
    throw new Error("Selected Pokémon is not available.");
  }

  const { evolutions, forms } = selectedPokemon;

  // Check if evolutions or forms are available
  if (
    (!evolutions || evolutions.length === 0) &&
    (!forms || forms.length === 0)
  ) {
    return <div className="text-sm">No evolution or form data available.</div>;
  }

  // Function to capitalize the first letter of a name
  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-8">
      {evolutions && evolutions.length > 0 && (
        <div className="flex items-center justify-center space-x-6 my-6 overflow-x-auto">
          {evolutions.map((pokemon: EvolutionType) => (
            <React.Fragment key={pokemon.name}>
              <div className="flex flex-col items-center mx-4">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                  className="mb-2"
                />
                <span className="text-sm font-medium">
                  {capitalizeFirstLetter(pokemon.name)}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Evolution;
