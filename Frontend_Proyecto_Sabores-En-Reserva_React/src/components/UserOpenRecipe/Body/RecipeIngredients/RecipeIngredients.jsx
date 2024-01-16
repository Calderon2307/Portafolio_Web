import style from './RecipeIngredients.module.css';

const RecipeIngredients = () => {

    return (
        <section className={`${style.section}`}>
            <h2 className={`${style.title}`}>
                Ingredientes
            </h2>
            <div className={`${style.ingredientContainer}`}>
                <p className={`${style.ingredientName}`}>
                    Lechuga
                </p>
                <p className={`${style.ingredientAmount}`}>
                    1u
                </p>
            </div>
            <div className={`${style.ingredientContainer}`}>
                <p className={`${style.ingredientName}`}>
                    Lechuga
                </p>
                <p className={`${style.ingredientAmount}`}>
                    1u
                </p>
            </div>
            <div className={`${style.ingredientContainer}`}>
                <p className={`${style.ingredientName}`}>
                    Lechuga
                </p>
                <p className={`${style.ingredientAmount}`}>
                    1u
                </p>
            </div>
            <div className={`${style.ingredientContainer}`}>
                <p className={`${style.ingredientName}`}>
                    Lechuga
                </p>
                <p className={`${style.ingredientAmount}`}>
                    1u
                </p>
            </div>
        </section>
    );
};

export default RecipeIngredients;