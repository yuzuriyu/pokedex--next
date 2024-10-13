import {
  PokemonType,
  EvolutionType,
  PokemonForm,
  Stat,
  PokemonSummary,
} from "@/types/interface";

// Define types for the response from the API
interface PokemonResponse {
  id: number;
  name: string;
  species: { url: string };
  moves: Array<{ move: { name: string } }>;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": { front_default: string };
    };
  };
  stats: Array<{ base_stat: number; stat: { name: string } }>; // Include stats in the PokemonResponse
}

interface SpeciesResponse {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
  }>;
  evolution_chain: { url: string };
  varieties: Array<{
    pokemon: { url: string; name: string };
    is_default: boolean;
  }>;
  names: Array<{ name: string; language: { name: string } }>;
}

interface Evolution {
  species: { name: string };
  evolves_to: Evolution[]; // Recursive definition for evolutions
}

interface EvolutionChainResponse {
  chain: Evolution; // Use the Evolution interface
}

// Fetch a batch of Pokémon names and URLs
async function fetchPokemonBatch(limit: number, offset: number) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data.results;
}

// Fetch detailed information for a single Pokémon
export const fetchPokemonDetails = async (
  url: string
): Promise<PokemonType> => {
  const response = await fetch(url);
  const details: PokemonResponse = await response.json();

  // Fetch species data for description and forms
  const speciesResponse = await fetch(details.species.url);
  const speciesData: SpeciesResponse = await speciesResponse.json();

  // Extract description
  const description =
    speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text || "No description available";

  // Fetch evolution chain data
  const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionChainData: EvolutionChainResponse =
    await evolutionChainResponse.json();

  // Helper function to extract evolution names and images
  const getEvolutions = (evolution: Evolution): EvolutionType[] => {
    const evolutions: EvolutionType[] = [];
    const traverseEvolutions = (ev: Evolution) => {
      evolutions.push({
        name: ev.species.name,
        image: `https://img.pokemondb.net/sprites/home/normal/${ev.species.name}.png`,
      });
      ev.evolves_to.forEach(traverseEvolutions);
    };
    traverseEvolutions(evolution);
    return evolutions;
  };

  const evolutions = getEvolutions(evolutionChainData.chain); // Pass the correct chain property

  // Extract moves
  const moves = details.moves.map((moveInfo) => moveInfo.move.name);

  // Fetch forms (varieties)
  const formsPromises = speciesData.varieties.map(async (variety) => {
    const formResponse = await fetch(variety.pokemon.url);
    const formDetails: PokemonResponse = await formResponse.json();

    // Extract relevant form details
    return {
      id: formDetails.id, // Include ID for the form
      isDefault: variety.is_default,
      name: variety.pokemon.name,
      image: formDetails.sprites.other["official-artwork"].front_default, // Get the image for the form
      height: formDetails.height, // Height for the form
      weight: formDetails.weight, // Weight for the form
      types: formDetails.types.map((typeInfo) => typeInfo.type.name), // Get the types for the form
      abilities: formDetails.abilities.map(
        (abilityInfo) => abilityInfo.ability.name
      ),
      stats: formDetails.stats.map((statInfo) => ({
        name: statInfo.stat.name,
        value: statInfo.base_stat,
      })) as Stat[], // Ensure it matches the Stat interface
      moves: formDetails.moves.map((moveInfo) => moveInfo.move.name), // Extract moves for the form
      species:
        speciesData.names.find((name) => name.language.name === "en")?.name ||
        "Unknown", // Extract species name
      description, // Add description for the form (optional)
      evolutions, // Include evolutions in the form (if relevant)
    } as PokemonForm; // Ensure it matches the PokemonForm interface
  });

  const forms = await Promise.all(formsPromises); // Wait for all form data to be fetched

  // Combine the data into a structured Pokémon object
  return {
    id: details.id,
    name: details.name,
    image: details.sprites.other["official-artwork"].front_default,
    height: details.height,
    weight: details.weight,
    types: details.types.map((typeInfo) => typeInfo.type.name),
    abilities: details.abilities.map((abilityInfo) => abilityInfo.ability.name),
    stats: details.stats.map((statInfo) => ({
      name: statInfo.stat.name,
      value: statInfo.base_stat,
    })) as Stat[], // Ensure it matches the Stat interface
    description,
    moves, // Extracted moves for the main Pokémon
    species:
      speciesData.names.find((name) => name.language.name === "en")?.name ||
      "Unknown",
    evolutions, // Include evolutions in the return object
    forms, // Include forms in the return object
  } as PokemonType; // Ensure it matches the PokemonType interface
};

// Fetch a range of Pokémon details for a given start and end ID
async function fetchGenerationRange(startId: number, endId: number) {
  const limit = endId - startId + 1;
  const offset = startId - 1;
  const pokemonList = await fetchPokemonBatch(limit, offset);

  const promises = pokemonList.map((pokemon: PokemonSummary) =>
    fetchPokemonDetails(pokemon.url)
  );
  return await Promise.all(promises);
}

// Generation mapping to start and end IDs
const generationRanges: Record<number, { start: number; end: number }> = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 898 },
  9: { start: 899, end: 1025 }, // Add Generation 9 range
};

// Fetch Pokémon data for a specified generation
export async function fetchGeneration(generation: number) {
  const range = generationRanges[generation as keyof typeof generationRanges]; // Casting generation to keyof
  if (!range) throw new Error("Invalid generation number");
  return fetchGenerationRange(range.start, range.end);
}
