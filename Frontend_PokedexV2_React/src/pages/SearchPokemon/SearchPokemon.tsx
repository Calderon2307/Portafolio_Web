import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header/Header';
import useWindowSize from '@/hooks/useWindowSize';
import PokemonInfoCard from '@components/PokemonInfoCard/PokemonInfoCard';
import {
  UpdateSearchItemContext,
  UpdateSearchLabelContext,
} from '@context/SearchContext';
import { PokemonCard } from '@models/pokemon';
//import { pokemonCards } from '@data/pokemon.test';
import { fetchPokemonCard } from '@/services/PokemonServices/pokemonCardService';
import faviconIcon from '@assets/icons/Favicon.png';
import style from '@pages/SearchPokemon/SearchPokemon.module.css';

const SearchPokemon = () => {
  const { width } = useWindowSize();
  const updateLable = useContext(UpdateSearchLabelContext);
  const [pokemonSearchArr, setPokemonSearchArr] = useState<PokemonCard[]>(
    () => {
      const storagePokemonArr = localStorage.getItem('PokemoSearchArray');
      return storagePokemonArr ? JSON.parse(storagePokemonArr) : [];
    },
  );

  //const pokemonToSearch = useContext(SearchItemContext);
  const setSearchitem = useContext(UpdateSearchItemContext);

  let cardSize: 'normal' | 'medium' | 'small' = 'normal';

  if (width > 768 && width <= 1024) {
    cardSize = 'medium';
  } else if (width <= 768) {
    cardSize = 'small';
  } else {
    cardSize = 'normal';
  }

  updateLable('Pokemon');

  const handleSearchPokemon = async (pokemon: string) => {
    const existPokemon = pokemonSearchArr.find(
      (pokemonItem: PokemonCard) =>
        pokemonItem.name === pokemon ||
        pokemonItem.pokedexNumber.toString() === pokemon,
    );

    if (existPokemon !== undefined) {
      const newArr = pokemonSearchArr.filter(
        (item: PokemonCard) => item.pokemonId !== existPokemon.pokemonId,
      );
      newArr.unshift(existPokemon);

      alert(`The Pokemon already exists, you can find it on the first position!!`);

      setPokemonSearchArr(newArr);
      setSearchitem('');

      return;
    }

    try {
      const newPokemon = await fetchPokemonCard(pokemon);

      setPokemonSearchArr((prevPokemonArr) => [newPokemon, ...prevPokemonArr]);
    } catch (error) {
      alert(`Error: ${error}`);
    }

    setSearchitem('');
  };

  useEffect(() => {
    localStorage.setItem('PokemoSearchArray', JSON.stringify(pokemonSearchArr));
  }, [pokemonSearchArr]);

  return (
    <>
      <Helmet>
        <title>Search Pokémon | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>

      <Header mode={'complete'} searchFunction={handleSearchPokemon} />
      <div className={`${style.wrapperBody}`}>
        <h2 className={`${style.title}`}>Pokemon Searched:</h2>
        <section className={`${style.cardsSection}`}>
          {pokemonSearchArr.length === 0 ? (
            <section className={`${style.messageContainer}`}>
              <p className={`${style.message}`}>
                There are no Pokemons to show.
              </p>
              <p className={`${style.message}`}>Find one!</p>
            </section>
          ) : (
            pokemonSearchArr.map((pokemonCard: PokemonCard) => {
              return (
                <PokemonInfoCard
                  key={pokemonCard.pokemonId}
                  pokedexNumber={pokemonCard.pokedexNumber}
                  name={pokemonCard.name}
                  nameMeaning={pokemonCard.nameMeaning}
                  height={pokemonCard.height}
                  weight={pokemonCard.weight}
                  types={pokemonCard.types}
                  sprites={pokemonCard.sprites}
                  evolvesFrom={pokemonCard.evolvesFrom}
                  size={cardSize}
                />
              );
            })
          )}
        </section>
      </div>
    </>
  );
};

export default SearchPokemon;
