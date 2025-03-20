import axios from 'axios';
import { POKEMON_INFO_URL } from '@routes/api.routes';
import { PokemonCard, PrevEvolution } from '@models/pokemon';
import { TypeAPIModel } from '@models/types';

type NameMeaningAPIModel = {
  genus: string;
  language: {
    name: string;
    url: string;
  };
};

export const fetchPokemonCard = async (
  pokemonNameOrId: string,
): Promise<PokemonCard> => {
  try {
    const { data } = await axios.get(`${POKEMON_INFO_URL}${pokemonNameOrId}`);
    const name_meaning = await fetchNameMeannig(data.species.url);
    const pre_evol = await fetchPreEvol(data.species.url);
    const pokeID = await fetchPokemonIdPokedex(data.species.url);

    return {
      pokemonId: data.id,
      pokedexNumber: pokeID,
      name: data.name,
      nameMeaning: name_meaning,
      height: data.height,
      weight: data.weight,
      types: data.types.map((type: TypeAPIModel) => type.type.name),
      sprites: {
        normal:
          data.sprites.other['official-artwork'].front_default ??
          data.sprites.front_default,
        shiny:
          data.sprites.other['official-artwork'].front_shiny ??
          data.sprites.front_shiny,
        icon:
          data.sprites.versions['generation-viii'].icons.front_default ??
          data.sprites.other['official-artwork'].front_default ??
          data.sprites.front_default,
      },
      evolvesFrom: pre_evol,
    };
  } catch (err) {
    throw new Error(
      `Problems to get the Pokemon info for: ${pokemonNameOrId}.\n\n${err}`,
    );
  }
};

const fetchPokemonIdPokedex = async (url: string): Promise<number> => {
  try {
    const { data } = await axios.get(url);
    return data.id;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

const fetchNameMeannig = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url);
    const meaning = data.genera.find(
      (item: NameMeaningAPIModel) => item.language.name === 'en',
    );

    return meaning.genus;
  } catch (error) {
    console.error(error);
    return 'No meaning yet';
  }
};

const fetchPreEvol = async (url: string): Promise<PrevEvolution | null> => {
  try {
    const { data: speciesData } = await axios.get(url);
    let preEvol: PrevEvolution;
    if (speciesData.evolves_from_species !== null) {
      const { data: preEvolData } = await axios.get(
        `${POKEMON_INFO_URL}${speciesData.evolves_from_species.name}`,
      );

      preEvol = {
        pokedexNumber: preEvolData.id,
        name: preEvolData.name,
        sprites: {
          normal:
            preEvolData.sprites.other['official-artwork'].front_default ??
            preEvolData.sprites.front_default,
          shiny:
            preEvolData.sprites.other['official-artwork'].front_shiny ??
            preEvolData.sprites.front_shiny,
          icon:
            preEvolData.sprites.versions['generation-viii'].icons
              .front_default ??
            preEvolData.sprites.other['official-artwork'].front_default ??
            preEvolData.sprites.front_default,
        },
      };

      return preEvol;
    } else
      throw new Error(`This specie has no pre-evolution: ${speciesData.name}`);
  } catch (error) {
    console.warn(error);
    return null;
  }
};
