import { useEffect, useState } from "react";
import Footer from "../Home/Footer/Footer";
import Header from "../Home/Header/Header";
import Body from './Body/Body';


const NotFoundPage = ({ setSearchTerm }) => {

    const [render, setRender] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        setRender(true);
        setUser(true);
    }, []);

    return (
        <>
            <Header render={render} user={user} setSearchTerm={setSearchTerm} />
            <Body />
            <Footer />
        </>
    );
};

export default NotFoundPage;