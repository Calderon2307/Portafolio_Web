import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@components/Header/Header';
import PokemonInfoCard from '@components/PokemonInfoCard/PokemonInfoCard';
import LoadingView from '@components/LoadingView/LoadingView';
import { capitalizeText } from '@utils/formatText';
import {
  SearchItemContext,
  UpdateSearchLabelContext,
} from '@context/SearchContext';
import { PokemonCard } from '@models/pokemon';
import { PokedexElementApiModel } from '@models/pokeApi';
import { Regions } from '@data/regions';
import { fetchPokemonType } from '@/services/PokemonServices/pokemonTypeService';
import {
  fetchPokedexesRegion,
  fetchPokedexSelected,
  fetchPokemonGeneration,
} from '@/services/PokemonServices/pokemonRegionService';
import {
  fetchCompletePokemon,
  fetchCompletePokedexWithUrl,
} from '@/services/PokemonServices/pokemonCompletePokedexService';
import useWindowSize from '@hooks/useWindowSize';
import { POKEMON_ALL_POKEMON_URL } from '@routes/api.routes';
import prevIcon from '@assets/icons/prevLight.png';
import nextIcon from '@assets/icons/nextLight.png';
import faviconIcon from '@assets/icons/Favicon.png';
import style from '@pages/CompletePokedex/CompletePokedex.module.css';
//import { pokemonCards } from '@data/pokemon.test';

