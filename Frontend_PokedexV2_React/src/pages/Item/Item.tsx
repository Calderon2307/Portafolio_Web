import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header/Header';
import ItemMainDetails from '@components/ItemMainDetails/ItemMainDetails';
import ItemSummary from '@components/ItemSummary/ItemSummary';
import LoadingView from '@components/LoadingView/LoadingView';
import { capitalizeText } from '@utils/formatText';
import { useParams } from 'react-router-dom'; //IMPORT OF PARAMS
import { ItemInfo } from '@models/items';
import { useState, useEffect } from 'react';
import { fetchItemInformation } from '@services/ItemServices/itemFullInfoService';
import noFoundFavicon from '@assets/icons/Not_Found_Favicon.png';
import style from '@pages/Item/Item.module.css';

const Item = () => {
  const { itemId, itemName } = useParams(); //TO DE HTTP REQUEST FROM THE OBJETC
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemObject, setItemObject] = useState<ItemInfo>({
    id: 0,
    name: '',
    cost: 0,
    category: '',
    subCategory: '',
    description: '',
    effect: '',
    shortDescription: '',
    sprite: null,
    heldPokemon: 0,
    attributes: [''],
    cards: [
      {
        img: '',
      },
    ],
  });
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const itemInfo = await fetchItemInformation(itemId!);
        setItemObject(itemInfo);
      } catch (error) {
        alert(`${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const itemFormatedName = capitalizeText(itemName!);

  return isLoading ? (
    <>
      <Helmet>
        <title>{itemFormatedName} | Pokedex</title>
        <link rel="shortcut icon" href={noFoundFavicon} type="image/x-icon" />
      </Helmet>
      <LoadingView message={`Loading all info for ${itemFormatedName} item.`} />
    </>
  ) : (
    <>
      <Helmet>
        <title>{itemFormatedName} | Pokedex</title>
        <link
          rel="shortcut icon"
          href={itemObject.sprite ?? noFoundFavicon}
          type="image/x-icon"
        />
      </Helmet>
      <Header mode="complete" showSearchBar={false} />
      <article className={`${style.mainSection}`}>
        <ItemSummary
          name={itemObject.name}
          shortDescription={itemObject.shortDescription}
          sprite={itemObject.sprite}
          category={itemObject.category}
          subCategory={itemObject.subCategory}
          cost={itemObject.cost}
          heldPokemon={itemObject.heldPokemon}
        />
        <ItemMainDetails
          name={itemObject.name}
          description={itemObject.description}
          effect={itemObject.effect}
          attributes={itemObject.attributes}
          cards={itemObject.cards}
        />
      </article>
    </>
  );
};

export default Item;
