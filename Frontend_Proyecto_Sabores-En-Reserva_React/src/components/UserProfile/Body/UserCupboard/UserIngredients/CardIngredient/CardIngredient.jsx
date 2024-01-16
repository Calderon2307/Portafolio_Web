import style from './CardIngredient.module.css';
import { MdClose } from "react-icons/md";

const CardIngredient = ({ name, amount, onDelete }) => {

    const handleDelete = () => {
        onDelete(name, amount);
    };

    return (
        <article className={`${style.card}`}>
            <div className={`${style.iconContainer}`}>
                <MdClose
                    className={`${style.icon}`}
                    title='Eliminar Ingrediente'
                    onClick={handleDelete}
                />
            </div>
            <div className={`${style.ingredientImg}`}>
                <img className={`${style.img}`} src='/src/assets/Comida7.jpeg' />
            </div>
            <section className={`${style.ingredientInfo}`}>
                <div className={`${style.wrapper}`}>
                    <p className={`${style.title}`}>Nombre: </p>
                    <p className={`${style.value}`}>
                        {name}
                    </p>
                </div>
                <div className={`${style.wrapper}`}>
                    <p className={`${style.title}`}>Cantidad: </p>
                    <p className={`${style.value}`}>
                        {amount}
                    </p>
                </div>
            </section>
        </article>
    );
};

export default CardIngredient;

