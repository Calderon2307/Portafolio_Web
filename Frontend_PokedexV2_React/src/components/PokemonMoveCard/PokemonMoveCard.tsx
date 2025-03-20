import { capitalizeText } from '@utils/formatText';
import { Move } from '@models/moves';
import style from '@components/PokemonMoveCard/PokemonMoveCard.module.css';

const PokemonMoveCard: React.FC<Move> = ({
  name,
  description,
  type,
  effect,
  damage,
  accuracy,
  pp,
  otherPokemons,
}) => {
  const formatName = capitalizeText(name);

  const formatType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <article className={`${style.movementCard}`}>
      <section
        className={`${style.cardHeader} ${type}`}
        title={`Movement name: ${formatName}`}
      >
        <h4 className={`${style.movementName}`}>{formatName}</h4>
      </section>
      <section className={`${style.cardBody} ${type.concat('-background')}`}>
        <p className={`${style.info}`} title={`Movement description`}>
          {description}
        </p>
        <p className={`${style.info}`} title={`Movement type: ${formatType}`}>
          <span className={`${style.subtitle}`}>Type:</span> {formatType}
        </p>
        <p className={`${style.info}`} title={`Movement effect`}>
          <span className={`${style.subtitle}`}>Effect:</span> {effect}
        </p>
        <section className={`${style.wrapper}`}>
          <p className={`${style.info}`} title={`Movement damage`}>
            <span className={`${style.subtitle}`}>Damage:</span> {damage}
          </p>
          <p className={`${style.info}`} title={`Movement accuracy`}>
            <span className={`${style.subtitle}`}>Accuracy:</span> {accuracy}
          </p>
        </section>
        <p className={`${style.info}`} title={`Movement power points`}>
          <span className={`${style.subtitle}`}>PP:</span> {pp}
        </p>
        <p
          className={`${style.info}`}
          title={`This move is learned by ${otherPokemons} pokemons`}
        >
          <span className={`${style.subtitle}`}>Learned By:</span>{' '}
          {otherPokemons} Pokemon
        </p>
      </section>
    </article>
  );
};

export default PokemonMoveCard;
