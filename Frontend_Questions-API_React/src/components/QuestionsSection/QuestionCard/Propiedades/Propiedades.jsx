import style from './Propiedades.module.css';

const Propiedades = ({ pregProps }) => {

    const dificultadClasses = {
        easy: `${style.easy}`,
        medium: `${style.medium}`,
        hard: `${style.hard}`
    };

    const dificultadClass = dificultadClasses[pregProps.dificultad] || '';

    return(
        <div className={`${style.info_container}`}>
            <p className={`${style.categoria}`}>{pregProps.categoria}</p>
            <p className={`${style.dificultad} ${dificultadClass}`}>{pregProps.dificultad}</p>
        </div>
    );
};

export default Propiedades;