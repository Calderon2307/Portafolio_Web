import axios from 'axios';
import { ItemCard } from '@models/items';
import { fetchCardInfoItem } from '@services/ItemServices/itemCardService';
import { POKEMON_ITEM_POCKET_URL } from '@routes/api.routes';

type CategoryPocketApiModel = {
  name: string;
  url: string;
};

export const fetchItemsByCategory = async (
  categoryId: number,
): Promise<ItemCard[]> => {
  try {
    const { data: pocketData } = await axios.get(
      `${POKEMON_ITEM_POCKET_URL}${categoryId}`,
    );

    const _itemsArr = await fetchItemsWithSelectedPocket(pocketData.categories);

    const itemsArr = await Promise.all(_itemsArr);

    return itemsArr;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the items for the selected category.\n\n${error}`,
    );
  }
};

const fetchItemsWithSelectedPocket = async (
  pokcetArr: CategoryPocketApiModel[],
): Promise<ItemCard[]> => {
  try {
    const itemsPocketArr: ItemCard[] = [];

    for (const itemElement of pokcetArr) {
      const { data: categoryData } = await axios.get(itemElement.url);

      const _items = categoryData.items.map((item: CategoryPocketApiModel) =>
        fetchCardInfoItem(item.name),
      );

      const items: ItemCard[] = await Promise.all(_items);

      itemsPocketArr.push(...items);
    }

    return itemsPocketArr;
  } catch (error) {
    throw new Error(`An error ocurred while fetching the items.\n\n${error}`);
  }
};
