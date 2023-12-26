import style from './QuestionCard.module.css';
import Propiedades from './Propiedades/Propiedades';
import PreguntaRespuesta from './PreguntaRespuestas/PreguntaRespuestas';
import { useState } from 'react';

const QuestionCard = ({ cardInfo = {}, correct, userSelect }) => {
    const [respondida, setRespondida] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const manejoRespuesta = (isCorrect) => {
        if (isCorrect) {
            setShowResult(true);
        } else {
            setShowResult(false);
        }
        setRespondida(true);
    };

    return (
        <article
            className={`${style.card}`}
            data-idquestion={cardInfo.id}
        >
            <Propiedades pregProps={cardInfo} />
            <PreguntaRespuesta
                pregInfo={cardInfo}
                onRespuestaClick={manejoRespuesta}
                userSelect={userSelect}
                correct={correct}
            />
            {
                respondida && (showResult ?
                    (
                        <>
                            <p className={`${style.correct} ${style.calificacion}`}>CORRECT!</p>
                        </>
                    )
                    :
                    (
                        <>
                            <p className={`${style.incorrect} ${style.calificacion}`}>INCORRECT!</p>
                            <p className={`${style.correctAnswer}`}>The correct answer is: <span className={`${style.correct}`}>{cardInfo.resCorrecta}</span></p>
                        </>
                    ))
            }
            <div className={`${style.questionNumber}`}>
                <p className={`${style.number}`}>
                    {cardInfo.id}
                </p>
            </div>
        </article>
    );
};

export default QuestionCard;
