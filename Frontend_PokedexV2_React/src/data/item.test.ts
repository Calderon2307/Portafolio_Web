import { ItemCard } from '@models/items';

export const itemsCards: ItemCard[] = [
  {
    id: 1,
    name: 'Pokeball',
    category: 'balls',
    subCategory: 'standard-balls',
    sprite: '/src/assets/tests/pokeball.png',
  },
  {
    id: 2,
    name: 'Masterball',
    category: 'balls',
    subCategory: 'standard-balls',
    sprite: '/src/assets/tests/masterball.png',
  },
  {
    id: 3,
    name: 'Potion',
    category: 'consumibles',
    subCategory: 'medicine',
    sprite: '/src/assets/tests/potion.png',
  },
  {
    id: 4,
    name: 'Frambu Berry',
    category: 'berries',
    subCategory: 'berries',
    sprite: '/src/assets/tests/berry.png',
  },
  {
    id: 5,
    name: 'MT [name]',
    category: 'mt/mo',
    subCategory: 'machines',
    sprite: '/src/assets/tests/mt.png',
  },
];
