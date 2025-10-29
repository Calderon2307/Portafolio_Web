import { useState, useRef } from 'react';
import { ItemInfo } from '@models/items';
import { capitalizeText } from '@utils/formatText';
import pokeballIcon from '@assets/icons/pokeballSolid.png';
import effectIcon from '@assets/icons/effect.png';
import attributesIcon from '@assets/icons/attributes.png';
import tcgIcon from '@assets/icons/tcgSolid.png';
import style from '@components/ItemMainDetails/ItemMainDetails.module.css';

type ItemDetails = Pick<
  ItemInfo,
  'name' | 'description' | 'effect' | 'attributes' | 'cards'
>;

const ItemMainDetails: React.FC<ItemDetails> = ({
  name,
  description,
  effect,
  attributes,
  cards,
}) => {
  const carrousellRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleWheel = (e: React.WheelEvent) => {
    const carousel = carrousellRef.current;
    if (!carousel) return;

    e.preventDefault();

    carousel.scrollLeft += e.deltaY;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const carousel = carrousellRef.current;

    if (!carousel) return;

    setIsDragging(true);
    setStartX(e.pageX - carousel.offsetLeft);
    setScrollLeft(carousel.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const carousel = carrousellRef.current;
    if (!carousel) return;

    const x = e.pageX - carousel.offsetLeft;
    const desp = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - desp;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const itemNameFormat = capitalizeText(name);

  return (
    <>
      <article className={`${style.detailsSection}`}>
        <section
          className={`${style.nameSection}`}
          title={`${itemNameFormat} description`}
        >
          <div className={`${style.titleWrapper}`}>
            <h3 className={`${style.itemDescriptionTitle}`}>Description</h3>
            <img
              src={pokeballIcon}
              alt="Pokeball Icon"
              className={`${style.icon}`}
            />
          </div>
          <p className={`${style.itemDescription}`}>{description}</p>
        </section>
        <section
          className={`${style.effectSection}`}
          title={`${itemNameFormat} effect`}
        >
          <div className={`${style.titleWrapper}`}>
            <h3 className={`${style.itemEffectTitle}`}>Effect</h3>
            <img
              src={effectIcon}
              alt="Effect Icon"
              className={`${style.icon}`}
            />
          </div>
          <p className={`${style.itemEffect}`}>{effect}</p>
        </section>
        <section
          className={`${style.attributesSection}`}
          title={`${itemNameFormat} attributes`}
        >
          <div className={`${style.titleWrapper}`}>
            <h3 className={`${style.itemAttributesTitle}`}>Attributes</h3>
            <img
              src={attributesIcon}
              alt="Attributes Icon"
              className={`${style.icon}`}
            />
          </div>
          <section className={`${style.attributesContainer}`}>
            {attributes.length > 0 ? (
              attributes.map((attribute) => {
                const attributeFormated = attribute.split('-').join(' ');
                return (
                  <div
                    key={`${attribute}`}
                    className={`${style.attribute}`}
                    title={`This item is ${attributeFormated}`}
                  >
                    {attributeFormated}
                  </div>
                );
              })
            ) : (
              <p className={`${style.noAttributes}`}>
                This item does not have attributes yet.
              </p>
            )}
          </section>
        </section>

        <section
          className={`${style.cardsSection}`}
          title={`${itemNameFormat} TCG cards`}
        >
          <div className={`${style.titleWrapper}`}>
            <h3 className={`${style.itemTCGCardsTitle}`}>
              {itemNameFormat} TCG Cards
            </h3>
            <img
              src={tcgIcon}
              alt="TCG Icon"
              className={`${style.icon}`}
            />
          </div>

          <section className={`${style.cardsSection}`}>
            <section
              className={`${style.tcgCardsContainer}`}
              ref={carrousellRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onWheel={handleWheel}
            >
              {cards.length > 0 ? (
                cards.map((card, index) => {
                  return (
                    <figure
                      key={index}
                      className={`${style.tcgCardImgContainer}`}
                      title={`${itemNameFormat} TCG card ${index + 1}`}
                    >
                      <img
                        src={card.img}
                        alt={`Item TCG Card ${index}`}
                        className={`${style.tcgCardImg}`}
                      />
                    </figure>
                  );
                })
              ) : (
                <p className={`${style.noCardsMessage}`}>
                  This item has no TCG cards
                </p>
              )}
            </section>
            <h4 className={`${style.tcgCardsCount}`}>
              {itemNameFormat} TCG Cards: {cards.length}
            </h4>
          </section>
        </section>
      </article>
    </>
  );
};

export default ItemMainDetails;
