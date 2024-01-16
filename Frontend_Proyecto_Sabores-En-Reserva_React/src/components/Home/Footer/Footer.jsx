import style from './Footer.module.css';
import DerechosAutor from './DerechosAutor/DerechosAutor';
import Enlaces from './Enlaces/Enlaces';
import Contactos from './Contactos/Contactos';

const Footer = ({ user }) => {

    return (
        <footer className={`${style.footer}`}>
            <DerechosAutor />
            <Enlaces user={user} />
            <Contactos />
        </footer>
    );
};

export default Footer;