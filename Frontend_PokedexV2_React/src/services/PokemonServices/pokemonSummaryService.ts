import axios from 'axios';
import { Ability } from '@models/ability';
import { Move } from '@models/moves';
import { TypeRelation, TypeAPIModel } from '@models/types';
import { PokemonInfo, ChangePokemon } from '@models/pokemon';
import { POKEMON_INFO_URL, POKEMON_CARDS_TCG_URL } from '@routes/api.routes';

type PokemonAbilitiesArrApiModel = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type AbilityEffectEntryApiModel = {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
};

type PokemonMovesArrApiModel = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
};

type DescriptionMoveApiModel = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
};

type MoveEffectApiModel = {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
};

type RelationApiModel = {
  name: string;
  url: string;
};

type DamageRelationApiModel = {
  double_damage_from: RelationApiModel[];
  double_damage_to: RelationApiModel[];
  half_damage_from: RelationApiModel[];
  half_damage_to: RelationApiModel[];
  no_damage_from: RelationApiModel[];
  no_damage_to: RelationApiModel[];
};

type StatsApiModel = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type CardsTCGType = {
  img: string;
};

type CardsApiModel = {
  images: {
    large: string;
    small: string;
  };
};

export const fetchPokemonInfo = async (
  pokemonName: string,
): Promise<PokemonInfo> => {
  try {
    const { data: pokemonData } = await axios.get(
      `${POKEMON_INFO_URL}${pokemonName}`,
    );

    const { data: pokemonSpecieData } = await axios.get(
      pokemonData.species.url,
    );
    const pokemonTypes: string[] = pokemonData.types.map(
      (type: TypeAPIModel) => type.type.name,
    );
    const pokemonAbilities = await fetchPokemonAbilities(pokemonData.abilities);
    console.log('Realice la peticion de las habilidades.');
    const pokemonMoves = await fetchPokemonMoves(pokemonData.moves);
    console.log('Realice la peticion de los movimientos.');
    const pokemonRelationTypes = await fetchDamageRelations(pokemonData.types);
    console.log('Realice la peticion de las relaciones de daño.');
    const changeNextPokemon = await fetchChangePokmeon(pokemonData.id, 'next');
    console.log('Realice la peticion del proximo pokemon.');
    const changePrevPokemon = await fetchChangePokmeon(pokemonData.id, 'prev');
    console.log('Realice la peticion del pokemon anterior.');
    const pokemonStats = await pokemonData.stats.map((stat: StatsApiModel) => {
      return {
        statName: stat.stat.name,
        baseStat: stat.base_stat,
      };
    });
    console.log('Realice la peticion de las estadisticas.');
    const cardsTCG = await fetchPokemonTCGCards(pokemonData.name);
    console.log('Realice la peticion de las cartas del tcg.');

    return {
      pokemonId: pokemonSpecieData.id,
      pokedexNumber: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      baseXP: pokemonData.base_experience,
      souond: pokemonData.cries.latest ?? pokemonData.cries.legacy,
      types: pokemonTypes,
      abilities: pokemonAbilities,
      moves: pokemonMoves,
      weaknessResistance: pokemonRelationTypes,
      nextPokemon: changeNextPokemon,
      prevPokemon: changePrevPokemon,
      stats: pokemonStats,
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
      cards: cardsTCG,
    };
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the Pokemon info.\n\n${error}`,
    );
  }
};

const fetchPokemonAbilities = async (
  abilitiesArr: PokemonAbilitiesArrApiModel[],
): Promise<Ability[]> => {
  try {
    const abilities: Ability[] = await Promise.all(
      abilitiesArr.map(async (ability: PokemonAbilitiesArrApiModel) => {
        try {
          const { data: abilityData } = await axios.get(ability.ability.url);

          const effectEntry: AbilityEffectEntryApiModel | undefined =
            abilityData.effect_entries.find(
              (effect: AbilityEffectEntryApiModel) =>
                effect.language.name === 'en',
            );

          return {
            name: ability.ability.name,
            effect: effectEntry?.effect ?? 'The ability has no Effect yet.',
            shortEffect:
              effectEntry?.short_effect ??
              'The ability has no Short Effect yet.',
            isHidden: ability.is_hidden,
          };
        } catch (error) {
          console.error(
            `An error ocurred while trying to fetch details for ability ${ability.ability.name}.\n\n${error}`,
          );

          return {
            name: ability.ability.name,
            effect: 'Failed to load effect',
            shortEffect: 'Failed to load short effect',
            isHidden: ability.is_hidden,
          };
        }
      }),
    );

    return abilities;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the Pokemon abilities.\n\n${error}`,
    );
  }
};

