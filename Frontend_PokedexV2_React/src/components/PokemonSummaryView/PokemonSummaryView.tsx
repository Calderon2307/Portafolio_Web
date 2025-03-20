import { capitalizeText } from '@utils/formatText';
import { ShortViewPokemon } from '@models/pokemon';
import notFoundSpriteIcon from '@assets/icons/Not_Found_Sprite_Alt.gif';
import style from '@components/PokemonSummaryView/PokemonSummaryView.module.css';

type ExtraPropsType = {
  isShiny: boolean;
  size?: 'normal' | 'medium' | 'small';
};

const PokemonSummaryView: React.FC<ShortViewPokemon & ExtraPropsType> = ({
  sprites,
  name,
  types,
  isShiny,
  size = 'normal',
}) => {
  const formatName = capitalizeText(name);

  const pokemonSprite = isShiny
    ? (sprites.shiny ?? notFoundSpriteIcon)
    : (sprites.normal ?? notFoundSpriteIcon);
  return (
    <>
      <article className={`${style.infoContainer}`}>
        <figure
          className={`${style.pokemonSpriteContainer} ${style[`sizeSprite--${size}`]}`}
          title={`${isShiny ? 'Shiny' : ''} ${formatName}`}
        >
          <img
            src={pokemonSprite}
            alt={`${formatName} sprite`}
            className={`${style.pokemonSprite}`}
          />
        </figure>
        <h3 className={`${style.pokemonName} ${style[`sizeTitle--${size}`]}`}>
          {formatName}
        </h3>
        <section className={`${style.typesContainer}`}>
          {types.map((type: string) => {
            return (
              <span
                key={type}
                className={`${type} ${style.type} ${style[`sizeType--${size}`]}`}
                title={`${capitalizeText(type)} type`}
              >
                {type.toUpperCase()}
              </span>
            );
          })}
        </section>
      </article>
    </>
  );
};

export default PokemonSummaryView;
