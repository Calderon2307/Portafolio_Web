import Header from '../Home/Header/Header';
import Body from './Body/Body';
import Footer from '../Home/Footer/Footer';
import { useEffect, useState } from 'react';

const SearchRecipe = ({ searchTerm, setSearchTerm }) => {

    const [user, setUser] = useState(false);

    useEffect(() => {
        setUser(false);
    }, []);

    return (
        <>
            <Header user={user} setSearchTerm={setSearchTerm} />
            <Body user={user} searchTerm={searchTerm} />
            <Footer user={user} />
        </>
    );
};

export default SearchRecipe;