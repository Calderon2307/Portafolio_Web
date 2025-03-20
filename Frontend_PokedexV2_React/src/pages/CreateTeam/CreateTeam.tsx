import { useEffect, useRef, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import useWindowSize from '@/hooks/useWindowSize';
import Header from '@components/Header/Header';
import SearchBar from '@components/SearchBar/SearchBar';
import SelectPokemonBtn from '@components/SelectPokemonBtn/SelectPokemonBtn';
import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView';
import LoadingView from '@components/LoadingView/LoadingView';
import { capitalizeText } from '@utils/formatText';
import { SearchItemContext } from '@context/SearchContext';
import { PokemonCard, ShortViewPokemon } from '@models/pokemon';
import { fetchCompletePokemon } from '@services/PokemonServices/pokemonCompletePokedexService';
import { POKEMON_ALL_POKEMON_URL } from '@routes/api.routes';
import closeIconDark from '@assets/icons/closeDark.png';
import closeIconLight from '@assets/icons/closeLight.png';
import faviconIcon from '@assets/icons/Favicon_Alt.png';
import style from '@pages/CreateTeam/CreateTeam.module.css';

const CreateTeam = () => {
  const { width } = useWindowSize();
  const pokemonSearchName = useContext(SearchItemContext);
  const [teamArr, setTeamArr] = useState<(ShortViewPokemon | null)[]>(() => {
    const storedTeam = localStorage.getItem('PokemonTeam');
    return storedTeam ? JSON.parse(storedTeam) : new Array(6).fill(null);
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showShiny, setShowShiny] = useState<boolean>(false);
  const [loadingMorePokemon, setLoadingMorePokemon] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState(-1);
  const [pokemonList, setPokemonList] = useState<ShortViewPokemon[]>([
    {
      name: 'POKEMON_NAME',
      sprites: {
        icon: 'ICON_SPRITE',
        normal: 'NORMAL_SPRITE',
        shiny: 'SHINY_SPRITE',
      },
      types: ['POKEMON_TYPE_1', 'POKEMON_TYPE_2'],
    },
  ]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pokemonListRef = useRef<HTMLDivElement | null>(null);
  const cacheRef = useRef<{ data: ShortViewPokemon[]; lastUrl: string | null }>(
    {
      data: [
        {
          name: 'POKEMON_NAME',
          sprites: {
            icon: 'ICON_SPRITE',
            normal: 'NORMAL_SPRITE',
            shiny: 'SHINY_SPRITE',
          },
          types: ['POKEMON_TYPE_1', 'POKEMON_TYPE_2'],
        },
      ],
      lastUrl: null,
    },
  );
  let pokemonViewSize: 'normal' | 'medium' | 'small' = 'normal';

  if (width > 615 && width <= 1024) {
    pokemonViewSize = 'medium';
  } else if (width <= 615) {
    pokemonViewSize = 'small';
  } else {
    pokemonViewSize = 'normal';
  }

  const fetchMorePokemon = async () => {
    if (
      cacheRef.current.lastUrl === null ||
      cacheRef.current.lastUrl === 'THERE_ARE_NO_MORE_POKEMON'
    )
      return;

    setLoadingMorePokemon(true);

    try {
      const data = await fetchCompletePokemon(cacheRef.current.lastUrl);
      const pokeArr: ShortViewPokemon[] = data.pokemonCards.map(
        (pokemon: PokemonCard) => {
          return {
            name: pokemon.name,
            sprites: {
              normal: pokemon.sprites.normal,
              shiny: pokemon.sprites.shiny,
              icon: pokemon.sprites.icon,
            },
            types: pokemon.types,
          };
        },
      );

      cacheRef.current.lastUrl = data.nextUrl ?? 'THERE_ARE_NO_MORE_POKEMON';
      cacheRef.current.data = [...cacheRef.current.data, ...pokeArr];
      setPokemonList([...cacheRef.current.data]);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingMorePokemon(false);
    }
  };

  const handleDialogOpen = (index: number) => {
    setIsOpen(true);
    setIdSelected(index);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleScroll = () => {
    if (!pokemonListRef.current || loadingMorePokemon) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = pokemonListRef.current;
    if (scrollHeight - (scrollTop + clientHeight) <= 200) {
      fetchMorePokemon();
    }
  };

  const handleSelectPokemon = (pokemonSelected: ShortViewPokemon) => {
    const newTeamArr: (ShortViewPokemon | null)[] = teamArr.map(
      (item: ShortViewPokemon | null, index: number) => {
        if (idSelected === index) return pokemonSelected;
        else return item;
      },
    );

    setTeamArr(newTeamArr);
    setIsOpen(false);
  };

  const handleDeletePokemon = (indexSelected: number) => {
    const newTeamArr: (ShortViewPokemon | null)[] = teamArr.map(
      (item: ShortViewPokemon | null, index: number) => {
        if (indexSelected === index) return null;
        else return item;
      },
    );

    setTeamArr(newTeamArr);
  };

  const handleSaveTeam = () => {
    localStorage.setItem('PokemonTeam', JSON.stringify(teamArr));

    alert(
      `Your team:\n${teamArr.map((pokemon: ShortViewPokemon | null, index) => `${index + 1}-) ${capitalizeText(pokemon!.name)}`).join('\n')}\nWas successfully saved!`,
    );
  };

  const teamComplete = teamArr.includes(null);

  const filteredSearch = pokemonList.filter((pokemon: ShortViewPokemon) =>
    pokemon.name.includes(pokemonSearchName.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current?.showModal();
    } else {
      setTimeout(() => {
        dialogRef.current?.close();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCompletePokemon(POKEMON_ALL_POKEMON_URL);
        const pokeArr: ShortViewPokemon[] = data.pokemonCards.map(
          (pokemon: PokemonCard) => {
            return {
              name: pokemon.name,
              sprites: {
                normal: pokemon.sprites.normal,
                shiny: pokemon.sprites.shiny,
                icon: pokemon.sprites.icon,
              },
              types: pokemon.types,
            };
          },
        );

        cacheRef.current.data = pokeArr;
        cacheRef.current.lastUrl = data.nextUrl;
        setPokemonList(cacheRef.current.data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && cacheRef.current.lastUrl === null) fetchAllPokemon();
  }, [isOpen]);

  return (
    <>
      <Helmet>
        <title>Create Pokémon Team | POKÉDEX</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <dialog
        ref={dialogRef}
        className={`${style.dialog} ${isOpen ? style.openDialog : style.closeDialog}`}
        onClose={handleDialogClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) handleDialogClose();
        }}
      >
        {isLoading ? (
          <LoadingView message={`Loading Pokemons`} />
        ) : (
          <article className={`${style.dialogContent}`}>
            <button
              className={`${style.closeButton}`}
              onClick={handleDialogClose}
            >
              <img
                src={closeIconDark}
                alt="Close Icon"
                className={`${style.closeIcon}`}
              />
            </button>
            <h3 className={`${style.dialogTitle}`}>Select a Pokémon</h3>
            <section className={`${style.mainContent}`}>
              <section className={`${style.searchBarContent}`}>
                <SearchBar showButton={false} />
              </section>
              <section
                ref={pokemonListRef}
                className={`${style.pokemonList}`}
                onScroll={handleScroll}
              >
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((pokemon: ShortViewPokemon) => {
                    const formatedName = capitalizeText(pokemon.name);
                    return (
                      <button
                        key={pokemon.name}
                        className={`${style.pokemonButton}`}
                        onClick={() => handleSelectPokemon(pokemon)}
                        title={`Choose ${formatedName} for your team?`}
                      >
                        <PokemonSummaryView
                          name={pokemon.name}
                          sprites={pokemon.sprites}
                          types={pokemon.types}
                          isShiny={false}
                          size="small"
                        />
                      </button>
                    );
                  })
                ) : (
                  <p className={`${style.emptyPokemonMessage}`}>
                    <span className={`${style.emptyPokemonTitle}`}>
                      NO RESULTS!
                    </span>
                    Try loading up more Pokémon or look for one with its full
                    name!
                  </p>
                )}
              </section>
              {loadingMorePokemon ? (
                <p className={`${style.loadingMessage}`}>
                  Loading more Pokémon...
                </p>
              ) : (
                ''
              )}
            </section>
          </article>
        )}
      </dialog>
      <Header mode={'complete'} showSearchBar={false} />
      <article className={`${style.contentSection}`}>
        <h2 className={`${style.title}`}>Build your Team</h2>
        <button
          onClick={() => setShowShiny(!showShiny)}
          disabled={teamComplete}
          className={`${style.shinyButton} ${showShiny ? style.shinyActive : ''}`}
          title={`Show ${showShiny ? 'normal version' : 'shiny version'}`}
        >
          {showShiny ? 'Normal version' : 'Shiny version'}
        </button>
        <section className={`${style.teamWrapper}`}>
          {teamArr.map((item: ShortViewPokemon | null, index: number) => {
            if (item === null) {
              return (
                <SelectPokemonBtn
                  key={index}
                  onClick={() => handleDialogOpen(index)}
                />
              );
            } else {
              const formatedName = capitalizeText(item.name);

              return (
                <article
                  key={index}
                  className={`${style.selectedPokemonWrapper}`}
                >
                  <button
                    className={`${style.closeBtn}`}
                    onClick={() => handleDeletePokemon(index)}
                    title={`Delete ${formatedName} from your team?`}
                  >
                    <img
                      src={closeIconLight}
                      alt="Close Icon"
                      className={`${style.iconClose}`}
                    />
                  </button>
                  <PokemonSummaryView
                    name={item.name}
                    sprites={item.sprites}
                    types={item.types}
                    isShiny={showShiny}
                    size={pokemonViewSize}
                  />
                </article>
              );
            }
          })}
        </section>
        <section className={`${style.saveBtnSection}`}>
          <button
            onClick={handleSaveTeam}
            disabled={teamComplete}
            className={`${style.saveBtn}`}
            title={`Are you sure to save this team?`}
          >
            Save Team
          </button>
        </section>
      </article>
    </>
  );
};

export default CreateTeam;
