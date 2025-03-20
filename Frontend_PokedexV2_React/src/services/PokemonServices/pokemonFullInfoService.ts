import { fetchPokemonInfo } from '@services/PokemonServices/pokemonSummaryService';
import { fetchPokemonSpecie } from '@services/PokemonServices/pokemonMainDetailsService';
import { PokemonInfo, PokemonSpecieInfo, Pokemon } from '@models/pokemon';

export const fetchPokemon = async (
  pokemonId: number,
  pokemonName: string,
): Promise<Pokemon> => {
  try {
    const pokemonInfo: PokemonInfo = await fetchPokemonInfo(pokemonName);
    const pokemonSpecie: PokemonSpecieInfo =
      await fetchPokemonSpecie(pokemonId);

    const pokemon: Pokemon = { ...pokemonInfo, ...pokemonSpecie };

    return pokemon;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the Pokemon.\n\n${error}`,
    );
  }
};
