import React, { useContext } from "react";
import { PokemonContext } from "@/context/PokemonContext";

interface BaseStatProps {}

// Mapping stat names to more readable labels
const statLabels: { [key: string]: string } = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

// Function to get the color class based on the stat value
const getStatColor = (value: number): string => {
  if (value <= 50) return "bg-red-500"; // Low stat
  if (value <= 75) return "bg-yellow-500"; // Medium-low stat
  if (value <= 100) return "bg-green-500"; // Medium stat
  if (value <= 150) return "bg-blue-500"; // Medium-high stat
  return "bg-purple-500"; // High stat
};

const BaseStat: React.FC<BaseStatProps> = () => {
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

  // Calculate the total stats
  const totalStats = selectedPokemon.stats.reduce(
    (total, stat) => total + stat.value, // Use 'value' instead of 'base_stat'
    0
  );

  return (
    <div className="space-y-3 my-4 text-sm">
      {selectedPokemon.stats.map((stat) => (
        <div key={stat.name} className="flex items-center space-x-4">
          <span className="w-1/4 font-medium">
            {statLabels[stat.name] || stat.name.toUpperCase()}
          </span>
          <span className="w-10 text-right font-bold">{stat.value}</span>{" "}
          <div className="flex-grow h-[2px] bg-gray-200 rounded">
            <div
              className={`h-full rounded ${getStatColor(stat.value)}`} // Use conditional color class
              style={{ width: `${(stat.value / 255) * 100}%` }} // Use 'value'
            ></div>
          </div>
        </div>
      ))}
      <div className="flex items-center space-x-4 mt-4 font-bold">
        <span className="w-1/4">TOTAL</span>
        <span className="w-10 text-right">{totalStats}</span>
        <div className="flex-grow h-[2px] bg-gray-200 rounded">
          <div
            className={`h-full rounded ${getStatColor(
              totalStats / selectedPokemon.stats.length
            )}`} // Apply color based on average total stat
            style={{
              width: `${
                (totalStats / (255 * selectedPokemon.stats.length)) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BaseStat;
