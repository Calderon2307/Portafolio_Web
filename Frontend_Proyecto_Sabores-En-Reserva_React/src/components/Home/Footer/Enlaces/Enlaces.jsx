import { NavLink } from 'react-router-dom';
import style from './Enlaces.module.css';

const Enlaces = ({ user }) => {

    const notNavigate = () => {
        alert(`Debes iniciar sesion o registrarte para poder navegar por la pagina.`);
    };

    return (

        <>
            {
                user ?

                    (
                        <div className={`${style.navContainer}`}>
                            <p className={`${style.navTitle}`}>Enlaces</p>
                            <nav className={`${style.nav}`}>
                                <ul className={`${style.navList}`}>
                                    <li className={`${style.listItem}`}>
                                        <NavLink to='/user-create-recipe' className={`${style.link}`}>Subir Recetas</NavLink>
                                    </li>
                                    <li className={`${style.listItem}`}>
                                        <NavLink to='/user-saved-recipes' className={`${style.link}`}>Recetas Guardadas</NavLink>
                                    </li>
                                    <li className={`${style.listItem}`}>
                                        <NavLink to='/user-profile' className={`${style.link}`}>Alacena Virtual</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    )

                    :

                    (
                        <div className={`${style.navContainer}`}>
                            <p className={`${style.navTitle}`}>Enlaces</p>
                            <nav className={`${style.nav}`}>
                                <ul className={`${style.navList}`}>
                                    <li className={`${style.listItem}`}>
                                        <NavLink to='' className={`${style.link}`} onClick={notNavigate}>Subir Recetas</NavLink>
                                    </li>
                                    <li className={`${style.listItem}`}>
                                        <NavLink to='' className={`${style.link}`} onClick={notNavigate}>Recetas Guardadas</NavLink>
                                    </li>
                                    <li className={`${style.listItem}`}>
                                        <NavLink to='' className={`${style.link}`} onClick={notNavigate}>Alacena Virtual</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )

            }

        </>


    );
};

export default Enlaces;