import axios from 'axios';
import { TypeAPIModel } from '@models/types';
import { POKEMON_SPECIE_URL } from '@routes/api.routes';
import { PokemonSpecieInfo, ShortViewPokemon } from '@models/pokemon';

type NameMeaningAPIModel = {
  genus: string;
  language: {
    name: string;
    url: string;
  };
};

type EvolutionChainType = {
  firstPhase: ShortViewPokemon[];
  secondPhase: ShortViewPokemon[];
  thirdPhase: ShortViewPokemon[];
};

type PokedexEntriesType = {
  description: string;
  version: string;
};

type EvolutionChainApiModel = {
  evolves_to: EvolutionChainApiModel[];
  species: {
    name: string;
    url: string;
  };
};

type PokedexEntryApiModel = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
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

type PokemonFormsApiModel = {
  name: string;
  url: string;
};

export const fetchPokemonSpecie = async (
  pokemonId: number,
): Promise<PokemonSpecieInfo> => {
  try {
    const { data: pokemonData } = await axios.get(
      `${POKEMON_SPECIE_URL}${pokemonId}`,
    );

    const nameMeaningPokemon: NameMeaningAPIModel = pokemonData.genera.find(
      (item: NameMeaningAPIModel) => item.language.name === 'en',
    );

    const evolutionChainPokemon: EvolutionChainType = await fetchEvolutionChain(
      pokemonData.evolution_chain.url,
    );

    const pokemonForms = await fetchPokemonForms(
      pokemonData.varieties,
      pokemonData.has_gender_differences,
    );

    const femaleRate =
      pokemonData.gender_rate === -1 ? -1 : pokemonData.gender_rate * 12.5;
    const maleRate = pokemonData.gender_rate === -1 ? -1 : 100 - femaleRate;

    const pokedexVersions = fetchPokedexentries(
      pokemonData.flavor_text_entries,
    );

    return {
      nameMeaning: nameMeaningPokemon.genus,
      generation: pokemonData.generation.name,
      evolvesFrom: null,
      evolutionChain: evolutionChainPokemon,
      otherForms: pokemonForms,
      genderRate: {
        female: femaleRate,
        male: maleRate,
      },
      pokedexEntries: pokedexVersions,
    };
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the Pokemon specie.\n\n${error}`,
    );
  }
};

const fetchEvolutionChain = async (
  url: string,
): Promise<EvolutionChainType> => {
  try {
    const evolutionChain: EvolutionChainType = {
      firstPhase: [],
      secondPhase: [],
      thirdPhase: [],
    };

    const { data: chainData } = await axios.get(url);

    const fetchPhases = async (
      chain: EvolutionChainApiModel,
      phase: keyof EvolutionChainType,
    ) => {
      const pokemon = await fetchShortViewData(chain.species.url);
      evolutionChain[phase].push(pokemon);

      if (chain.evolves_to?.length > 0) {
        await Promise.all(
          chain.evolves_to.map(async (evo) => {
            const nextPhase =
              phase === 'firstPhase' ? 'secondPhase' : 'thirdPhase';
            await fetchPhases(evo, nextPhase);
          }),
        );
      }
    };

    await fetchPhases(chainData.chain, 'firstPhase');

    return evolutionChain;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the Pokemon evolution chain.\n\n${error}`,
    );
  }
};

