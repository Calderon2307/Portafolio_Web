import { ItemCard } from '@models/items';
import { capitalizeText } from '@utils/formatText';
import itemNotFound from '@assets/icons/Not_Found_Sprite_Item.gif';
import style from '@components/ItemInfoCard/ItemInfoCard.module.css';

type ExtraPropsType = {
  size?: 'normal' | 'medium' | 'small';
  onClickId: (id: number, name: string) => void;
};

type InfoCardType = ItemCard & ExtraPropsType;

const ItemInfoCard: React.FC<InfoCardType> = ({
  id,
  name,
  category,
  subCategory,
  sprite,
  onClickId,
  size = 'normal',
}) => {
  const formatedName = capitalizeText(name);
  const formatedCategory = capitalizeText(category);
  const formatedSubCategory = capitalizeText(subCategory);

  return (
    <article
      className={`${style.card} ${style[`card--${size}`]}`}
      onClick={() => onClickId(id, name)}
      title={`See full information about the ${formatedName}`}
    >
      <section
        className={`${style.spriteSection} ${style[`spriteSection--${size}`]}`}
      >
        <img
          src={sprite ?? itemNotFound}
          alt={`${formatedName} image`}
          className={`${style.itemSprite} ${style[`itemSprite--${size}`]}`}
          title={`${formatedName} sprite`}
        />
      </section>
      <section className={`${style.infoSection}`}>
        <h2
          className={`${style.itemTitle} ${style[`itemTitle--${size}`]}`}
          title={`Item name: ${formatedName}`}
        >
          {formatedName}
        </h2>
        <p
          className={`${style.category} ${style[`category--${size}`]}`}
          title={`${formatedName} category: ${formatedCategory}`}
        >
          Category:{' '}
          <span
            className={`${style.categoryName} ${style[`categoryName--${size}`]}`}
          >
            {formatedCategory}
          </span>
        </p>
        <p
          className={`${style.subCategory} ${style[`subCategory--${size}`]}`}
          title={`${formatedName} subcategory: ${formatedSubCategory}`}
        >
          Subcategory:{' '}
          <span
            className={`${style.subCategoryName} ${style[`subCategoryName--${size}`]}`}
          >
            {formatedSubCategory}
          </span>
        </p>
      </section>
    </article>
  );
};

export default ItemInfoCard;
