import axios from 'axios';
import { ItemCard } from '@models/items';
import { POKEMON_ITEM_URL } from '@routes/api.routes';

type CompleteItemsTypeAPiModel = {
  count: number;
  nextUrl: string;
  prevUrl: string;
  results: ItemCard[];
};

type CompleteItemsTypeAPiModelWCount = Omit<CompleteItemsTypeAPiModel, 'count'>;

type ItemResultsApiModel = {
  name: string;
  url: string;
};

export const fetchCompleteItems = async (
  url: string,
): Promise<CompleteItemsTypeAPiModel> => {
  try {
    let itemsCardArr: ItemCard[] = [];

    const { data: itemsData } = await axios.get(url);

    const _itemsCardArr = itemsData.results.map((item: ItemResultsApiModel) =>
      fetchCardInfoItem(item.name),
    );

    itemsCardArr = await Promise.all(_itemsCardArr);

    return {
      count: itemsData.count,
      nextUrl: itemsData.next,
      prevUrl: itemsData.previous,
      results: itemsCardArr,
    };
  } catch (error) {
    throw new Error(`An error occurred while fetching Items.\n\n${error}`);
  }
};

export const fetchCompleteItemsWithUrl = async (
  limit: number,
  offset: number,
): Promise<CompleteItemsTypeAPiModelWCount> => {
  try {
    let itemsCardArr: ItemCard[] = [];

    const { data: itemsData } = await axios.get(
      `https://pokeapi.co/api/v2/item?offset=${offset}&limit=${limit}`,
    );

    const _itemsCardArr = itemsData.results.map((item: ItemResultsApiModel) =>
      fetchCardInfoItem(item.name),
    );

    itemsCardArr = await Promise.all(_itemsCardArr);

    return {
      nextUrl: itemsData.next,
      prevUrl: itemsData.previous,
      results: itemsCardArr,
    };
  } catch (error) {
    throw new Error(`An error occurred while fetching Items.\n\n${error}`);
  }
};

export const fetchCardInfoItem = async (name: string): Promise<ItemCard> => {
  try {
    const { data: itemData } = await axios.get(`${POKEMON_ITEM_URL}${name}`);

    const { data: itemCategoryData } = await axios.get(itemData.category.url);

    return {
      id: itemData.id,
      name: itemData.name,
      category: itemData.category.name,
      sprite: itemData.sprites.default,
      subCategory: itemCategoryData.pocket.name,
    };
  } catch (error) {
    throw new Error(
      `An error occurred while fetching item ${name.toUpperCase()} information.\n\n${error}`,
    );
  }
};
