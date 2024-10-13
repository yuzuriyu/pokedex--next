import React, { useContext } from "react";
import Image from "next/image";
import { PokemonType, PokemonForm } from "@/types/interface";
import { PokemonContext } from "@/context/PokemonContext";

const Forms: React.FC = () => {
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

  const forms: PokemonForm[] = selectedPokemon?.forms || [];

  const nonDefaultForms = forms.filter((form: PokemonForm) => !form.isDefault);

  if (nonDefaultForms.length === 0) {
    return <div className="text-sm">No forms available.</div>;
  }

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

  const handleFormSelect = (form: PokemonForm) => {
    // Create a new PokemonType object with updated form properties
    const updatedPokemon: PokemonType = {
      ...selectedPokemon,
      id: form.id, // Update the ID from the selected form
      name: form.name, // Update name to the form's name
      image: form.image, // Update the image
      height: form.height, // Update height
      weight: form.weight, // Update weight
      moves: form.moves, // Update moves to the form's moves
      species: form.species, // Update species
      description: form.description, // Update description
      abilities: form.abilities, // Update abilities
      stats: form.stats || selectedPokemon.stats, // Use form stats or retain existing if not available
      types: form.types, // Update to reflect the correct types

      forms: selectedPokemon.forms, // Retain the list of forms for further selection
    };

    setSelectedPokemon(updatedPokemon);
  };

  return (
    <div className="overflow-x-auto py-2">
      <div className="flex items-center space-x-6 whitespace-nowrap">
        {nonDefaultForms.map((form: PokemonForm) => (
          <div
            key={form.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleFormSelect(form)} // Call the form selection handler
          >
            <Image
              src={form.image} // Use the image from the form data
              alt={form.name}
              height={100}
              width={100}
              className="mb-2"
            />
            <span className="text-sm font-medium">
              {formatPokemonName(form.name)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;
