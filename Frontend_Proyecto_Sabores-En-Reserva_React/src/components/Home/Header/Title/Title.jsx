import { NavLink } from 'react-router-dom';
import style from './Title.module.css';
import { useEffect, useState } from 'react';

const Title = ({ user }) => {

    const [link, setLink] = useState('/');

    useEffect(() => {
        if (user) setLink('/user-home');
    }, [user]);

    return (
        <NavLink to={link} className={`${style.title}`}>
            <h1 title='Sabores en Reserva | Recetas Guardadas, Historias Compartidas'>
                Sabores en Reserva
            </h1>
        </NavLink>
    );
};

export default Title;