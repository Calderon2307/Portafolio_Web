import { useEffect, useState } from 'react';
import style from './PreguntaRespuestas.module.css';

const PreguntaRespuesta = ({ pregInfo = {}, onRespuestaClick, userSelect, correct }) => {
    const [respondida, setRespondida] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const manejoRespuestaClick = (respuesta) => {
        if (!respondida) {
            setSelectedAnswer(respuesta);
            setRespondida(true);

            const isCorrect = respuesta === pregInfo.resCorrecta;
            userSelect.userResponse = respuesta;
            onRespuestaClick(isCorrect);

            if (isCorrect) {
                setShowResult(true);
                correct(prevCorrect => prevCorrect + 1);
            } else {
                setShowResult(false);
            }
        }
    };

    useEffect(() => {
        if (userSelect.userResponse) {
            setRespondida(true);
            const isCorrect = userSelect.userResponse === pregInfo.resCorrecta;
            onRespuestaClick(isCorrect);
            if (isCorrect) {
                setShowResult(true);
            } else {
                setShowResult(false);
            }
        }
    }), [respondida, showResult];

    return (
        <div className={`${style.question_container}`}>
            <p className={`${style.pregunta}`}>{pregInfo.pregunta}</p>
            <section className={`${style.respuestas_container}`}>
                {pregInfo.todasRespuestas.map((data, index) => (
                    <button
                        key={index}
                        type='button'
                        className={`${style.respuesta} ${respondida && (selectedAnswer === data || userSelect.userResponse === data)
                            ? showResult
                                ? style.correct
                                : style.incorrect
                            : ''
                            }`}
                        onClick={() => manejoRespuestaClick(data)}
                    >
                        {data}
                    </button>
                ))}
            </section>
        </div>
    );
};

export default PreguntaRespuesta;
