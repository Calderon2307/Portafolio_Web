import { ItemInfo } from '@models/items';
import { capitalizeText } from '@utils/formatText';
import notFoundSprite from '@assets/icons/Not_Found_Sprite_Alt.gif';
import pokeDollarIcon from '@assets/icons/pokeDollar.png';
import style from '@components/ItemSummary/ItemSummary.module.css';

type ItemSummaryInfo = Pick<
  ItemInfo,
  | 'name'
  | 'shortDescription'
  | 'sprite'
  | 'category'
  | 'subCategory'
  | 'cost'
  | 'heldPokemon'
>;

const ItemSummary: React.FC<ItemSummaryInfo> = ({
  name,
  shortDescription,
  sprite,
  category,
  subCategory,
  cost,
  heldPokemon,
}) => {
  const itemSprite = sprite ?? notFoundSprite;
  const itemNameFormat = capitalizeText(name);
  const categoryFormat = capitalizeText(category);
  const subCategoryFormat = capitalizeText(subCategory);
  return (
    <>
      <article className={`${style.summarySection}`}>
        <h2
          className={`${style.itemNameTitle}`}
          title={`Item name: ${itemNameFormat}`}
        >
          {itemNameFormat}
        </h2>
        <section className={`${style.itemSpriteSection}`}>
          <p
            className={`${style.itemShortDescription}`}
            title={`${itemNameFormat} short description`}
          >
            "{shortDescription}"
          </p>
          <figure className={`${style.itemSpriteContainer}`}>
            <img
              src={itemSprite}
              alt={`${itemNameFormat} Sprite`}
              title={`${itemNameFormat} sprite`}
              className={`${style.itemSprite}`}
            />
          </figure>
        </section>
        <section className={`${style.itemInfoSection}`}>
          <p
            className={`${style.itemInfo}`}
            title={`${itemNameFormat} category: ${categoryFormat}`}
          >
            <span className={`${style.itemInfoSubtitle}`}>Category:</span>{' '}
            {categoryFormat}
          </p>
          <p
            className={`${style.itemInfo}`}
            title={`${itemNameFormat} subcategory: ${subCategoryFormat}`}
          >
            <span className={`${style.itemInfoSubtitle}`}>Subcategory:</span>{' '}
            {subCategoryFormat}
          </p>
          <p
            className={`${style.itemInfo}`}
            title={`${itemNameFormat} cost: ${cost} pokedollars`}
          >
            <span className={`${style.itemInfoSubtitle}`}>Cost:</span>
            <span className={`${style.contentWrapper}`}>
              {cost}
              <img
                src={pokeDollarIcon}
                alt="Pokedollar Icon"
                className={`${style.icon}`}
              />
            </span>
          </p>
          <p
            className={`${style.itemInfo}`}
            title={`${itemNameFormat} is held by ${heldPokemon} pokemon`}
          >
            <span className={`${style.itemInfoSubtitle}`}>Held By:</span>{' '}
            {heldPokemon} Pokemon
          </p>
        </section>
      </article>
    </>
  );
};

export default ItemSummary;
