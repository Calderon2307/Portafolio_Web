import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '@hooks/useWindowSize';
import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView';
import DamageRelationView from '@components/DamageRelationView/DamageRelationView';
import PokemonMoveCard from '@components/PokemonMoveCard/PokemonMoveCard';
import { capitalizeText } from '@utils/formatText';
import { Pokemon } from '@models/pokemon';
import style from '@components/PokemonMainDetails/PokemonMainDetails.module.css';
import pokedexIcon from '@assets/icons/pokedexSolid.png';
import statsIcon from '@assets/icons/stats.png';
import chainIcon from '@assets/icons/chain.png';
import nextIcon from '@assets/icons/next.png';
import nextAltIcon from '@assets/icons/nextAlt.png';
import changeIcon from '@assets/icons/formsSolid.png';
import combatIcon from '@assets/icons/combat.png';
import abilityIcon from '@assets/icons/abilities.png';
import pokeballIcon from '@assets/icons/pokeballSolid.png';
//import maleIcon from '@assets/icons/male.png';
//import femaleIcon from '@assets/icons/female.png';
//import selectorIcon from '@assets/icons/pokeSelector2.png';
import hideIcon from '@assets/icons/hiddenSolid.png';
import movesIcon from '@assets/icons/battleAlt.png';
import cardsIcon from '@assets/icons/tcgSolid.png';
import notFoundSpriteIcon from '@assets/icons/Not_Found_Sprite_Alt.gif';

type PokemonMainDetailsType = Pick<
  Pokemon,
  | 'name'
  | 'prevPokemon'
  | 'nextPokemon'
  | 'pokedexEntries'
  | 'stats'
  | 'evolutionChain'
  | 'otherForms'
  | 'weaknessResistance'
  | 'abilities'
  | 'moves'
  | 'cards'
>;

type ShowShinyType = { isShiny: boolean };

const INITIAL_MOVES_COUNT: number = 12;