const fetchPokemonForms = async (
  varietiesSpeciesArr: PokemonVarietiesApiModel[],
  hasGenderDifferences: boolean,
): Promise<ShortViewPokemon[]> => {
  try {
    const allPokemonForms: ShortViewPokemon[] = [];

    const defaultVariant = varietiesSpeciesArr.find(
      (variant) => variant.is_default,
    );

    const { data: pokemonData } = await axios.get(defaultVariant!.pokemon.url);

    if (hasGenderDifferences) {
      const pokemonTypes = pokemonData.types.map(
        (type: TypeAPIModel) => type.type.name,
      );
      const femaleVersion: ShortViewPokemon = {
        name: 'female-'.concat(pokemonData.name),
        types: pokemonTypes,
        sprites: {
          normal:
            pokemonData.sprites.other.home.front_female ??
            pokemonData.sprites.front_female,
          shiny:
            pokemonData.sprites.other.home.front_shiny_female ??
            pokemonData.sprites.front_shiny_female,
          icon:
            pokemonData.sprites.other.home.front_female ??
            pokemonData.sprites.front_female,
        },
      };

      allPokemonForms.push(femaleVersion);
    }

    const variantsUrls: string[] = varietiesSpeciesArr.map(
      (variant: PokemonVarietiesApiModel) => variant.pokemon.url,
    );

    const allVariants: ShortViewPokemon[] = await Promise.all(
      variantsUrls.map(async (variant: string) => {
        const { data: pokemonVariantData } = await axios.get(variant);

        const variantTypes = pokemonVariantData.types.map(
          (type: TypeAPIModel) => type.type.name,
        );

        return {
          name: pokemonVariantData.name,
          types: variantTypes,
          sprites: {
            normal:
              pokemonVariantData.sprites.other['official-artwork']
                .front_default ?? pokemonVariantData.sprites.front_default,
            shiny:
              pokemonVariantData.sprites.other['official-artwork']
                .front_shiny ?? pokemonVariantData.sprites.front_shiny,
            icon:
              pokemonVariantData.sprites.versions['generation-viii'].icons
                .front_default ??
              pokemonVariantData.sprites.other['official-artwork']
                .front_default ??
              pokemonVariantData.sprites.front_default,
          },
        };
      }),
    );

    allPokemonForms.push(...allVariants);

    if (pokemonData.forms.length > 1) {
      const allForms: ShortViewPokemon[] = await Promise.all(
        pokemonData.forms.slice(1).map(async (form: PokemonFormsApiModel) => {
          const { data: formData } = await axios.get(form.url);

          const pokemonTypes = formData.types.map(
            (type: TypeAPIModel) => type.type.name,
          );

          return {
            name: formData.name,
            types: pokemonTypes,
            sprites: {
              normal: formData.sprites.front_default,
              shiny: formData.sprites.front_shiny,
              icon: formData.sprites.front_default,
            },
          };
        }),
      );

      allPokemonForms.push(...allForms);
    }

    return allPokemonForms;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching pokemon alt forms.\n\n${error}`,
    );
  }
};

const fetchPokedexentries = (
  allEntriesArr: PokedexEntryApiModel[],
): PokedexEntriesType[] => {
  try {
    const entries: PokedexEntriesType[] = allEntriesArr
      .filter((entry) => entry.language.name === 'en')
      .map((entry) => {
        return {
          description: entry.flavor_text,
          version: entry.version.name,
        };
      });

    return entries;
  } catch (error) {
    throw new Error(
      `An error ocurred while fetching pokedex entries.\n\n${error}`,
    );
  }
};

const fetchShortViewData = async (url: string): Promise<ShortViewPokemon> => {
  try {
    const { data: pokemonSpecieData } = await axios.get(`${url}`);

    const variety: PokemonVarietiesApiModel = pokemonSpecieData.varieties.find(
      (variety: PokemonVarietiesApiModel) => variety.is_default === true,
    );

    const { data: pokemonData } = await axios.get(variety.pokemon.url);

    const pokemonTypes = pokemonData.types.map(
      (type: TypeAPIModel) => type.type.name,
    );

    return {
      name: pokemonData.name,
      types: pokemonTypes,
      sprites: {
        normal:
          pokemonData.sprites.other['official-artwork'].front_default ??
          pokemonData.sprites.front_default,
        shiny:
          pokemonData.sprites.other['official-artwork'].front_shiny ??
          pokemonData.sprites.front_shiny,
        icon:
          pokemonData.sprites.versions['generation-viii'].icons.front_default ??
          pokemonData.sprites.other['official-artwork'].front_default ??
          pokemonData.sprites.front_default,
      },
    };
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the Pokemon information.\n\n${error}`,
    );
  }
};
