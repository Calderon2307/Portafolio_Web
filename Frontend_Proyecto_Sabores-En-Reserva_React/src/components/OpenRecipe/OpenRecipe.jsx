import { useEffect, useState } from "react";
import Footer from "../Home/Footer/Footer";
import Header from "../Home/Header/Header";
import Body from '../UserOpenRecipe/Body/Body';

const OpenRecipe = ({ setSearchTerm }) => {

    const [user, setUser] = useState(true);

    useEffect(() => {
        setUser(false);
    }, []);

    return (
        <>
            <Header setSearchTerm={setSearchTerm} />
            <Body user={user} />
            <Footer user={user} />
        </>
    );
};

export default OpenRecipe;