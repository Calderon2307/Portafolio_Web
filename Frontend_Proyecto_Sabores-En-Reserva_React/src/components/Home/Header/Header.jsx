import style from './Header.module.css';
import { MdMenu, MdClose } from "react-icons/md";
import Title from './Title/Title';
import MainSearch from './MainSearch/MainSearch';
import LogButtons from './LogButtons/LogButtons';
import UserInfo from './UserInfo/UserInfo';
import IndexNav from '../Body/IndexView/IndexNav/IndexNav';
import ActionButtons from '@/components/UserProfile/Body/UserInfo/ActionButtons/ActionButtons';
import { useEffect, useState } from 'react';


const Header = ({ render, user, setSearchTerm }) => {

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

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
        <header className={`${style.header}`}>
            <Title user={user} />
            {windowWidth > 873 ? (
                <>
                    {render || <MainSearch setSearchTerm={setSearchTerm} user={user} />}
                    {render || (user ? <UserInfo /> : <LogButtons />)}
                </>
            ) : (
                <div className={`${style.menuMovil} ${isMenuOpen ? style.menuOpen : ''}`}>
                    {render || <MainSearch setSearchTerm={setSearchTerm} user={user} />}
                    {render || (user ? (<> <ActionButtons /> <IndexNav /> <UserInfo /></>) : <LogButtons />)}
                </div>
            )}
            <div className={`${style.iconContainer}`} onClick={toggleMenu}>
                {isMenuOpen ? (
                    <MdClose className={`${style.menu}`} />
                ) : (
                    <MdMenu className={`${style.menu}`} />
                )}
            </div>
        </header>
    );
};

export default Header;