import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@components/Header/Header';
import TypeButton from '@components/TypeButton/TypeButton';
import {
  SearchItemContext,
  UpdateSearchLabelContext,
} from '@context/SearchContext';
import { Types } from '@data/types';
import { TypeData } from '@models/types';
import faviconIcon from '@assets/icons/Favicon.png';
import style from '@pages/SearchType/SearchType.module.css';
//import Footer from '@components/Footer/Footer';

const SearchType = () => {
  const updateLable = useContext(UpdateSearchLabelContext);
  const typeToSearch = useContext(SearchItemContext);

  updateLable('Type');

  const filteredTypes = Types.filter((type: TypeData) =>
    type.name.startsWith(typeToSearch.toLowerCase()),
  );

  return (
    <>
      <Helmet>
        <title>Search Type | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <Header mode={'complete'} showButton={false} />
      <div className={`${style.typesWrapper}`}>
        <h2 className={`${style.title}`}>Select a Type:</h2>
        <section className={`${style.typesContainer}`}>
          {filteredTypes.length > 0 ? (
            filteredTypes.map((type: TypeData) => {
              return (
                <TypeButton
                  key={type.index}
                  name={type.name}
                  logo={type.logo}
                />
              );
            })
          ) : (
            <p className={`${style.noTypesMessage}`}>NO TYPES FOUND</p>
          )}
        </section>
      </div>
      {/* AGREGAR FOOTER? */}
    </>
  );
};

export default SearchType;
