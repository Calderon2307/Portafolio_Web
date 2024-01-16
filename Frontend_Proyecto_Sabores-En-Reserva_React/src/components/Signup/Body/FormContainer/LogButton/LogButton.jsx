import { NavLink } from 'react-router-dom';
import style from './LogButton.module.css';

const LogButton = () => {

    return (
        <div className={`${style.wrapper}`}>
            <p className={`${style.p}`}>¿Ya tienes cuenta? Haz click <NavLink to='/login' className={`${style.link}`}>aqui</NavLink></p>
        </div>
    );
};

export default LogButton;