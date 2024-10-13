import React, { useContext } from "react";
import { PokemonType } from "@/types/interface";
import { PokemonContext } from "@/context/PokemonContext";

interface MovesProps {}

const Moves: React.FC<MovesProps> = () => {
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

  const { moves } = selectedPokemon;

  // If no moves data, return a message
  if (!moves || moves.length === 0) {
    return <div className="text-sm">No moves available.</div>;
  }

  return (
    <div className="h-[400px] overflow-auto grid grid-cols-2">
      {moves.map((move, index) => (
        <div key={index} className="p-2">
          <p>{move}</p>
        </div>
      ))}
    </div>
  );
};

export default Moves;
