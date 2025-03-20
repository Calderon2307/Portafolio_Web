import axios from 'axios';
import { ItemInfo } from '@models/items';
import { POKEMON_ITEM_URL, POKEMON_CARDS_TCG_URL } from '@routes/api.routes';

type EffectEntryApiModel = {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
};

type AttributesApiModel = {
  name: string;
  url: string;
};

type ShortDescriptionApiModel = {
  language: {
    name: string;
    url: string;
  };
  text: string;
  version_group: {
    name: string;
    url: string;
  };
};

type CardsApiModel = {
  images: {
    large: string;
    small: string;
  };
};

type CardsTCGType = {
  img: string;
};

export const fetchItemInformation = async (
  itemName: string,
): Promise<ItemInfo> => {
  try {
    const { data: itemData } = await axios.get(
      `${POKEMON_ITEM_URL}${itemName}`,
    );

    const { data: pocketData } = await axios.get(itemData.category.url);

    const itemDescriptionAndEffect: EffectEntryApiModel =
      itemData?.effect_entries.find(
        (entry: EffectEntryApiModel) => entry.language.name === 'en',
      );

    const itemAttributes: string[] = itemData.attributes.map(
      (attribute: AttributesApiModel) => attribute.name,
    );

    const shortItemDescription =
      itemData?.flavor_text_entries.filter(
        (entry: ShortDescriptionApiModel) => entry.language.name === 'en',
      )[0]?.text ?? 'No information avaible';

    const itemCardsTCG = await fetchItemTCGCards(itemData.name);

    return {
      id: itemData.id,
      name: itemData.name,
      cost: itemData.cost,
      category: itemData.category.name,
      subCategory: pocketData.pocket.name,
      description:
        itemDescriptionAndEffect?.effect ?? 'This item has no description yet',
      effect:
        itemDescriptionAndEffect?.short_effect ?? 'This item has no effect yet',
      shortDescription: shortItemDescription,
      sprite: itemData.sprites.default,
      heldPokemon: itemData.held_by_pokemon.length,
      attributes: itemAttributes,
      cards: itemCardsTCG,
    };
  } catch (error) {
    throw new Error(`Error fetching item information.\n\n${error}`);
  }
};

const fetchItemTCGCards = async (itemName: string): Promise<CardsTCGType[]> => {
  try {
    const formatName = castItemName(itemName);

    const { data: cardsData } = await axios.get(
      `${POKEMON_CARDS_TCG_URL}"${formatName}"`,
    );

    const cards: CardsTCGType[] = cardsData.data.map((card: CardsApiModel) => {
      return {
        img: card.images.large,
      };
    });

    return cards;
  } catch (error) {
    throw new Error(`Error fetching item cards.\n\n${error}`);
  }
};

const castItemName = (itemName: string): string => {
  const specialCases: Record<string, string> = {
    'poke-ball': 'poké ball',
  };

  if (specialCases[itemName]) {
    return specialCases[itemName];
  }

  return itemName.split('-').join(' ');
};
