import { useEffect, useState } from "react";
import Header from "../Home/Header/Header";
import Body from '../UserCreateRecipe/Body/Body';
import Footer from "../Home/Footer/Footer";

const UserEditRecipe = ({ setSearchTerm }) => {

    const [render, setRender] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        setRender(false);
        setUser(true);
    }, []);

    return (
        <>
            <Header render={render} user={user} setSearchTerm={setSearchTerm} />
            <Body />
            <Footer user={user} />
        </>
    );
};

export default UserEditRecipe;