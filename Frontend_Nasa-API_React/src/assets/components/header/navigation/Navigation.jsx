import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navbar">
            <ul className="navbar__list container">
                <li>
                    <NavLink to="/" className="navbar__link">Range</NavLink>
                </li>
                <li>
                    <NavLink to="/random" className="navbar__link">Random</NavLink>
                </li>
                <li>
                    <NavLink to="/date" className="navbar__link">Date</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;