import style from '@components/RegionContainer/RegionContainer.module.css';
import { RegionData } from '@models/region';
import { Link } from 'react-router-dom';

type RegionContainerProps = Omit<RegionData, 'pokedexStart' | 'pokedexEnd'>;

const RegionContainer: React.FC<RegionContainerProps> = ({
  name,
  img,
  index,
}) => {
  let newIndex: number;

  switch (name) {
    case 'paldea':
      newIndex = index - 1;
      break;
    case 'hisui':
      newIndex = 4.5;
      break;
    default:
      newIndex = index;
      break;
  }
  return (
    <Link
      to={`/pokedex/region/${name}`}
      title={`See all ${name.toUpperCase()} Pokémon`}
      className={`${style.regionContainer}`}
    >
      <span className={`${style.regionTitle}`}>{name.toUpperCase()}</span>
      <img
        src={img}
        alt={`${name.toUpperCase()} Region Picture`}
        className={`${style.regionImg}`}
      />
      <span className={`${style.regionIndex}`}>{newIndex}</span>
    </Link>
  );
};

export default RegionContainer;
