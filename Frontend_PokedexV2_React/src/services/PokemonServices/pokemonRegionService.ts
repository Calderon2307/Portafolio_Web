import axios from 'axios';
import { fetchPokemonCard } from '@/services/PokemonServices/pokemonCardService';
import { POKEMON_REGION_URL } from '@routes/api.routes';
import { PokemonCard } from '@models/pokemon';
import { PokedexElementApiModel } from '@models/pokeApi';

type PokedexEntryApiModel = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

type PokemonVarietiesApiModel = {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
};

type ItemResultsApiModel = {
  name: string;
  url: string;
};

export const fetchPokedexesRegion = async (
  regionToSearch: string,
): Promise<PokedexElementApiModel[]> => {
  try {
    const { data: regionData } = await axios.get(
      `${POKEMON_REGION_URL}${regionToSearch}`,
    );

    const pokedexes = regionData.pokedexes;

    return pokedexes;
  } catch (error) {
    throw new Error(
      `An error occurred while obtaining Pokédex from the selected region.\n\n${error}`,
    );
  }
};

export const fetchPokedexSelected = async (
  url: string,
  regionToSearch: string,
): Promise<PokemonCard[]> => {
  try {
    const { data: pokedexData } = await axios.get(url);

    const pokedexItemsPromises = await fetchPokemonNameForCard(
      pokedexData.pokemon_entries,
      regionToSearch,
    );

    const pokedexItems = await Promise.all(pokedexItemsPromises);

    const pokemonCardsPromises = pokedexItems.map(
      (poke: PokemonVarietiesApiModel) => fetchPokemonCard(poke.pokemon.name),
    );

    const pokemonCards = await Promise.all(pokemonCardsPromises);

    return pokemonCards;
  } catch (error) {
    throw new Error(
      `An error occurred while obtaining Pokémon from the selected pokedex.\n\n${error}`,
    );
  }
};

const fetchPokemonNameForCard = async (
  pokedexArr: PokedexEntryApiModel[],
  regionName: string,
): Promise<PokemonVarietiesApiModel[]> => {
  const varietiesArr: PokemonVarietiesApiModel[] = [];
  try {
    for (const pokedexItem of pokedexArr) {
      let regionalForm: PokemonVarietiesApiModel | undefined = undefined;

      const { data: specieData } = await axios.get(
        pokedexItem.pokemon_species.url,
      );

      const defaultForm = specieData.varieties.find(
        (pokemonVariety: PokemonVarietiesApiModel) =>
          pokemonVariety.is_default === true,
      );

      varietiesArr.push(defaultForm);

      regionalForm = specieData.varieties.find(
        (pokemonVariety: PokemonVarietiesApiModel) =>
          pokemonVariety.pokemon.name.includes(regionName) === true,
      );

      if (regionalForm !== undefined) varietiesArr.push(regionalForm);
    }

    // const { data: specieData } = await axios.get(url);

    // const varietyPokemonPromise = specieData.varieties.find(
    //   (itemVariety: PokemonVarietiesApiModel) =>
    //     itemVariety.is_default === true,
    // );

    //const varietiesPokemon = await Promise.all(varietyPokemonPromises);

    //console.log(varietiesArr);

    return varietiesArr;
  } catch (error) {
    throw new Error(
      `An Error occurred while fetching Pokemon name.\n\n${error}`,
    );
  }
};

export const fetchPokemonGeneration = async (
  limit?: number,
  offset?: number,
): Promise<PokemonCard[]> => {
  try {
    const { data: pokemonData } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );

    const _pokeCardsArr = pokemonData.results.map((poke: ItemResultsApiModel) =>
      fetchPokemonCard(poke.name),
    );

    const pokeCardsArr = await Promise.all(_pokeCardsArr);

    return pokeCardsArr;
  } catch (error) {
    throw new Error(
      `An error occurred while obtaining Pokémon from the selected generation.\n\n${error}`,
    );
  }
};
