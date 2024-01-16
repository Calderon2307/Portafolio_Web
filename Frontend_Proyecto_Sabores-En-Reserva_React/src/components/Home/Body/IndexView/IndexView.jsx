import style from './IndexView.module.css';
import Carrousell from './Carrousell/Carrousell';
import IndexNav from './IndexNav/IndexNav';
import { useEffect, useState } from 'react';

const IndexView = ({ user }) => {

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

        <section className={`${style.section}`}>
            {windowWidth <= 873 ? <></> : (!user || <IndexNav />)}
            <Carrousell />
        </section>
    );
};

export default IndexView;