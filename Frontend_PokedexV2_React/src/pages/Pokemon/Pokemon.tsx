import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header/Header';
import PokemonMainDetails from '@components/PokemonMainDetails/PokemonMainDetails';
import PokemonSummary from '@components/PokemonSummary/PokemonSummary';
import LoadingView from '@components/LoadingView/LoadingView';
import { capitalizeText } from '@utils/formatText';
import { Pokemon as PokemonType } from '@models/pokemon';
import { fetchPokemon } from '@services/PokemonServices/pokemonFullInfoService';
import notFoundFavicon from '@assets/icons/Not_Found_Favicon.png';
import style from '@pages/Pokemon/Pokemon.module.css';

//type CompletePokemonType = Omit<PokemonType, 'pokemonId'>;

const Pokemon = () => {
  const { pokemonId, pokemonName } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState<PokemonType>({
    pokemonId: 0,
    pokedexNumber: 0,
    name: 'POKEMON_NAME',
    height: 0,
    weight: 0,
    baseXP: 0,
    souond: 'POKEMON_SOUND',
    types: ['POKEMON_TYPES'],
    abilities: [
      {
        name: 'POKEMON_ABILITY_NAME',
        effect: 'ABILITY_EFFECT',
        shortEffect: 'ABILITY_SHORT_EFFECT',
        isHidden: false,
      },
    ],
    moves: [
      {
        name: 'POKEMON_MOVE_NAME',
        description: 'MOVE_DESCRIPTION',
        effect: 'MOVE_EFFECT',
        type: 'MOVE_TYPE',
        damage: 0,
        accuracy: 0,
        pp: 0,
        otherPokemons: 0,
      },
    ],
    weaknessResistance: [
      {
        effectiveness: 'TYPE_EFFECTIVENESS',
        damageMultiplier: 'DAMAGE_MULTIPLIER',
        types: ['TYPE_WEAKNESS'],
      },
    ],
    nextPokemon: null,
    prevPokemon: null,
    stats: [
      {
        statName: 'STAT_NAME',
        baseStat: 0,
      },
    ],
    sprites: {
      icon: null,
      normal: null,
      shiny: null,
    },
    cards: [
      {
        img: 'POKEMON_CARD_IMG_URL',
      },
    ],
    nameMeaning: 'POKEMON_NAME_MEANING',
    generation: 'POKEMON_GENERATION',
    evolvesFrom: null,
    evolutionChain: {
      firstPhase: [
        {
          name: 'EVOLUTION_PHASE_NAME',
          sprites: {
            icon: null,
            normal: null,
            shiny: null,
          },
          types: ['EVOLUTION_PHASE_TYPE'],
        },
      ],
      secondPhase: [
        {
          name: 'EVOLUTION_PHASE_NAME',
          sprites: {
            icon: null,
            normal: null,
            shiny: null,
          },
          types: ['EVOLUTION_PHASE_TYPE'],
        },
      ],
      thirdPhase: [
        {
          name: 'EVOLUTION_PHASE_NAME',
          sprites: {
            icon: null,
            normal: null,
            shiny: null,
          },
          types: ['EVOLUTION_PHASE_TYPE'],
        },
      ],
    },
    otherForms: [
      {
        name: 'EVOLUTION_PHASE_NAME',
        sprites: {
          icon: null,
          normal: null,
          shiny: null,
        },
        types: ['EVOLUTION_PHASE_TYPE'],
      },
    ],
    genderRate: {
      male: 0,
      female: 0,
    },
    pokedexEntries: [
      {
        description: 'POKEMON_POKEDEX_DESCRIPTION',
        version: 'POKEDEX_VERSION',
      },
    ],
  });
  const [showShiny, setShowShiny] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        setIsLoading(true);
        const pokemon = await fetchPokemon(
          Number.parseInt(pokemonId!),
          pokemonName!,
        );

        console.log(pokemon);

        setPokemonInfo(pokemon);
        setIsLoading(false);
      } catch (error) {
        alert(`An error occurred while fetching Info.\n\n${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonInfo();
  }, [pokemonId, pokemonName]);

  const pokemonFormatedName = capitalizeText(pokemonName!);

  const faviconSprite = showShiny
    ? pokemonInfo.sprites.shiny
    : pokemonInfo.sprites.normal;

  return isLoading ? (
    <>
      <Helmet>
        <title>Loading... | Pokédex</title>
        <link rel="shortcut icon" href={notFoundFavicon} type="image/x-icon" />
      </Helmet>
      <LoadingView message={`Loading all info for ${pokemonFormatedName}`} />
    </>
  ) : (
    <>
      <Helmet>
        <title>{pokemonFormatedName} | Pokédex</title>
        <link
          rel="shortcut icon"
          href={faviconSprite ?? notFoundFavicon}
          type="image/x-icon"
        />
      </Helmet>
      <Header mode={'complete'} showSearchBar={false} />
      <article className={`${style.mainSection}`}>
        <PokemonSummary
          pokemonId={pokemonInfo!.pokemonId}
          name={pokemonInfo!.name}
          sprites={pokemonInfo!.sprites}
          types={pokemonInfo!.types}
          nameMeaning={pokemonInfo!.nameMeaning}
          pokedexNumber={pokemonInfo!.pokedexNumber}
          height={pokemonInfo!.height}
          weight={pokemonInfo!.weight}
          generation={pokemonInfo!.generation}
          baseXP={pokemonInfo!.baseXP}
          genderRate={pokemonInfo!.genderRate}
          souond={pokemonInfo!.souond}
          isShiny={showShiny}
          setIsShiny={setShowShiny}
        />
        <PokemonMainDetails
          name={pokemonInfo!.name}
          prevPokemon={pokemonInfo!.prevPokemon}
          nextPokemon={pokemonInfo!.nextPokemon}
          pokedexEntries={pokemonInfo!.pokedexEntries}
          stats={pokemonInfo!.stats}
          evolutionChain={pokemonInfo!.evolutionChain}
          otherForms={pokemonInfo!.otherForms}
          weaknessResistance={pokemonInfo!.weaknessResistance}
          abilities={pokemonInfo!.abilities}
          moves={pokemonInfo!.moves}
          cards={pokemonInfo!.cards}
          isShiny={showShiny}
        />
      </article>
    </>
  );
};

export default Pokemon;
