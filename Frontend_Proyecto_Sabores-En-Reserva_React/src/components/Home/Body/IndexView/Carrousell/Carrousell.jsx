import style from './Carrousell.module.css';

const Carrousell = () => {

    return (
        <div className={`${style.container}`}>
            <img src='/src/assets/comidaFondo.jpg' className={`${style.img}`} />
            <div className={`${style.textContainer}`}>
                <h2 className={`${style.subTitle}`}>¿Quienes somos?</h2>
                <p className={`${style.p}`}>
                    Somos una empresa enfocada en la salud de los estudiantes Universitarios de la Universidad Centroamericana Jose Simeon Cañas (UCA).
                </p>
                <p className={`${style.p}`}>
                    Debido a eso hemos creado esta pagina en la que cualquier estudiante (o persona en general) podra visitar y encontrar recetas que pueda realizar en cuestion de pocos minutos en caso de no disponer de tanto tiempo o recetas que requieran pocos recursos en caso de tener poco capital.
                </p>
            </div>
        </div>
    );
};

export default Carrousell;