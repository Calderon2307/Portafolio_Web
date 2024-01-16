import style from './Body.module.css';
import IndexNav from '@/components/Home/Body/IndexView/IndexNav/IndexNav';
import SearchBar from './SearchBar/SearchBar';
import Recipes from './Recipes/Recipes';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import { useEffect, useState } from 'react';

const Body = ({ user, savedPageLoad }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        <main className={`${style.main}`}>
            {windowWidth <= 873 ? <></> : <IndexNav />}
            <SearchBar savedPageLoad={savedPageLoad} />
            <Recipes user={user} />
            <LoadMoreButton />
        </main>
    );
};

export default Body;