const fetchPokemonMoves = async (
  movesArr: PokemonMovesArrApiModel[],
): Promise<Move[]> => {
  try {
    const moves: Move[] = await Promise.all(
      movesArr.map(async (move: PokemonMovesArrApiModel) => {
        try {
          const { data: moveData } = await axios.get(move.move.url);
          const moveDescription: DescriptionMoveApiModel =
            moveData.flavor_text_entries
              .reverse()
              .find(
                (description: DescriptionMoveApiModel) =>
                  description.language.name === 'en',
              );
          const moveEffect: MoveEffectApiModel = moveData.effect_entries.find(
            (effect: MoveEffectApiModel) => effect.language.name === 'en',
          );

          return {
            name: moveData.name,
            description:
              moveDescription?.flavor_text ??
              'This move has no description yet',
            effect: moveEffect?.short_effect ?? 'This move has no effect yet',
            type: moveData.type.name,
            damage: moveData.power ?? 0,
            accuracy: moveData.accuracy ?? 100,
            pp: moveData.pp,
            otherPokemons: moveData.learned_by_pokemon.length,
          };
        } catch (error) {
          throw new Error(
            `An error ocurred while trying to fetch details form move ${move.move.name}.\n\n${error}`,
          );
        }
      }),
    );
    return moves;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the Pokemon Moves.\n\n${error}`,
    );
  }
};

const fetchDamageRelations = async (
  typesArr: TypeAPIModel[],
): Promise<TypeRelation[]> => {
  try {
    const typeRelationArr: TypeRelation[] = [
      { effectiveness: 'super-effective', damageMultiplier: 'x4', types: [] },
      { effectiveness: 'effective', damageMultiplier: 'x2', types: [] },
      { effectiveness: 'resistant', damageMultiplier: '1/2', types: [] },
      { effectiveness: 'super-resistant', damageMultiplier: '1/4', types: [] },
      { effectiveness: 'immune', damageMultiplier: 'x0', types: [] },
    ];

    const damageModifiers: Record<string, number> = {};

    const damageRelationData: DamageRelationApiModel[] = await Promise.all(
      typesArr.map(async (type: TypeAPIModel) => {
        const { data: damageData } = await axios.get(type.type.url);

        return damageData.damage_relations;
      }),
    );

    for (const relation of damageRelationData) {
      relation.double_damage_from.forEach(
        (type: RelationApiModel) =>
          (damageModifiers[type.name] = (damageModifiers[type.name] || 1) * 2),
      );

      relation.half_damage_from.forEach(
        (type: RelationApiModel) =>
          (damageModifiers[type.name] =
            (damageModifiers[type.name] || 1) * 0.5),
      );

      relation.no_damage_from.forEach(
        (type: RelationApiModel) => (damageModifiers[type.name] = 0),
      );
    }

    for (const [typeName, damageModifier] of Object.entries(damageModifiers)) {
      let effectivenessLabel = '';

      if (damageModifier === 4) effectivenessLabel = 'super-effective';
      else if (damageModifier === 2) effectivenessLabel = 'effective';
      else if (damageModifier === 0.5) effectivenessLabel = 'resistant';
      else if (damageModifier === 0.25) effectivenessLabel = 'super-resistant';
      else if (damageModifier === 0) effectivenessLabel = 'immune';

      const objectItem = typeRelationArr.find(
        (type: TypeRelation) => type.effectiveness === effectivenessLabel,
      );

      objectItem?.types.push(typeName);
    }

    for (const relation of typeRelationArr) {
      if (relation.types.length === 0) relation.types.push('none');
      else continue;
    }

    return typeRelationArr;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the damage relation.\n\n${error}`,
    );
  }
};

