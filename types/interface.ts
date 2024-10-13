export interface EvolutionType {
  name: string;
  image: string;
}

export interface PokemonForm {
  id: number; // Add id if needed for unique identification
  name: string;
  isDefault: boolean; // Indicates if it's the default form
  image: string; // URL to the image of this specific form
  types: string[]; // Types associated with this form
  description: string; // Description of this form
  height: number; // Height specific to this form
  weight: number; // Weight specific to this form
  moves: string[]; // Moves specific to this form
  species: string; // Species name specific to this form
  evolutions: EvolutionType[]; // Evolutions specific to this form
  abilities: string[]; // Abilities specific to this form
  stats: Stat[]; // Include an array of stats
}

export interface Stat {
  name: string;
  value: number; // Use `value` for the stat number
}

export interface Evolution {
  species: { name: string };
  evolves_to: Evolution[]; // Recursive definition to support multiple evolutions
}

export interface EvolutionChainResponse {
  chain: Evolution; // Represents the main chain of evolutions
}

export interface PokemonType {
  id: number;
  name: string;
  image: string;
  types: string[];
  description: string;
  height: number;
  weight: number;
  moves: string[];
  species: string;
  evolutions: EvolutionType[]; // Existing evolution type
  abilities: string[];
  forms: PokemonForm[]; // Forms will contain complete data for each form
  stats: Stat[]; // Include an array of stats
}

export interface PokemonSummary {
  name: string;
  url: string;
}
