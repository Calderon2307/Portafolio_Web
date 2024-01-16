import { NavLink } from 'react-router-dom';
import { MdLogin } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import style from './LogButtons.module.css';

const LogButtons = () => {

    return (
        <div className={`${style.btnContainer}`}>
            <NavLink to='/login' className={`${style.button} ${style.btnLogin}`} title='Ingresa con tu cuenta'> <MdLogin className={`${style.icon}`} /> INGRESAR</NavLink>
            <NavLink to='signup' className={`${style.button} ${style.btnSignUp}`} title='Crea una cuenta'> <FaUserEdit className={`${style.icon}`} />REGISTRO</NavLink>
        </div>
    );
};

export default LogButtons;