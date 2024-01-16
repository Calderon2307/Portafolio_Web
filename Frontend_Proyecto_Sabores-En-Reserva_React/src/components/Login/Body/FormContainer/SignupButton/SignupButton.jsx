import { NavLink } from 'react-router-dom';
import style from './SignupButton.module.css';

const SignupButton = () => {

    return (
        <div className={`${style.wrapper}`}>
            <p className={`${style.p}`}>¿No tienes cuenta? Haz click <NavLink to='/signup' className={`${style.link}`}>aqui</NavLink></p>
        </div>
    );
};

export default SignupButton;