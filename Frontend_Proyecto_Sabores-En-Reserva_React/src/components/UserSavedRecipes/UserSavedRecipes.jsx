import { useEffect, useState } from "react";
import Header from "../Home/Header/Header";
import Body from '../UserPublishedRecipes/Body/Body';
import Footer from "../Home/Footer/Footer";

const UserSavedRecipes = ({ setSearchTerm }) => {

    const [render, setRender] = useState(false);
    const [user, setUser] = useState(false);
    const [savedPage, setSavedPage] = useState(false);

    useEffect(() => {
        setRender(false);
        setUser(true);
        setSavedPage(true);
    }, []);

    return (
        <>
            <Header render={render} user={user} setSearchTerm={setSearchTerm} />
            <Body user={user} savedPageLoad={savedPage} />
            <Footer user={user} />
        </>
    );
};

export default UserSavedRecipes;