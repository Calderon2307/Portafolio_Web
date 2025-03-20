export interface ItemInfo {
  id: number;
  name: string;
  cost: number;
  category: string;
  subCategory: string;
  description: string; //effect
  effect: string; //short effect
  shortDescription: string;
  sprite: string | null;
  heldPokemon: number;
  attributes: string[];
  cards: {
    img: string;
  }[];
}

export interface ItemsCategories {
  id: number; //id del pocket
  name: string;
}

export type ItemCard = Pick<
  ItemInfo,
  'id' | 'name' | 'category' | 'subCategory' | 'sprite'
>;
