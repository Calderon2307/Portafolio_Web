let btnFetch = null;
let sectionPreguntas = null;
let btnInicio = null;
let arrPreguntas = [];
let arrTodasPreguntas = [];
let score = null;
let correctAnswers = null;
let totalQuestions = null;
let correctCount = 0;
let loading = null;

const anclarElementos = () => {
    btnFetch = document.querySelector('div.btnSubmit');
    sectionPreguntas = document.querySelector('section.questionSection');
    btnInicio = document.querySelector('button.btn-regresarInicio');
    score = document.querySelector('section.score')
    correctAnswers = document.querySelector('span.correct-answers');
    totalQuestions = document.querySelector('span.total-questions');
    loading = document.querySelector('figure.loading');
};

const escuhaEventos = () => {

    btnFetch.addEventListener("click", async e => {
        loading.style.display = "block";

        //Obtiene las pregguntas ya casteadas de la peticion
        let _arrPreguntas = await triviaFetch();

        loading.style.display = "none";

        //Se borra lo que contenia antes el array que se utiliza para renderizar las cards
        arrPreguntas.length = 0;

        //Se agregan las nuevas preguntas al array para renderizar las cards
        arrPreguntas.push(..._arrPreguntas);

        //Se agregan las preguntas a un array que ira almacenando todas las preguntas que se pidan para luego buscarlas y comparar la respuesta correcta
        arrTodasPreguntas.push(...arrPreguntas);

        let preguntasRender = arrPreguntas.map(e => crearCard(e));

        if (arrPreguntas.length > 0) {
            btnInicio.style.display = "block";
            score.style.display = "block";
        }

        totalQuestions.textContent = arrTodasPreguntas.length;

        preguntasRender.forEach(e => {
            renderCards(e);
        });

    });

    sectionPreguntas.addEventListener("click", e => {
        if (e.target.tagName === 'INPUT') {
            //Div para anclar el resultado de la respuesta

            //Variable con el valor del atributo "vallue" del Input selcciondo
            let respuestaUsuario = e.target.value;
            //Variable con la card completa
            let cardPregunta = e.target.parentElement.parentElement.parentElement.parentElement;
            //Variable con el valor del atributo "data-idPregunta" de la card seleccionada
            let idPregunta = cardPregunta.getAttribute('data-idPregunta');
            //Variable con el div de la pregunta para poder concatenarle luego la calificacion de la pregunta
            let divPregunta = e.target.parentNode.parentNode.parentNode;

            let preguntaComp = {};

            //Busca la pregunta que coincida con el id de la card
            arrTodasPreguntas.forEach(e => {
                if (e.id == idPregunta) {
                    preguntaComp = { ...e };

                }
            });

            cardPregunta.classList.add('answered');

            //Muestra la calificacion
            if (preguntaComp.respuestaCorrecta === respuestaUsuario) {
                let calificacionP = document.createElement('p');
                calificacionP.classList.add('calificacion');
                calificacionP.classList.add('correct');
                calificacionP.textContent = 'CORRECTO!';
                correctCount += 1;
                correctAnswers.textContent = correctCount;
                divPregunta.appendChild(calificacionP);
            } else {
                let calificacionP = document.createElement('p');
                let resCorrecta = document.createElement('p');
                calificacionP.classList.add('calificacion');
                calificacionP.classList.add('incorrect');
                calificacionP.textContent = 'INCORRECTO!';
                resCorrecta.innerHTML = `The correct answer is: <span class="correct">${preguntaComp.respuestaCorrecta}</span>`;
                divPregunta.appendChild(calificacionP);
                divPregunta.appendChild(resCorrecta);
            }
        }
    });

    btnInicio.addEventListener("click", e => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

};

const triviaFetch = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        if (response.ok) {
            let dataTrivia = await response.json();
            switch (dataTrivia.response_code) {
                case 0:
                    let preguntas = dataTrivia.results.map(p => {
                        return {
                            id: generarID(),
                            pregunta: decodificarTexto(p.question),
                            respuestaCorrecta: decodificarTexto(p.correct_answer),
                            todasRespuestas: p.incorrect_answers.map(e => decodificarTexto(e)).concat(decodificarTexto(p.correct_answer)),
                            categoria: p.category,
                            dificultad: p.difficulty,
                            tipo: p.type
                        }
                    });
                    return preguntas;
                case 1:
                case 2:
                    throw new Error('Ocurrió un error y no se han podido recuperar resultados');
                    break;
                case 3:
                    throw new Error('No se ha encontrado el token.');
                    break;
                case 4:
                    throw new Error('No hay mas preguntas disponibles para el token, porfavor, reiniciarlo');
                    break;
                default:
                    throw new Error();
                    break;
            }
        }
    } catch (error) {
        alert(error);
    }
};

const crearCard = (arrQ) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.setAttribute('data-idPregunta', arrQ.id);

    const divDificultad = `<div class="dificultad ${arrQ.dificultad}">${arrQ.dificultad.toUpperCase()}</div>`;

    let _arrPreguntas = [];

    if (arrQ.tipo === 'multiple') {

        arrQ.todasRespuestas.sort(nuevoOrden);

        _arrPreguntas = arrQ.todasRespuestas.map(e => {
            return `<label class="respuesta"><input type="radio" name="response" value="${e}">${e.toUpperCase()}</label>`;
        });
    }
    else {
        arrQ.todasRespuestas.sort(nuevoOrden);

        _arrPreguntas = arrQ.todasRespuestas.map(e => {
            return `<label class="respuesta"><input type="radio" name="response" value="${e}">${e.toUpperCase()}</label>`;
        });
    }

    card.innerHTML = `
        <div class="info_container">
            <p class="categoria">${arrQ.categoria}</p>
            ${divDificultad}
        </div>
        <div class="question_container">
            <p class="pregunta">${arrQ.pregunta}</p>
            <form class="respuestas_container">
                ${_arrPreguntas.join(' ')}
            </form>
        </div>
    `;

    return card;
};

const renderCards = (card) => {

    sectionPreguntas.appendChild(card);

};

//Funcion para reordenar e array de las respuestas y que no se muestre siempre la correcta al final del array
const nuevoOrden = () => Math.random() - 0.5;

//Genera el ID de las cards
const generarID = () => {
    let id = localStorage.getItem('ultimoID');

    if (id === null) {
        id = 1;
    } else {
        id = parseInt(id) + 1;
    }

    localStorage.setItem('ultimoID', id);

    return id;
};

//Decodifica el texto que viene con codigos HTML
const decodificarTexto = (textoCodificado) => {
    const div = document.createElement('div');

    div.innerHTML = textoCodificado;

    return div.textContent;
};

const Main = () => {
    anclarElementos();
    escuhaEventos();
    localStorage.removeItem('ultimoID');
};

window.onload = Main;