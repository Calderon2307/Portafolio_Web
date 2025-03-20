import axios from 'axios';
import { fetchPokemonCard } from '@/services/PokemonServices/pokemonCardService';
import { PokemonCard } from '@models/pokemon';

type CompletePokedexType = {
  count: number;
  nextUrl: string;
  prevUrl: string;
  pokemonCards: PokemonCard[];
};

type CompletePokedexTypeWCount = Omit<CompletePokedexType, 'count'>;

type ItemResultsApiModel = {
  name: string;
  url: string;
};

export const fetchCompletePokemon = async (
  url: string,
): Promise<CompletePokedexType> => {
  let pokeInfoArr: PokemonCard[] = [];
  try {
    const { data: generalData } = await axios.get(url);

    const _pokeCardsArr = generalData.results.map((poke: ItemResultsApiModel) =>
      fetchPokemonCard(poke.name),
    );

    pokeInfoArr = await Promise.all(_pokeCardsArr);

    return {
      count: generalData.count,
      nextUrl: generalData.next,
      prevUrl: generalData.previous,
      pokemonCards: pokeInfoArr,
    };
  } catch (error) {
    throw new Error(`An error occurred while fetching Pokemon.\n\n${error}`);
  }
};

export const fetchCompletePokedexWithUrl = async (
  limit: number,
  offset: number,
): Promise<CompletePokedexTypeWCount> => {
  try {
    const { data: generalData } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );

    const _pokCardsArr = generalData.results.map((poke: ItemResultsApiModel) =>
      fetchPokemonCard(poke.name),
    );

    const pokeInfoArr = await Promise.all(_pokCardsArr);

    return {
      nextUrl: generalData.next,
      prevUrl: generalData.previous,
      pokemonCards: pokeInfoArr,
    };
  } catch (error) {
    throw new Error(`An error occurred while fetching Pokemon.\n\n${error}`);
  }
};
