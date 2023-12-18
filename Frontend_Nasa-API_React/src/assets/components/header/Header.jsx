import nasaLogo from '../../img/nasa.webp';
import Navigation from './navigation/Navigation';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="container">
            <div className="header__wrapper">
                <NavLink to="/">
                    <h1 className="header__title">
                        <abbr title="Astronomy Picture of the Day">APOD</abbr>
                    </h1>
                </NavLink>
                <a
                    href="https://www.nasa.gov/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <img
                        alt="NASA"
                        src={nasaLogo}
                        className="header__logo"
                    />
                </a>
            </div>
            <Navigation />
        </div>
    );
}

export default Header;