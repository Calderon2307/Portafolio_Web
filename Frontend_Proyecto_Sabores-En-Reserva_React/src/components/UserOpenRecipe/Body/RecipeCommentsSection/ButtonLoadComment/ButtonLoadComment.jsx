import style from './ButtonLoadComment.module.css';
import { FaPlus } from "react-icons/fa";
const ButtonLoadComment = () => {

    return (
        <button className={`${style.button}`}>
            <FaPlus className={`${style.icon}`} />
            Cargar mas comentarios
        </button>
    );
};

export default ButtonLoadComment;