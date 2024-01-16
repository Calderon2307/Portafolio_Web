import style from './LoadRecipesButton.module.css';
import { FaPlus } from "react-icons/fa";

const LoadRecipesButton = () => {

    return (
        <button className={`${style.button}`} >
            <FaPlus className={`${style.icon}`} /> Cargar mas
        </button>
    );
};

export default LoadRecipesButton;