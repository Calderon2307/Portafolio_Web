import { useEffect, useState } from 'react';
import style from './Card.module.css';
import { FaBookmark, FaRegBookmark, FaPlay } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { NavLink } from 'react-router-dom';

const Card = ({ user }) => {

    const [save, setSave] = useState(false);
    const [link, setLink] = useState('/open-recipe');

    const saveRecipe = () => {
        if (save === false) setSave(true);
        else setSave(false);
    };

    useEffect(() => {
        if (user) setLink('/user-open-recipe');
    }, [user]);

    return (
        <article className={`${style.card}`}>
            <div className={`${style.recipeImg}`}>
                <img className={`${style.img}`} src='src/assets/Comida7.jpeg' />
            </div>
            <section className={`${style.recipeInfo}`}>
                <h3 className={`${style.nameContainer}`}>
                    <NavLink to={link} className={`${style.recipeName} ${style.link}`} title='Ver receta' >Recipe Name</NavLink>
                </h3>
                <div className={`${style.wrapper}`}>
                    <div className={`${style.recipeDifficullty}`}>Facil</div>
                    <div className={`${style.recipeTime}`}>5min</div>
                </div>
            </section>
            <section className={`${style.recipeDescription}`}>
                <p className={`${style.text}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            <section className={`${style.actionsContainer}`}>
                <div className={`${style.saveStart}`}>
                    {
                        save ?
                            <FaBookmark className={`${style.icon} ${style.save}`} onClick={saveRecipe} title='Eliminar receta de Guardados' />
                            :
                            <FaRegBookmark className={`${style.icon} ${style.save}`} onClick={saveRecipe} title='Guardar receta' />
                    }
                    <NavLink to={link}>
                        <FaPlay className={`${style.icon} ${style.start}`} title='Ver receta' />
                    </NavLink>
                </div>
                <div className={`${style.hats}`}>
                    <p className={`${style.number}`}>5</p>
                    <LuChefHat className={`${style.icon}`} />
                </div>
            </section>
        </article>
    );
};

export default Card;