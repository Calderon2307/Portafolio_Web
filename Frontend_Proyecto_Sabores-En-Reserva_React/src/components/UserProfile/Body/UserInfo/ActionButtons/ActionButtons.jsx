import style from './ActionButtons.module.css';
import { MdOutlineLogout } from "react-icons/md";
import { FaGear, FaBookBookmark } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ActionButtons = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>

            {
                windowWidth <= 873 ?
                    <>
                        <div className={`${style.linksContainer}`}>
                            <div className={`${style.wrapper}`}>
                                <NavLink to='/' className={`${style.link}`}>
                                    Cerrar Sesion <MdOutlineLogout className={`${style.icon}`} />
                                </NavLink>
                            </div>
                            <div className={`${style.wrapper}`}>
                                <NavLink to='/user-edit-profile' className={`${style.link}`}>
                                    Editar Perfil <FaGear className={`${style.icon}`} />
                                </NavLink>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className={`${style.linksContainer}`}>
                            <div className={`${style.wrapper}`}>
                                <NavLink to='/' className={`${style.link}`}>
                                    Cerrar Sesion <MdOutlineLogout className={`${style.icon}`} />
                                </NavLink>
                            </div>
                            <div className={`${style.wrapper}`}>
                                <NavLink to='/user-edit-profile' className={`${style.link}`}>
                                    Editar Perfil <FaGear className={`${style.icon}`} />
                                </NavLink>
                            </div>
                            <div className={`${style.wrapper}`}>
                                <NavLink to='/user-create-recipe' className={`${style.link}`}>
                                    Crear Receta <FaBookBookmark className={`${style.icon}`} />
                                </NavLink>
                            </div>
                        </div>
                    </>
            }
        </>

    );
};

export default ActionButtons;