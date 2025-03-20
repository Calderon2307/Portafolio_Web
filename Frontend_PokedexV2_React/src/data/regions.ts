import kanto from '@assets/regions/region1Kanto.png';
import johto from '@assets/regions/region2Johto.png';
import hoenn from '@assets/regions/region3Hoenn.png';
import sinnoh from '@assets/regions/region4Sinnoh.png';
import teselia from '@assets/regions/region5Teselia.png';
import kalos from '@assets/regions/region6Kalos.png';
import alola from '@assets/regions/region7Alola.png';
import galar from '@assets/regions/region8Galar.png';
import paldea from '@assets/regions/region9Paldea.jpg';
import hisui from '@assets/regions/region4_1Hisui.png';

import { RegionData } from '@models/region';

export const Regions: RegionData[] = [
  {
    name: 'kanto',
    img: kanto,
    index: 1,
    pokedexStart: 0,
    pokedexEnd: 151,
  },
  {
    name: 'johto',
    img: johto,
    index: 2,
    pokedexStart: 151,
    pokedexEnd: 100,
  },
  {
    name: 'hoenn',
    img: hoenn,
    index: 3,
    pokedexStart: 251,
    pokedexEnd: 135,
  },
  {
    name: 'sinnoh',
    img: sinnoh,
    index: 4,
    pokedexStart: 386,
    pokedexEnd: 108,
  },
  {
    name: 'unova',
    img: teselia,
    index: 5,
    pokedexStart: 494,
    pokedexEnd: 155,
  },
  {
    name: 'kalos',
    img: kalos,
    index: 6,
    pokedexStart: 649,
    pokedexEnd: 72,
  },
  {
    name: 'alola',
    img: alola,
    index: 7,
    pokedexStart: 721,
    pokedexEnd: 88,
  },
  {
    name: 'galar',
    img: galar,
    index: 8,
    pokedexStart: 809,
    pokedexEnd: 96,
  },
  {
    name: 'paldea',
    img: paldea,
    index: 10,
    pokedexStart: 905,
    pokedexEnd: 120,
  },
  {
    name: 'hisui',
    img: hisui,
    index: 9,
  },
];
