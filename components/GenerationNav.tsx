"use client";

import React, { useContext } from "react";
import { PokemonContext } from "@/context/PokemonContext";

const GenerationNav = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("Header must be used within a PokemonContextProvider");
  }
  const { selectedGen, handleGenerationClick } = context;

  return (
    <div className="absolute right-8 z-50 bg-white rounded-lg px-4 py-4 top-12 shadow-lg">
      <ul className="space-y-2">
        {[...Array(9)].map((_, i) => {
          const generation = i + 1;
          return (
            <li
              key={generation}
              onClick={() => handleGenerationClick(generation)}
              className={`cursor-pointer text-sm ${
                selectedGen === generation ? "font-bold" : "font-normal"
              } hover:text-blue-500`}
            >
              Gen {generation}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenerationNav;
