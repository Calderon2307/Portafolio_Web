import { useState, useEffect } from 'react';
import style from './App.module.css';
import { fetchPreguntas } from './services/question.service';
import Header from './components/Header/Header';
import SectionButton from './components/StartSection/SectionButton';
import QuestionSection from './components/QuestionsSection/QuestionSection';
import AllQuestionsSection from './components/AllQuestionsSection/AllQuestionsSection';



const App = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [resSeleccionada, setResSeleccionada] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  const obtenerPreguntas = async () => {
    setIsLoading(true);
    const info = await fetchPreguntas();
    setIsLoading(false);
    setAllQuestions((prevQuestions) => [...prevQuestions, ...info]);
    const respuestasIniciales = info.map(preg => ({
      id: preg.id,
      correcta: preg.resCorrecta,
    }))
    setResSeleccionada(prevRes => [...prevRes, ...respuestasIniciales]);
  };

  useEffect(() => {
    setSelectedId(allQuestions.length > 0 ? preguntaActual + 1 : null);
  }, [preguntaActual, allQuestions]);

  const prevQuestion = () => {
    setPreguntaActual((prevPreguntaActual) => prevPreguntaActual === 0 ? prevPreguntaActual : prevPreguntaActual - 1);
  }

  const nextQuestion = () => {
    if (preguntaActual == (allQuestions.length - 1)) {
      let finish = confirm('¿Do you want to end de questionnaire?');
      if (finish === true) setPreguntaActual((prevPreguntaActual) => prevPreguntaActual + 1);
      else return;
    }
    else setPreguntaActual((prevPreguntaActual) => prevPreguntaActual + 1);
  }

  return (
    <>
      <Header />
      <SectionButton onQuestion={obtenerPreguntas} />
      {isLoading && (<div className={`${style.loadingContainer}`}>
        <figure className={`${style.loading}`}>
          <img src='/src/assets/loading.gif' alt='loading' />
        </figure>
      </div>)}
      {
        preguntaActual < allQuestions.length ? (
          <>
            <div className={`${style.totalQuestions}`}>
              <p>Pregunta Actual</p>
              <p>{allQuestions.length !== 0 ? preguntaActual + 1 : 0} / {allQuestions.length}</p>
            </div>
            <QuestionSection
              info={allQuestions[preguntaActual]}
              userSelect={resSeleccionada[preguntaActual]}
              prev={prevQuestion}
              next={nextQuestion}
              correct={setCorrectas}
            />
            <AllQuestionsSection
              info={allQuestions}
              navigate={setPreguntaActual}
              selectedId={selectedId}
            />
          </>
        ) : (
          <div className={`${style.score}`}>
            <p>Respuestas Correctas</p>
            <p>{correctas} / {allQuestions.length}</p>
          </div>
        )
      }
    </>
  )
};

export default App;
