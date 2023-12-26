import style from './Header.module.css';

const Header = () => {

    return(
    <header className={`${style.header}`}>
        <h1>TRIVIA</h1>
    </header>
    );
};

export default Header;