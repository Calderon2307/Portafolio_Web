import { useEffect, useState } from 'react';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import Body from './Body/Body';

const Login = () => {

    const [render, setRender] = useState();

    useEffect(() => {
        setRender(true);
    }, []);

    return (
        <>
            <Header render={render} />
            <Body />
            <Footer />
        </>
    );
};

export default Login;
