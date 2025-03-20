import addIcon from '@assets/icons/add.png';
import addIconBold from '@assets/icons/addBold.png';
import style from '@components/SelectPokemonBtn/SelectPokemonBtn.module.css';

type SelectPokemonButtonProps = {
  onClick: () => void;
};

const SelectPokemonBtn: React.FC<SelectPokemonButtonProps> = ({ onClick }) => {
  return (
    <article className={`${style.buttonContainer}`}>
      <button
        onClick={onClick}
        className={`${style.addBtn}`}
        title={`Add a Pokemon to your team`}
      >
        <img src={addIcon} alt="Add Icon" className={`${style.icon}`} />
      </button>
      <p className={`${style.addMessage}`}>Add Pokémon</p>
    </article>
  );
};

export default SelectPokemonBtn;