const PokemonMainDetails: React.FC<PokemonMainDetailsType & ShowShinyType> = ({
  name,
  prevPokemon,
  nextPokemon,
  pokedexEntries,
  stats,
  evolutionChain,
  otherForms,
  weaknessResistance,
  abilities,
  moves,
  cards,
  isShiny,
}) => {
  const { width } = useWindowSize();
  const [versionSelected, setVersionSelected] = useState<string>('');
  const [visibleMoves, setVisibleMoves] = useState<number>(INITIAL_MOVES_COUNT);
  const carrousellRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  let pokemonSummaryViewSize: 'normal' | 'medium' | 'small' = 'normal';

  if (width > 590 && width <= 890) {
    pokemonSummaryViewSize = 'medium';
  } else if (width <= 590) {
    pokemonSummaryViewSize = 'small';
  } else {
    pokemonSummaryViewSize = 'normal';
  }

  const handleShowMoreMoves = () => {
    if (visibleMoves >= moves.length) {
      setVisibleMoves(INITIAL_MOVES_COUNT);
    } else {
      setVisibleMoves((prev: number) =>
        Math.min(prev + INITIAL_MOVES_COUNT, moves.length),
      );
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const carousel = carrousellRef.current;
    if (!carousel) return;

    e.preventDefault();

    carousel.scrollLeft += e.deltaY;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const carousel = carrousellRef.current;

    if (!carousel) return;

    setIsDragging(true);
    setStartX(e.pageX - carousel.offsetLeft);
    setScrollLeft(carousel.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const carousel = carrousellRef.current;
    if (!carousel) return;

    const x = e.pageX - carousel.offsetLeft;
    const desp = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - desp;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  let prevFormatedName: string = '';
  let nextFormatedName: string = '';
  const formatName = capitalizeText(name);
  if (prevPokemon) prevFormatedName = capitalizeText(prevPokemon.name);
  if (nextPokemon) nextFormatedName = capitalizeText(nextPokemon.name);

  return (
    <>
      <article className={`${style.detailsSection}`}>
        <section className={`${style.changePokemonSection}`}>
          {prevPokemon !== null && (
            <Link
              to={`/pokemon/${prevPokemon.pokedexNumber}/${prevPokemon.name}`}
              className={`${style.changePokemonButton}`}
              title={`Prev Pokemon: ${prevFormatedName}`}
            >
              <img
                src={prevPokemon.sprites.normal ?? notFoundSpriteIcon}
                alt={`${prevPokemon.name} Sprite`}
                className={`${style.changePokemonImg}`}
              />
              {prevFormatedName} - {prevPokemon.pokedexNumber}
            </Link>
          )}

          {nextPokemon !== null && (
            <Link
              to={`/pokemon/${nextPokemon.pokedexNumber}/${nextPokemon.name}`}
              className={`${style.changePokemonButton}`}
              title={`Next Pokemon: ${nextFormatedName}`}
            >
              {nextFormatedName} - {nextPokemon.pokedexNumber}
              <img
                src={nextPokemon.sprites.normal ?? notFoundSpriteIcon}
                alt={`${nextPokemon.name} Sprite`}
                className={`${style.changePokemonImg}`}
              />
            </Link>
          )}
        </section>

        <section
          className={`${style.pokedexEntriesSection}`}
          title={`${formatName} pokedex entries`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>Pokedex Entries</h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={pokedexIcon}
                alt="Pokedex Icon"
                className={`${style.icon} ${style.pokedexIcon}`}
              />
            </figure>
          </section>

          <section className={`${style.pokedexSection}`}>
            <section className={`${style.versions}`}>
              {pokedexEntries.map((pokedex, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setVersionSelected(pokedex.version)}
                    className={`${style.versionButton} ${versionSelected === pokedex.version ? style.versionSelected : ''}`}
                    title={`See description of ${capitalizeText(pokedex.version)} version.`}
                  >
                    {pokedex.version.split('-').join(' ')}
                  </button>
                );
              })}
            </section>
            <section className={`${style.descriptionContainer}`}>
              {versionSelected && (
                <h4
                  className={`${style.pokedexSelectedTitle}`}
                  title={`Pokedex selected: ${versionSelected.split('-').join(' ')}`}
                >
                  Pokedex selected:{' '}
                  <span className={`${style.pokedexSelected}`}>
                    {versionSelected.split('-').join(' ')}
                  </span>
                </h4>
              )}
              <p
                className={`${style.description} ${versionSelected ? style.leftText : ''}`}
                title={`Pokedex entry`}
              >
                {versionSelected.trim() === '' ? (
                  '-Select a Version to see its description-'
                ) : (
                  <>
                    <span className={`${style.entryTitle}`}>Entry: </span>{' '}
                    {
                      pokedexEntries.find(
                        (entry) => entry.version === versionSelected,
                      )?.description
                    }
                  </>
                )}
              </p>
            </section>
          </section>
        </section>

        <section
          className={`${style.statsSection}`}
          title={`${formatName} stats`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>Stats</h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={statsIcon}
                alt="Stats Icon"
                className={`${style.icon} ${style.statsIcon}`}
              />
            </figure>
          </section>

          <section className={`${style.statsContainer}`}>
            {stats.map((stat) => {
              let statName: string = '';
              let classBarColor: string | undefined = '';

              switch (stat.statName) {
                case 'hp':
                  statName = 'HTP';
                  break;
                case 'attack':
                  statName = 'ATK';
                  break;
                case 'defense':
                  statName = 'DEF';
                  break;
                case 'special-attack':
                  statName = 'SPA';
                  break;
                case 'special-defense':
                  statName = 'SDF';
                  break;
                case 'speed':
                  statName = 'SPD';
                  break;
                default:
                  break;
              }

              if (stat.baseStat < 50) classBarColor = style?.lowBar;
              else if (stat.baseStat >= 50 && stat.baseStat <= 100)
                classBarColor = style.mediumBar;
              else if (stat.baseStat > 100 && stat.baseStat <= 200)
                classBarColor = style.heightBar;
              else classBarColor = style.superHeightBar;

              return (
                <article
                  key={stat.statName}
                  className={`${style.statContainer}`}
                  title={`${formatName} ${stat.statName.split('-').join(' ').toUpperCase()}: ${stat.baseStat}`}
                >
                  <h4 className={`${style.statName}`}>{statName}</h4>
                  <section className={`${style.stat}`}>
                    <p className={`${style.statLimit}`}>0</p>
                    <section className={`${style.statBar}`}>
                      <p className={`${style.statValue}`}>{stat.baseStat}</p>
                      <div
                        className={`${style.fillBar} ${classBarColor}`}
                        style={{ width: `${stat.baseStat}px` }}
                      ></div>
                    </section>
                    <p className={`${style.statLimit}`}>255</p>
                  </section>
                </article>
              );
            })}
          </section>

          <section
            className={`${style.totalStatsContanier}`}
            title={`${formatName} total stats: ${stats
              .map((stat) => stat.baseStat)
              .reduce((acum, actual) => acum + actual, 0)}`}
          >
            <p className={`${style.totalStatsValue}`}>
              <span className={`${style.subtitleStats}`}>
                {formatName} total stats:
              </span>{' '}
              {stats
                .map((stat) => stat.baseStat)
                .reduce((acum, actual) => acum + actual, 0)}
            </p>
          </section>
        </section>

        <section
          className={`${style.evolutionChainSection}`}
          title={`${formatName} evolution chain`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>Evolution Chain</h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={chainIcon}
                alt="Chain Icon"
                className={`${style.icon} ${style.chainIcon}`}
              />
            </figure>
          </section>

          <section className={`${style.evolutionChainContainer}`}>
            {evolutionChain.firstPhase.map((evo, index) => {
              return (
                <PokemonSummaryView
                  key={index}
                  sprites={evo.sprites}
                  name={evo.name}
                  types={evo.types}
                  isShiny={isShiny}
                  size={pokemonSummaryViewSize}
                />
              );
            })}
            {evolutionChain.secondPhase.length > 0 && (
              <figure
                className={`${style.iconContainer} ${style.nextIconContainer}`}
              >
                <img
                  src={width <= 390 ? nextAltIcon : nextIcon}
                  alt="Next Icon"
                  className={`${style.icon} ${style.nextIcon}`}
                  title={`Evolves to`}
                />
              </figure>
            )}
            {evolutionChain.secondPhase.length > 0 &&
              evolutionChain.secondPhase.map((evo, index) => {
                return (
                  <PokemonSummaryView
                    key={index}
                    sprites={evo.sprites}
                    name={evo.name}
                    types={evo.types}
                    isShiny={isShiny}
                    size={pokemonSummaryViewSize}
                  />
                );
              })}
            {evolutionChain.thirdPhase.length > 0 && (
              <figure
                className={`${style.iconContainer} ${style.nextIconContainer}`}
              >
                <img
                  src={width <= 390 ? nextAltIcon : nextIcon}
                  alt="Next Icon"
                  className={`${style.icon} ${style.nextIcon}`}
                  title={`Evolves to`}
                />
              </figure>
            )}
            {evolutionChain.thirdPhase.length > 0 &&
              evolutionChain.thirdPhase.map((evo, index) => {
                return (
                  <PokemonSummaryView
                    key={index}
                    sprites={evo.sprites}
                    name={evo.name}
                    types={evo.types}
                    isShiny={isShiny}
                    size={pokemonSummaryViewSize}
                  />
                );
              })}
          </section>
        </section>

        <section
          className={`${style.otherFormsSection}`}
          title={`${formatName} alternative forms`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>Other Forms</h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={changeIcon}
                alt="Change Icon"
                className={`${style.icon} ${style.changeIcon}`}
              />
            </figure>
          </section>

          <section className={`${style.otherFormsContainer}`}>
            {otherForms.map((form, index) => {
              return (
                <PokemonSummaryView
                  key={index}
                  sprites={form.sprites}
                  name={form.name}
                  types={form.types}
                  isShiny={isShiny}
                  size={pokemonSummaryViewSize}
                />
              );
            })}
          </section>
        </section>

        <section
          className={`${style.damageSection}`}
          title={`${formatName} type relation`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>Strengths and Weaknesses</h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={combatIcon}
                alt="Combat Icon"
                className={`${style.icon} ${style.combatIcon}`}
              />
            </figure>
          </section>

          <section className={`${style.typeRelationContanier}`}>
            {weaknessResistance.map((itemRelation) => {
              return (
                <DamageRelationView
                  key={itemRelation.effectiveness}
                  effectiveness={itemRelation.effectiveness}
                  damageMultiplier={itemRelation.damageMultiplier}
                  types={itemRelation.types}
                />
              );
            })}
          </section>
        </section>

        <section
          className={`${style.abilitiesSection}`}
          title={`${formatName} abilities`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>Abilities</h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={abilityIcon}
                alt="Abilities Icon"
                className={`${style.icon} ${style.abilitiesIcon}`}
              />
            </figure>
          </section>

          <section className={`${style.abilitiesContainer}`}>
            {abilities.map((ability, index) => {
              return (
                <article
                  key={index}
                  className={`${style.ability}`}
                  title={`Ability: ${ability.name}`}
                >
                  <section className={`${style.abilityHeaderSection}`}>
                    <figure className={`${style.selectorIconContainer}`}>
                      <img
                        src={pokeballIcon}
                        alt="Pokeball Icon"
                        className={`${style.icon} ${style.selectorIcon}`}
                      />
                    </figure>
                    <h4
                      className={`${style.abilityTitle} ${ability.isHidden ? style.abilityHiddenTitle : ''}`}
                    >
                      {ability.name}{' '}
                      {ability.isHidden ? (
                        <span className={`${style.hiddenInicator}`}>
                          (hidden)
                        </span>
                      ) : (
                        ''
                      )}
                    </h4>
                    {ability.isHidden && (
                      <figure className={`${style.selectorIconContainer}`}>
                        <img
                          src={hideIcon}
                          alt="Pokeball Icon"
                          className={`${style.icon} ${style.hiddenIcon}`}
                        />
                      </figure>
                    )}
                  </section>

                  <section className={`${style.abilityDescriptionSection}`}>
                    <p className={`${style.abilityDescription}`}>
                      {ability.effect}
                    </p>
                    <br />
                    <p className={`${style.abilityDescription}`}>
                      {ability.shortEffect}
                    </p>
                  </section>
                </article>
              );
            })}
          </section>
        </section>

        <section
          className={`${style.movesSection}`}
          title={`${formatName} moves`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>
              Movements Learned By {formatName}
            </h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={movesIcon}
                alt="Moves Icon"
                className={`${style.icon} ${style.movesIcon}`}
              />
            </figure>
            <p className={`${style.movementsTotal}`}>
              Total movements: {moves.length}
            </p>
          </section>

          <section className={`${style.movesWrapper}`}>
            <section className={`${style.movesContainer}`}>
              {moves.slice(0, visibleMoves).map((movement) => {
                return (
                  <PokemonMoveCard
                    key={movement.name}
                    name={movement.name}
                    description={movement.description}
                    type={movement.type}
                    effect={movement.effect}
                    damage={movement.damage}
                    accuracy={movement.accuracy}
                    pp={movement.pp}
                    otherPokemons={movement.otherPokemons}
                  />
                );
              })}
            </section>

            <section className={`${style.seeMoreMovementsSection}`}>
              <button
                onClick={handleShowMoreMoves}
                className={`${style.movementsButton}`}
                title={`See ${visibleMoves >= moves.length ? 'less' : 'more'} movements`}
              >
                {visibleMoves >= moves.length
                  ? 'Show less movements'
                  : 'See more movements'}
              </button>
              <p className={`${style.movementsLeft}`}>
                Movements left:{' '}
                {moves.length <= INITIAL_MOVES_COUNT
                  ? 0
                  : moves.length - visibleMoves}
              </p>
            </section>
          </section>
        </section>

        <section
          className={`${style.tcgCardsSection}`}
          title={`${formatName} TCG cards`}
        >
          <section className={`${style.subtitleContainer}`}>
            <h3 className={`${style.subtitle}`}>{`${formatName} TCG Cards`}</h3>
            <figure className={`${style.iconContainer}`}>
              <img
                src={cardsIcon}
                alt="TCG Cards Icon"
                className={`${style.icon} ${style.cardsIcon}`}
              />
            </figure>
          </section>

          <section className={`${style.cardsSection}`}>
            <section
              className={`${style.tcgCardsContainer}`}
              ref={carrousellRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onWheel={handleWheel}
            >
              {cards ? (
                cards.map((card, index) => {
                  return (
                    <figure
                      key={index}
                      className={`${style.tcgCardImgContainer}`}
                      title={`${formatName} TCG card ${index + 1}`}
                    >
                      <img
                        src={card.img}
                        alt={`Item TCG Card ${index}`}
                        className={`${style.tcgCardImg}`}
                      />
                    </figure>
                  );
                })
              ) : (
                <p className={`${style.noCardsMessage}`}>
                  This item has no TCG cards
                </p>
              )}
            </section>
            <h4 className={`${style.tcgCardsCount}`}>
              {formatName} Cards: {cards.length}
            </h4>
          </section>
        </section>
      </article>
    </>
  );
};

export default PokemonMainDetails;
