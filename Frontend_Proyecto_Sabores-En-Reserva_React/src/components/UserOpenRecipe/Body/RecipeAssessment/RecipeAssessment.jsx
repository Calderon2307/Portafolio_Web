import { useState } from 'react';
import style from './RecipeAssessment.module.css';
import { TbChefHat } from "react-icons/tb";

const RecipeAssessment = ({ rating, onRatingSubmit }) => {

    const [valoracion, setValoracion] = useState(0);

    const handleValorar = (valor) => {
        setValoracion(valor);
        onRatingSubmit(valor);
    };
    return (
        <section className={`${style.section}`}>
            {rating !== null ? (
                <>
                    <h2 className={`${style.title}`}>
                        Valora la Receta
                    </h2>
                    <p className={`${style.qualified}`}>Has calificado esta receta con {rating} <TbChefHat />.</p>
                </>
            ) : (
                <>
                    <h2 className={`${style.title}`}>
                        Valora la Receta
                    </h2>
                    <div className={`${style.hatsContainer}`}>
                        {[1, 2, 3, 4, 5].map((valor) => (
                            <TbChefHat
                                key={valor}
                                className={`${style.icon} ${valor <= valoracion ? style.iconQualified : ''}`}
                                onClick={() => handleValorar(valor)}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default RecipeAssessment;