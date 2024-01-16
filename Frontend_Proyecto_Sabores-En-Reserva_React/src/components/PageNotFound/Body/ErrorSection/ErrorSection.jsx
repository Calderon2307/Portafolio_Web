import style from './ErrorSection.module.css';

const ErrorSection = () => {

    return (
        <section className={`${style.section}`}>
            <h2 className={`${style.title}`}>ERROR:</h2>
            <div className={`${style.errorContanier}`}>
                <div className={`${style.numberContainer}`}>
                    <p className={`${style.four}`} >4</p>
                </div>
                <div className={`${style.imgContainer}`}>
                    <img src='/src/assets/MasterChef.gif' className={`${style.gif}`} />
                </div>
                <div className={`${style.numberContainer}`}>
                    <p className={`${style.four}`} >4</p>
                </div>
            </div>
            <div className={`${style.messageContainer}`}>
                <p className={`${style.message}`}>
                    Parece que la pagina que estas buscando no existe.
                </p>
            </div>
        </section>
    );
};

export default ErrorSection;