import { PokemonCard } from '@models/pokemon';

export const pokemonCards: PokemonCard[] = [
  {
    name: 'Metagross',
    nameMeaning: 'Iron Leg Pokémon',
    pokedexNumber: 376,
    height: 16, // 1.6m -> 16dm
    weight: 5500, // 550kg -> 5500hg
    types: ['steel', 'psychic'],
    sprites: {
      icon: '/src/assets/tests/metagross.png',
      normal: '/src/assets/tests/metagross.png',
      shiny: '/src/assets/tests/metagrossShiny.png',
    },
    evolvesFrom: {
      name: 'Metang',
      pokedexNumber: 375,
      sprites: {
        icon: '/src/assets/tests/metang.png',
        normal: '/src/assets/tests/metang.png',
        shiny: '/src/assets/tests/metangShiny.png',
      },
    },
  },
  {
    name: 'Garchomp',
    nameMeaning: 'Mach Pokémon',
    pokedexNumber: 445,
    height: 19, // 1.9m -> 19dm
    weight: 950, // 95kg -> 950hg
    types: ['dragon', 'ground'],
    sprites: {
      icon: '/src/assets/tests/garchomp.png',
      normal: '/src/assets/tests/garchomp.png',
      shiny: '/src/assets/tests/garchompShiny.png',
    },
    evolvesFrom: {
      name: 'Gabite',
      pokedexNumber: 444,
      sprites: {
        icon: '/src/assets/tests/gabite.png',
        normal: '/src/assets/tests/gabite.png',
        shiny: '/src/assets/tests/gabiteShiny.png',
      },
    },
  },
  {
    name: 'Salamence',
    nameMeaning: 'Dragon Pokémon',
    pokedexNumber: 373,
    height: 15, // 1.5m -> 15dm
    weight: 1026, // 102.6kg -> 1026hg
    types: ['dragon', 'flying'],
    sprites: {
      icon: '/src/assets/tests/salamence.png',
      normal: '/src/assets/tests/salamence.png',
      shiny: '/src/assets/tests/salamenceShiny.png',
    },
    evolvesFrom: {
      name: 'Shelgon',
      pokedexNumber: 372,
      sprites: {
        icon: '/src/assets/tests/shelgon.png',
        normal: '/src/assets/tests/shelgon.png',
        shiny: '/src/assets/tests/shelgonShiny.png',
      },
    },
  },
  {
    name: 'Tyranitar',
    nameMeaning: 'Armor Pokémon',
    pokedexNumber: 248,
    height: 20, // 2.0m -> 20dm
    weight: 2020, // 202kg -> 2020hg
    types: ['rock', 'dark'],
    sprites: {
      icon: '/src/assets/tests/tyranitar.png',
      normal: '/src/assets/tests/tyranitar.png',
      shiny: '/src/assets/tests/tyranitarShiny.png',
    },
    evolvesFrom: {
      name: 'Pupitar',
      pokedexNumber: 247,
      sprites: {
        icon: '/src/assets/tests/pupitar.png',
        normal: '/src/assets/tests/pupitar.png',
        shiny: '/src/assets/tests/pupitarShiny.png',
      },
    },
  },
  {
    name: 'Dragonite',
    nameMeaning: 'Dragon Pokémon',
    pokedexNumber: 149,
    height: 22, // 2.2m -> 22dm
    weight: 2100, // 210kg -> 2100hg
    types: ['dragon', 'flying'],
    sprites: {
      icon: '/src/assets/tests/dragonite.png',
      normal: '/src/assets/tests/dragonite.png',
      shiny: '/src/assets/tests/dragoniteShiny.png',
    },
    evolvesFrom: {
      name: 'Dragonair',
      pokedexNumber: 247,
      sprites: {
        icon: '/src/assets/tests/dragonair.png',
        normal: '/src/assets/tests/dragonair.png',
        shiny: '/src/assets/tests/dragonairShiny.png',
      },
    },
  },
  {
    name: 'Lapras',
    nameMeaning: 'Transport Pokémon',
    pokedexNumber: 131,
    height: 25, // 2.5m -> 25dm
    weight: 2200, // 220kg -> 2200hg
    types: ['water', 'ice'],
    sprites: {
      icon: '/src/assets/tests/lapras.png',
      normal: '/src/assets/tests/lapras.png',
      shiny: '/src/assets/tests/laprasShiny.png',
    },
    evolvesFrom: null, // Sin evolución previa
  },
];
