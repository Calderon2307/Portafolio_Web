import style from '@components/DamageRelationView/DamageRelationView.module.css';
import { TypeRelation } from '@models/types';
import damageIcon from '@assets/icons/combatAlt.png';

const DamageRelationView: React.FC<TypeRelation> = ({
  effectiveness,
  damageMultiplier,
  types,
}) => {
  return (
    <article className={`${style.typeRelationCard}`}>
      <section className={`${style.cardHeader} ${style[effectiveness]}`}>
        <figure className={`${style.iconContainer}`}>
          <img
            src={damageIcon}
            alt="Damage Icon"
            className={`${style.icon} ${effectiveness === 'immune' ? style.whiteShadow : ''}`}
          />
        </figure>
        <h4 className={`${style.subtitle}`}>
          {`${effectiveness.replace('-', ' ')} - (${damageMultiplier})`}
        </h4>
      </section>

      <section className={`${style.cardBody}`}>
        {types.map((type: string) => {
          return (
            <span
              className={`${type} ${style.type}`}
              title={`${type.charAt(0).toUpperCase() + type.slice(1)} type`}
            >
              {type.toUpperCase()}
            </span>
          );
        })}
      </section>
    </article>
  );
};

export default DamageRelationView;
