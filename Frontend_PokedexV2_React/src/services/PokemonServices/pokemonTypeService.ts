import axios from 'axios';
import { fetchPokemonCard } from '@/services/PokemonServices/pokemonCardService';
import { POKEMON_TYPE_URL } from '@routes/api.routes';
import { PokemonCard } from '@models/pokemon';

type PokemonTypeApiModel = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

export const fetchPokemonType = async (
  typeToSearch: string,
): Promise<PokemonCard[]> => {
  try {
    const { data } = await axios.get(`${POKEMON_TYPE_URL}${typeToSearch}`);
    const pokePromises = await data.pokemon.map((poke: PokemonTypeApiModel) =>
      fetchPokemonCard(poke.pokemon.name),
    );
    const pokePromisesResolved = await Promise.all(pokePromises);

    return pokePromisesResolved;
  } catch (error) {
    throw new Error(
      `An error occurred while obtaining Pokémon of the selected type.\n\n${error}`,
    );
  }
};
