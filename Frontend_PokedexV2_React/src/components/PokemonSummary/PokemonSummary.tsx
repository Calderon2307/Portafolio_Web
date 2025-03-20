import { Dispatch, SetStateAction, useRef } from 'react';
import { capitalizeText } from '@utils/formatText';
import { Pokemon } from '@models/pokemon';
import shinyIcon from '@assets/icons/shinySolid.png';
import maleIcon from '@assets/icons/male.png';
import femaleIcon from '@assets/icons/female.png';
import soundIcon from '@assets/icons/sound.png';
import notFoundSpriteIcon from '@assets/icons/Not_Found_Sprite_Alt.gif';
import style from '@components/PokemonSummary/PokemonSummary.module.css';

type PokemonSummaryType = Pick<
  Pokemon,
  | 'name'
  | 'sprites'
  | 'types'
  | 'nameMeaning'
  | 'pokedexNumber'
  | 'pokemonId'
  | 'height'
  | 'weight'
  | 'generation'
  | 'baseXP'
  | 'genderRate'
  | 'souond'
>;

type ShinyControlType = {
  isShiny: boolean;
  setIsShiny: Dispatch<SetStateAction<boolean>>;
};

const PokemonSummary: React.FC<PokemonSummaryType & ShinyControlType> = ({
  name,
  sprites,
  types,
  nameMeaning,
  pokedexNumber,
  pokemonId,
  height,
  weight,
  generation,
  baseXP,
  genderRate,
  souond,
  isShiny,
  setIsShiny,
}) => {
  let region: string = '';
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleShiny = () => {
    setIsShiny(!isShiny);
  };

  const playPokemonCry = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  switch (generation.split('-')[1]) {
    case 'i':
      region = 'Kanto';
      break;
    case 'ii':
      region = 'Johto';
      break;
    case 'iii':
      region = 'Hoenn';
      break;
    case 'iv':
      region = 'Sinnoh';
      break;
    case 'v':
      region = 'Unova';
      break;
    case 'vi':
      region = 'Kalos';
      break;
    case 'vii':
      region = 'Alola';
      break;
    case 'viii':
      region = 'Galar';
      break;
    case 'ix':
      region = 'Paldea';
      break;
    default:
      break;
  }

  const formatName = capitalizeText(name);
  const formatNameMeaning = capitalizeText(nameMeaning);
  const formatHeight = height / 10 < 1 ? `${height * 10}cm` : `${height / 10}m`;
  const formatWeight = weight / 10 < 1 ? `${weight * 10}g` : `${weight / 10}kg`;
  const pokemonSprite = isShiny
    ? (sprites.shiny ?? notFoundSpriteIcon)
    : (sprites.normal ?? notFoundSpriteIcon);

  return (
    <>
      <article className={`${style.summarySection}`}>
        <section className={`${style.changeSpriteSection}`}>
          <p className={`${style.text}`}>Normal</p>
          <button
            onClick={handleShiny}
            className={`${style.shinyButton}`}
            title={isShiny ? 'Show normal version' : 'Show shiny version'}
          >
            <div
              className={`${style.shinyToggle} ${isShiny ? style.moveToRight : ''}`}
            >
              <img
                src={shinyIcon}
                alt="Shiny Icon"
                className={`${style.icon} ${style.shinyIcon}`}
              />
            </div>
          </button>
          <p className={`${style.text} ${isShiny ? style.shinyText : ''}`}>
            Shiny
          </p>
        </section>

        <section className={`${style.spriteSection}`}>
          <h2
            className={`${style.pokemonName} ${style.title}`}
            title={`Pokemon name: ${formatName}`}
          >
            {formatName}
          </h2>
          <figure className={`${style.pokemonSpriteContainer}`}>
            <img
              src={pokemonSprite}
              alt={`${isShiny ? 'Shiny' : ''} ${formatName} sprite`}
              className={`${style.pokemonSprite}`}
              title={`${isShiny ? 'Shiny' : ''} ${formatName} sprite`}
            />
          </figure>
          <section className={`${style.typesContainer}`}>
            {types.map((type: string, index: number) => {
              return (
                <span
                  key={index}
                  className={`${type} ${style.type}`}
                  title={`${type} type`}
                >
                  {type.toUpperCase()}
                </span>
              );
            })}
          </section>
          <h3
            className={`${style.nameMeaning}`}
            title={`Name meaning: ${formatNameMeaning}`}
          >
            "{formatNameMeaning}"
          </h3>
        </section>

        <section className={`${style.dataSection}`}>
          <p className={`${style.data}`} title={`Pokedex number: ${pokemonId}`}>
            <span className={`${style.dataTitle}`}>N.° Pokedex:</span>{' '}
            {pokemonId}
          </p>
          <p
            className={`${style.data}`}
            title={`Pokemon height: ${formatHeight}`}
          >
            <span className={`${style.dataTitle}`}>Height:</span> {formatHeight}
          </p>
          <p
            className={`${style.data}`}
            title={`Pokemon weight: ${formatWeight}`}
          >
            <span className={`${style.dataTitle}`}>Weight:</span> {formatWeight}
          </p>
          <p className={`${style.data}`} title={`Pokemon region: ${region}`}>
            <span className={`${style.dataTitle}`}>Generation: </span> {region}
          </p>
          <p className={`${style.data}`} title={`Pokemon base XP: ${baseXP}`}>
            <span className={`${style.dataTitle}`}>Base XP:</span> {baseXP}xp
          </p>
        </section>

        <section className={`${style.extraSection}`}>
          {genderRate.female > 0 ? (
            <section className={`${style.genderRateSection}`}>
              <div
                className={`${style.genderContainer}`}
                title={`${formatName} male rate: ${genderRate.male}%`}
              >
                <img
                  src={maleIcon}
                  alt="Male Icon"
                  className={`${style.icon} ${style.genderIcon}`}
                />
                <p className={`${style.gender}`}>{genderRate.male}%</p>
              </div>
              <div
                className={`${style.genderContainer}`}
                title={`${formatName} female rate: ${genderRate.female}%`}
              >
                <img
                  src={femaleIcon}
                  alt="Female Icon"
                  className={`${style.icon} ${style.genderIcon}`}
                />
                <p className={`${style.gender}`}>{genderRate.female}%</p>
              </div>
            </section>
          ) : (
            <p className={`${style.data}`} title={`This Pokemon has no gender`}>
              Genderless
            </p>
          )}

          <section className={`${style.soundSection}`}>
            <audio
              src={souond}
              ref={audioRef}
              className={`${style.pokemonCry}`}
            />
            <button
              onClick={playPokemonCry}
              className={`${style.soundButton}`}
              title={`Hear roar of ${formatName}`}
            >
              CRY
              <img
                src={soundIcon}
                alt="Sound Icon"
                className={`${style.icon} ${style.soundIcon}`}
              />
            </button>
          </section>
        </section>
      </article>
    </>
  );
};

export default PokemonSummary;
