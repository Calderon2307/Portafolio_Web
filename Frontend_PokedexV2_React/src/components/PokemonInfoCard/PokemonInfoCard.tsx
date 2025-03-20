import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PokemonCard } from '@models/pokemon';
import { capitalizeText } from '@utils/formatText';
import shinyIcon from '@assets/icons/shinySolid.png';
import notFoundIcon from '@assets/icons/Not_Found_Sprite_Alt.gif';
import style from '@components/PokemonInfoCard/PokemonInfoCard.module.css';

// type Functions = {
//   onClickId: (id: number, name: string) => void;
// };

type PokemonInfoCardProps = Omit<PokemonCard, 'pokemonId'>;
type ExtraProps = {
  size?: 'normal' | 'medium' | 'small';
};

//type PokemonCardType = PokemonCard & Functions;

const PokemonInfoCard: React.FC<PokemonInfoCardProps & ExtraProps> = ({
  pokedexNumber,
  name,
  nameMeaning,
  height,
  weight,
  types,
  sprites,
  evolvesFrom,
  size = 'small',
}) => {
  const [showShiny, setShowShiny] = useState<boolean>(false);
  const [showSprites, setShowSprites] = useState<string>(``);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleShiny = () => {
    if (showShiny) {
      setShowSprites(`${style.hideShinySprite}`);
      setIsAnimating(true);
      setTimeout(() => {
        setShowShiny(false);
        setIsAnimating(false);
      }, 150);
    } else {
      setShowShiny(true);
      setShowSprites(`${style.showShinySprite}`);
    }
  };

  const formatName = capitalizeText(name);

  let formatNamePre;
  if (evolvesFrom) formatNamePre = capitalizeText(evolvesFrom.name);

  const formatHeight = height / 10 < 1 ? `${height * 10}cm` : `${height / 10}m`;

  const formatWeight = weight / 10 < 1 ? `${weight * 10}g` : `${weight / 10}kg`;

  const preEvolSprite = showShiny
    ? (evolvesFrom?.sprites.shiny ?? notFoundIcon)
    : (evolvesFrom?.sprites.normal ?? notFoundIcon);

  const pokemonSprite = showShiny
    ? (sprites.shiny ?? notFoundIcon)
    : (sprites.normal ?? notFoundIcon);

  return (
    <article className={`${style.cardContainer}`}>
      <article
        className={`${style.card} ${showShiny ? style.rotateCard : ''} ${style[`card--${size}`]}`}
      >
        {evolvesFrom && (
          <div
            className={`${style.evolvesFromFlipContainer} ${style[`evolvesFromFlipContainer--${size}`]}`}
          >
            <figure
              className={`${style.evolvesFromContainer} ${style.evolvesFromFront}`}
            >
              <img
                src={preEvolSprite}
                alt={`${formatNamePre} Sprite`}
                title={`Pre-Evolution: ${formatNamePre} - ${evolvesFrom.pokedexNumber}`}
                className={`${style.evolvesFromSprite}`}
              />
            </figure>
            <figure
              className={`${style.evolvesFromContainer} ${style.evolvesFromBack}`}
            ></figure>
          </div>
        )}
        <section className={`${style.cardFront}`}>
          <section className={`${style.spriteContainer}`}>
            <div
              className={`${style.numberShinyWrapper} ${style[`numberShinyWrapper--${size}`]}`}
            >
              <span
                className={`${style.pokedexID} ${style[`pokedexID--${size}`]}`}
                title={`${formatName} pokédex number: ${pokedexNumber}`}
              >
                N.° {pokedexNumber}
              </span>
              {(showShiny || isAnimating) && (
                <img
                  src={shinyIcon}
                  alt="Shiny Icon"
                  className={`${style.shinyIconSprite} ${showSprites} ${style[`shinyIconSprite--${size}`]}`}
                />
              )}
            </div>
            <img
              src={pokemonSprite}
              alt={`${formatName} sprite`}
              className={`${style.sprite} ${showShiny ? style.shinyGlow : ''}`}
              title={`${pokemonSprite === notFoundIcon ? 'Sprite not found' : showShiny ? 'Shiny' : ''} ${formatName}`}
            />
          </section>
          <article
            className={`${style.pokemonInfo} ${style[`pokemonInfo--${size}`]}`}
          >
            <section className={`${style.nameShinySection}`}>
              <Link
                to={`/pokemon/${pokedexNumber}/${name
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')}`}
              >
                <h2
                  className={`${style.name} ${style[`name--${size}`]}`}
                  title={`See full information about ${formatName}`}
                >
                  {formatName}
                </h2>
              </Link>
              <button
                onClick={handleShiny}
                className={`${style.shinyButton} ${style[`shinyButton--${size}`]}`}
                title={`${showShiny ? `Show ${formatName} normal version` : `Show ${formatName} shiny version`}`}
              >
                <div
                  className={`${style.toggleShiny} ${showShiny ? style.shinyActive : style.shinyDisabled} ${style[`toggleShiny--${size}`]}`}
                >
                  <img
                    src={shinyIcon}
                    alt="Shiny Icon"
                    className={`${style.shinyIcon}`}
                  />
                </div>
              </button>
            </section>
            <section className={`${style.meaningSection}`}>
              <h3
                className={`${style.nameMeaning} ${style[`nameMeaning--${size}`]}`}
                title={`${formatName} name meaning: ${nameMeaning}`}
              >
                {nameMeaning}
              </h3>
            </section>
            <section
              className={`${style.dimensionsSection} ${style[`dimensionsSection--${size}`]}`}
            >
              <p
                className={`${style.dimension} ${style[`dimension--${size}`]}`}
                title={`${formatName} height: ${formatHeight}`}
              >
                <span className={`${style.dimensionTitle}`}>Height:</span>{' '}
                {formatHeight}
              </p>
              <p
                className={`${style.dimension} ${style[`dimension--${size}`]}`}
                title={`${formatName} weight: ${formatWeight}`}
              >
                <span className={`${style.dimensionTitle}`}>Weight:</span>{' '}
                {formatWeight}
              </p>
            </section>
            <section
              className={`${style.typesSection} ${style[`typesSection--${size}`]}`}
            >
              {types.map((type: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={`${type} ${style.type} ${style[`type--${size}`]}`}
                    title={`${formatName} type ${index + 1}: ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                  >
                    {type.toUpperCase()}
                  </div>
                );
              })}
            </section>
          </article>
        </section>
        <section className={`${style.cardBack}`}></section>
      </article>
    </article>
  );
};

export default PokemonInfoCard;
