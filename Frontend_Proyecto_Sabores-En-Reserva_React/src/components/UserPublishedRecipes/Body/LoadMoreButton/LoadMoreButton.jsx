import style from './LoadMoreButton.module.css';
import { FaPlus } from "react-icons/fa";

const LoadMoreButton = () => {

    return (
        <button className={`${style.button}`}>
            <FaPlus className={`${style.icon}`} />
            Cargar Mas
        </button>
    );
};

export default LoadMoreButton;