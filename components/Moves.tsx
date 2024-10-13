import React, { useContext } from "react";
import { PokemonContext } from "@/context/PokemonContext";

interface MovesProps {}

const Moves: React.FC<MovesProps> = () => {
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

  const { moves } = selectedPokemon;

  // If no moves data, return a message
  if (!moves || moves.length === 0) {
    return <div className="text-sm">No moves available.</div>;
  }

  // Function to format the move names
  const formatMoveName = (move: string) => {
    return move
      .replace(/-/g, " ") // Replace hyphens with spaces
      .split(" ") // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back together
  };

  return (
    <div className="h-[400px] overflow-auto grid grid-cols-1">
      {moves.map((move, index) => (
        <div key={index} className="p-2">
          <p className="text-sm">{formatMoveName(move)}</p>
        </div>
      ))}
    </div>
  );
};

export default Moves;
