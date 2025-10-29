import React, { useId, useContext, useEffect } from 'react';
import {
  SearchLabelContext,
  SearchItemContext,
  UpdateSearchItemContext,
} from '@/contexts/SearchContext';
import searchIcon from '@assets/icons/pokeballSolid.png';
import style from '@components/SearchBar/SearchBar.module.css';

type Props = {
  searchFunction?: (searchItem: string) => void;
  showButton?: boolean;
};

const SearchBar: React.FC<Props> = ({
  searchFunction,
  showButton = true,
}): JSX.Element => {
  const id = useId();

  const toSearch = useContext(SearchLabelContext);
  const searchItem = useContext(SearchItemContext);
  const setSearchitem = useContext(UpdateSearchItemContext);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchitem(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchFunction?.(searchItem.split(' ').join('-').toLowerCase());
  };

  useEffect(() => {
    setSearchitem('');
  }, []);

  return (
    <form className={`${style.form}`} onSubmit={handleSearch}>
      <input
        id={id}
        type="search"
        onChange={(e) => handleSearchInput(e)}
        placeholder=" "
        value={searchItem}
        className={`${style.input}`}
      />
      <label htmlFor={id} className={`${style.label}`}>
        {`Search ${toSearch}`}
      </label>
      {showButton && (
        <button type="submit" className={`${style.button}`} title={`Search`}>
          <img
            src={searchIcon}
            alt="search icon"
            className={`${style.img}`}
          />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
