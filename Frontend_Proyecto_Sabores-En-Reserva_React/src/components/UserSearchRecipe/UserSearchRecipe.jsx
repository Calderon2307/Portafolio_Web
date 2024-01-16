import Header from '../Home/Header/Header';
import Body from '../SearchRecipe/Body/Body';
import Footer from '../Home/Footer/Footer';
import { useEffect, useState } from 'react';

const UserSearchRecipe = ({ searchTerm, setSearchTerm }) => {

    const [user, setUser] = useState(true);

    useEffect(() => {
        setUser(false);
    }, []);

    useEffect(() => {
        setUser(true);
    }), [];

    return (

        <>
            <Header user={user} setSearchTerm={setSearchTerm} />
            <Body user={user} searchTerm={searchTerm} />
            <Footer user={user} />
        </>
    );
};

export default UserSearchRecipe;