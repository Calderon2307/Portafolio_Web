import { FaWhatsapp, FaFacebookSquare } from "react-icons/fa";
import style from './Contactos.module.css';

const Contactos = () => {

    return (
        <div className={`${style.container}`}>
            <p className={`${style.title}`}>Contactos</p>
            <nav className={`${style.nav}`}>
                <ul className={`${style.list}`}>
                    <li className={`${style.listItem}`}>
                        <a className={`${style.link}`} title='Escribenos por Whatsapp' href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
                            <FaWhatsapp className={`${style.icon}`} />
                        </a>
                    </li>
                    <li className={`${style.listItem}`}>
                        <a className={`${style.link}`} title='Visita nuestra pagina de Facebook' href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <FaFacebookSquare className={`${style.icon}`} />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Contactos;