const CompletePokedex = () => {
  const { width } = useWindowSize();
  const updateLable = useContext(UpdateSearchLabelContext);
  const pokemonToSearch = useContext(SearchItemContext);
  const { context, value } = useParams();
  const regionDexRef = useRef<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonCardsArr, setPokemonCardsArr] = useState<PokemonCard[]>([]);
  const [allPokemonNextUrl, setAllPokemonNextUrl] = useState<string | null>(
    null,
  );
  const [allPokemonPrevUrl, setAllPokemonPrevUrl] = useState<string | null>(
    null,
  );
  const [pokedexes, setPokedexes] = useState<PokedexElementApiModel[]>([]);
  const [currentPokedexRegion, setCurrentPokedexRegion] = useState('');
  const [seeGeneration, setSeeGeneration] = useState(false);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  let pagetitle: string = '';
  let cardSize: 'normal' | 'medium' | 'small' = 'normal';
  const capitalizeValue = capitalizeText(value!);

  if (width > 768 && width <= 1024) {
    cardSize = 'medium';
  } else if (width <= 768) {
    cardSize = 'small';
  } else {
    cardSize = 'normal';
  }

  if (context === 'type') {
    pagetitle = `${capitalizeValue} Type Pokémon`;
  } else if (context === 'region') {
    pagetitle = `${capitalizeValue} Pokémon`;
  } else {
    pagetitle = `All Pokémon`;
  }

  updateLable('Pokemon');

  const actualRegion = Regions.find((region) => region.name === value);
  let loadingMessage: string = '... Loading resources...';
  //const totalPages = Math.ceil(pokemonCount / 50);
  //const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const noPokemonMessage = {
    title: 'NO POKEMON FOUND!',
    message: '',
  };

  if (context === 'type') {
    noPokemonMessage.message = `The searched pokemon does not belong to ${value} type or does not exist`;
  } else if (context === 'region') {
    noPokemonMessage.message = `The searched pokemon does not belong to the ${value} region or does not exist`;
  } else {
    noPokemonMessage.message = `Try to load more Pokemon!`;
  }

  const filteredPokemon = pokemonCardsArr.filter((pokemon: PokemonCard) =>
    pokemon.name.includes(pokemonToSearch.split(' ').join('-').toLowerCase()),
  );

  let indexRegion = '';

  switch (actualRegion?.name) {
    case 'kanto':
      indexRegion = 'I';
      break;
    case 'johto':
      indexRegion = 'II';
      break;
    case 'hoenn':
      indexRegion = 'III';
      break;
    case 'sinnoh':
      indexRegion = 'IV';
      break;
    case 'unova':
      indexRegion = 'V';
      break;
    case 'kalos':
      indexRegion = 'VI';
      break;
    case 'alola':
      indexRegion = 'VII';
      break;
    case 'galar':
      indexRegion = 'VIII';
      break;
    case 'paldea':
      indexRegion = 'IX';
      break;
    default:
      break;
  }

  if (context === 'type') {
    loadingMessage = `Loading all ${value} type Pokémon`;
  } else if (context === 'region') {
    if (seeGeneration) {
      loadingMessage = `Loading all Pokémon from generation ${indexRegion}`;
    } else {
      if (currentPokedexRegion !== '') {
        loadingMessage = `Loading all Pokémon from ${capitalizeText(regionDexRef.current)} pokedex`;
      } else {
        loadingMessage = `Loading all Pokémon from ${value!} region`;
      }
    }
  } else {
    loadingMessage = `Loading all Pokémon`;
  }

  const renderTitle = () => {
    if (context === 'type') {
      return (
        <>
          Pokemon Type:{' '}
          <span className={`${value} ${style.type}`}>{value}</span>
        </>
      );
    } else if (context === 'region') {
      return (
        <>
          {seeGeneration ? 'Generation' : 'Region'}: {value?.toUpperCase()}
        </>
      );
    } else {
      return <>All Pokemon</>;
    }
  };

  const generatePagination = () => {
    let visiblePages = [];
    const totalPages = Math.ceil(pokemonCount / 50);

    if (totalPages <= 8) {
      visiblePages = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    } else {
      if (currentPage <= 4) {
        visiblePages = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (currentPage >= totalPages - 3) {
        visiblePages = [
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        visiblePages = [
          1,
          '...',
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          '...',
          totalPages,
        ];
      }
    }
    return visiblePages;
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        if (context === 'type' && value) {
          const pokemonsByType = await fetchPokemonType(value);
          setPokemonCardsArr(pokemonsByType);
        } else if (context === 'region' && value) {
          const pokedexByRegion = await fetchPokedexesRegion(value);
          setPokedexes(pokedexByRegion);
          setCurrentPokedexRegion(pokedexByRegion[0]!.name);
          regionDexRef.current = pokedexByRegion[0]!.name;

          const pokemonsByRegion = await fetchPokedexSelected(
            pokedexByRegion[0]!.url,
            value!,
          );
          setPokemonCardsArr(pokemonsByRegion);
        } else {
          //if (allPokemonNextUrl !== null) url = allPokemonNextUrl;
          const pokemonByPokedex = await fetchCompletePokemon(
            POKEMON_ALL_POKEMON_URL,
          );
          setPokemonCount(pokemonByPokedex.count);
          setAllPokemonNextUrl(pokemonByPokedex.nextUrl);
          setAllPokemonPrevUrl(pokemonByPokedex.prevUrl);
          setPokemonCardsArr(pokemonByPokedex.pokemonCards);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error(`Error fetching Pokemon data.\n\n${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, [context, value]);

  useEffect(() => {
    const region = Regions.find((region) => region.name === value);
    const fetchRegionGenerationPokes = async () => {
      try {
        setIsLoading(true);
        if (seeGeneration) {
          const pokemonsByGeneration = await fetchPokemonGeneration(
            region?.pokedexEnd,
            region?.pokedexStart,
          );
          setPokemonCardsArr(pokemonsByGeneration);
        } else {
          const pokedexByRegion = await fetchPokedexesRegion(value!);
          setPokedexes(pokedexByRegion);
          setCurrentPokedexRegion(pokedexByRegion[0]!.name);

          const pokemonsByRegion = await fetchPokedexSelected(
            pokedexByRegion[0]!.url,
            value!,
          );
          setPokemonCardsArr(pokemonsByRegion);
        }
      } catch (error) {
        console.error(`Error fetching Pokemon data.\n\n${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegionGenerationPokes();
  }, [seeGeneration]);

  const handleGeneration = () => {
    setSeeGeneration(!seeGeneration);
  };

  const handlePagePokemon = async (url: string, action: string) => {
    try {
      setIsLoading(true);
      const pokemonByPokedex = await fetchCompletePokemon(url);
      setAllPokemonNextUrl(pokemonByPokedex.nextUrl);
      setAllPokemonPrevUrl(pokemonByPokedex.prevUrl);
      setPokemonCardsArr(pokemonByPokedex.pokemonCards);

      if (action === 'increase') setCurrentPage((prev) => prev + 1);
      else setCurrentPage((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      alert(`Error fetching Pokemon data.\n\n${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePokedexRegion = async (pokedexName: string, url: string) => {
    regionDexRef.current = pokedexName;
    try {
      setIsLoading(true);
      const pokemonByPokedexRegion = await fetchPokedexSelected(url, value!);
      setCurrentPokedexRegion(pokedexName);
      setPokemonCardsArr(pokemonByPokedexRegion);
    } catch (error) {
      alert(`Error fetching Pokemon data.\n\n${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const newOffset = (pageNumber - 1) * 50;
      const pokemonsByPagination = await fetchCompletePokedexWithUrl(
        50,
        newOffset,
      );
      setPokemonCardsArr(pokemonsByPagination.pokemonCards);
      setAllPokemonNextUrl(pokemonsByPagination.nextUrl);
      setAllPokemonPrevUrl(pokemonsByPagination.prevUrl);
      setCurrentPage(pageNumber);
    } catch (error) {
      alert(`Error fetching Pokemon data.\n\n${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <>
      <Helmet>
        <title>{pagetitle} | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <LoadingView message={loadingMessage} />
    </>
  ) : (
    <>
      <Helmet>
        <title>{pagetitle} | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <Header mode={'complete'} showButton={false} />
      <div className={`${style.wrapper}`}>
        <h2 className={`${style.title}`}>
          {renderTitle()}
          {`${context !== 'type' && context !== 'region' ? '' : ' - ' + pokemonCardsArr.length}`}{' '}
          Pokémon
        </h2>
        {context === 'region' && value !== 'hisui' && (
          <section className={`${style.generationToggleContanier}`}>
            <p
              className={`${style.subtitleGen} ${seeGeneration ? '' : style.subtitleSelected}`}
            >
              Regiondex
            </p>
            <button
              onClick={handleGeneration}
              className={`${style.toggleGenButton}`}
              title={
                seeGeneration
                  ? `See ${capitalizeText(value!)} pokedex`
                  : `See generation ${indexRegion} pokedex`
              }
            >
              <div
                className={`${style.toggleGen} ${seeGeneration ? style.genActive : style.genDisabled}`}
              ></div>
            </button>
            <p
              className={`${style.subtitleGen} ${seeGeneration ? style.subtitleSelected : ''}`}
            >
              Generationdex
            </p>
          </section>
        )}
        {context === 'region' && pokedexes.length > 1 && !seeGeneration && (
          <section className={`${style.pokedexesButtonsConainer}`}>
            <div className={`${style.buttonsWrapper}`}>
              {pokedexes.map((pokedex) => {
                const formatedPokedexName = capitalizeText(pokedex.name);
                return (
                  <button
                    key={pokedex.name}
                    onClick={() =>
                      handlePokedexRegion(pokedex.name, pokedex.url)
                    }
                    className={`${style.selectPokedexButton} ${currentPokedexRegion === pokedex.name ? style.pokedexButtonSelected : ''}`}
                    title={`Select ${formatedPokedexName} pokedex`}
                  >
                    {formatedPokedexName}
                  </button>
                );
              })}
            </div>
            <h3 className={`${style.subtitlePokedex}`}>
              Pokedex selected:{' '}
              <span className={`${style.pokedexSelectedName}`}>
                {currentPokedexRegion.split('-').join(' ')}
              </span>
            </h3>
          </section>
        )}
        <section className={`${style.cardsSection}`}>
          {filteredPokemon.length > 0
            ? filteredPokemon.map((pokemonCard: PokemonCard) => {
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
            : pokemonToSearch && (
                <p className={`${style.emptyPokemonMessage}`}>
                  <span className={`${style.emptyPokemonTitle}`}>
                    {noPokemonMessage.title}
                  </span>
                  {noPokemonMessage.message}
                </p>
              )}
        </section>
        {context !== 'type' && context !== 'region' && (
          <section className={`${style.buttonsContainer}`}>
            {allPokemonPrevUrl !== null && (
              <button
                key={'buttonPaginationPokedex-1'}
                onClick={() =>
                  handlePagePokemon(allPokemonPrevUrl!, 'decrease')
                }
                disabled={allPokemonPrevUrl === null}
                className={`${style.button}`}
                title="See Previous Pokemon"
              >
                <img
                  src={prevIcon}
                  alt="Previous Icon"
                  className={`${style.paginationIcon}`}
                />
              </button>
            )}
            <section className={`${style.pagesContainer}`}>
              {generatePagination().map((pageNumber, index) => {
                if (pageNumber === '...') {
                  return (
                    <span key={index} className={`${style.pageDots}`}>
                      {pageNumber}
                    </span>
                  );
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePagination(Number(pageNumber))}
                    className={`${style.pageButton} ${pageNumber === currentPage ? style.pageButtonSelected : ''}`}
                    title={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </section>
            {allPokemonNextUrl !== null && (
              <button
                key={'buttonPaginationPokedex-2'}
                onClick={() =>
                  handlePagePokemon(allPokemonNextUrl!, 'increase')
                }
                disabled={allPokemonNextUrl === null}
                className={`${style.button}`}
                title="See Next Pokemon"
              >
                <img
                  src={nextIcon}
                  alt="Previous Icon"
                  className={`${style.paginationIcon}`}
                />
              </button>
            )}
          </section>
        )}
      </div>
    </>
  );
};

export default CompletePokedex;
