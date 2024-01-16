import style from './RecipeStats.module.css';

const RecipeStats = () => {

    return (
        <div className={`${style.container}`}>
            <div className={`${style.stat}`}>
                <p className={`${style.title}`}>
                    Comensales
                </p>
                <p className={`${style.value}`}>
                    ##
                </p>
            </div>
            <div className={`${style.stat}`}>
                <p className={`${style.title}`}>
                    Tiempo
                </p>
                <p className={`${style.value}`}>
                    ##
                </p>
            </div>
            <div className={`${style.stat}`}>
                <p className={`${style.title}`}>
                    Precio Estimado
                </p>
                <p className={`${style.value}`}>
                    ##
                </p>
            </div>
        </div>
    );
};

export default RecipeStats;