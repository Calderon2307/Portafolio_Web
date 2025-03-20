import style from '@components/TypeButton/TypeButton.module.css';
import { TypeData } from '@models/types';
import { Link } from 'react-router-dom';

type TypeButtonProps = Omit<TypeData, 'index'>;

const TypeButton: React.FC<TypeButtonProps> = ({ name, logo }) => {
  return (
    <>
      <Link
        to={`/pokedex/type/${name}`}
        className={`${name} ${style.buttonType}`}
        title={`See all ${name.toUpperCase()} type Pokémon`}
      >
        <p className={`${style.typeName}`}>{name.toUpperCase()}</p>
        <div className={`${style.iconTypeContainer}`}>
          <img
            src={logo}
            alt={`${name} logo`}
            className={`${style.iconType}`}
          />
        </div>
      </Link>
    </>
  );
};

export default TypeButton;
