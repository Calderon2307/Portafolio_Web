import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header/Header';
import RegionContainer from '@components/RegionContainer/RegionContainer';
import { RegionData } from '@models/region';
import { Regions } from '@data/regions';
import faviconIcon from '@assets/icons/Favicon.png';
import style from '@pages/SearchRegion/SearchRegion.module.css';
const SearchRegion = () => {
  return (
    <>
      <Helmet>
        <title>Search Region | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <Header mode={'complete'} showSearchBar={false} />
      <div className={`${style.regionsWrapper}`}>
        <h2 className={`${style.title}`}>Select a Region:</h2>
        <section className={`${style.regionsContainer}`}>
          {Regions.map((region: RegionData) => {
            return (
              <RegionContainer
                key={region.index}
                name={region.name}
                img={region.img}
                index={region.index}
              />
            );
          })}
        </section>
      </div>
    </>
  );
};

export default SearchRegion;
