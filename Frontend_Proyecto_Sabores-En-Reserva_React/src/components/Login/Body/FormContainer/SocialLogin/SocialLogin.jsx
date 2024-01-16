import { NavLink } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import style from './SocialLogin.module.css';

const SocialLogin = () => {

    return (
        <div className={`${style.container}`}>
            <div className={`${style.wrapper}`}>
                <p className={`${style.title}`}>O inicia sesion con:</p>
                <div className={`${style.wrapperLinks}`}>
                    <NavLink to='/login-google' className={`${style.link}`}><FcGoogle /></NavLink>
                    <NavLink to='/login-facebook' className={`${style.link} ${style.facebook}`}><FaFacebook /></NavLink>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;