const fetchChangePokmeon = async (
  pokemonId: number,
  pokemonToChange: string,
): Promise<ChangePokemon | null> => {
  try {
    let newId: number = 0;

    if (pokemonToChange === 'next') {
      if (pokemonId === 1025) newId = 10001;
      else if (pokemonId < 1025 || (pokemonId >= 10001 && pokemonId < 10279))
        newId = pokemonId + 1;
      else return null;
    } else if (pokemonToChange === 'prev') {
      if (pokemonId === 10001) newId = 1025;
      else if (pokemonId > 1 && pokemonId <= 1025) newId = pokemonId - 1;
      else if (pokemonId > 10001 && pokemonId <= 10279) newId = pokemonId - 1;
      else return null;
    }

    // if (pokemonToChange === 'next' && pokemonId === 1025) newId = 10001;
    // else if (pokemonToChange === 'prev' && pokemonId === 10001) newId = 1025;
    // else if (pokemonToChange === 'next') newId = pokemonId + 1;
    // else if (pokemonToChange === 'prev') newId = pokemonId - 1;

    const { data: pokemonData } = await axios.get(
      `${POKEMON_INFO_URL}${newId}`,
    );

    if (!pokemonData) return null;

    const { data: specieData } = await axios.get(pokemonData.species.url);

    return {
      name: pokemonData.name,
      pokedexNumber: specieData.id,
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
    console.error(
      `An error occurred while fetching the Pokeon info.\n\n${error}`,
    );
    return null;
  }
};

const fetchPokemonTCGCards = async (
  pokemonName: string,
): Promise<CardsTCGType[]> => {
  const formatedName = formatPokemonName(pokemonName);

  try {
    const { data: cardsData } = await axios.get(
      `${POKEMON_CARDS_TCG_URL}"${formatedName}"`,
    );

    const cards: CardsTCGType[] = cardsData.data.map((card: CardsApiModel) => {
      return {
        img: card.images.large,
      };
    });

    return cards;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the pokemon TCG cards.\n\n${error}`,
    );
  }
};

const formatPokemonName = (pokemonName: string): string => {
  const splitName = pokemonName.split('-');
  const baseName = splitName[0];
  const form = splitName[1];

  console.log(`Nombre base: ${baseName}.\n\nForma: ${form}`);

  const formatPrefixes: Record<string, string> = {
    mega: 'm',
    gmax: 'vmax',
    alola: 'alolan',
    galar: 'galarian',
    hisui: 'hisuian',
    paldea: 'paldean',
  };

  const specialCases: Record<string, string> = {
    'groudon-primal': 'primal groudon',
    'kyogre-primal': 'primal kyogre',
    'giratina-altered': 'giratina',
    'giratina-origin': 'giratina',
    'palkia-origin': 'origin forme palkia',
    'dialga-origin': 'origin forme dialga',
    'kyurem-white': 'white kyurem',
    'kyurem-black': 'black kyurem',
    'deoxys-normal': 'deoxys',
    'deoxys-attack': 'deoxys',
    'deoxys-defense': 'deoxys',
    'deoxys-speed': 'deoxys',
    'ogerpon-hearthflame-mask': 'hearthflame mask ogerpon',
    'ogerpon-wellspring-mask': 'wellspring mask ogerpon',
    'ogerpon-cornerstone-mask': 'cornerstone mask ogerpon',
    'tapu-koko': 'tapu koko',
    'tapu-lele': 'tapu lele',
    'tapu-bulu': 'tapu bulu',
    'tapu-fini': 'tapu fini',
  };

  const pokemonNamesWithHyphens = [
    'kommo-o',
    'jangmo-o',
    'hakamo-o',
    "farfetch'd",
    "sirfetch'd",
  ];

  if (pokemonNamesWithHyphens.includes(pokemonName)) {
    return pokemonName;
  }

  if (specialCases[pokemonName]) {
    return specialCases[pokemonName];
  }

  if (form && formatPrefixes[form]) {
    if (form === 'gmax') {
      return `${baseName} ${formatPrefixes[form]}`;
    }
    return `${formatPrefixes[form]} ${baseName}`;
  }

  return baseName || ' ';
};
