import { NavLink } from 'react-router-dom';
import style from './IndexNav.module.css';
import { FaBookBookmark } from "react-icons/fa6";
import { MdInbox } from "react-icons/md";
import { BiSolidFridge } from "react-icons/bi";

const IndexNav = () => {

    return (
        <div className={`${style.navContainer}`}>
            <nav className={`${style.nav}`}>
                <ul className={`${style.list}`}>
                    <li className={`${style.listItem}`}>
                        <NavLink to='/user-create-recipe' className={`${style.link}`}>
                            <FaBookBookmark className={`${style.icon}`} /> Crear Receta
                        </NavLink>
                    </li>
                    <li className={`${style.listItem}`}>
                        <NavLink to='/user-saved-recipes' className={`${style.link}`}>
                            <MdInbox className={`${style.icon}`} /> Recetas Guardadas
                        </NavLink>
                    </li>
                    <li className={`${style.listItem}`}>
                        <NavLink to='/user-profile' className={`${style.link}`}>
                            <BiSolidFridge className={`${style.icon}`} /> Alacena Virtual
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default IndexNav;