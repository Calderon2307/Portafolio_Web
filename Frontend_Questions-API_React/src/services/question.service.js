import axios from "axios";

export const fetchPreguntas = async () => {

    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10');

        if (response.data.response_code === 0) {
            const preguntas = response.data.results.map(pre => {
                return castPregunta(pre);
            });
            return preguntas;
        }
        else if (response.data.response_code === 1) {
            throw new Error('Sin Resultados');
        }
        else if (response.data.response_code === 2) {
            throw new Error('Parametro invalido en URL');
        }
        else if (response.data.response_code === 3) {
            throw new Error('No se reconoce el TOKEN');
        }
        else if (response.data.response_code === 4) {
            throw new Error('El TOKEN esta vacio');
        } else {
            throw new Error('Error desconocido');
        }

    } catch (error) {
        alert(`Error: ${error}\n\nVuelve a intentarlo, si el error persiste, recarga la pagina.`);
        return [];
    }
};

export const castPregunta = (info) => {
    return {
        id: generarID(),
        pregunta: decodeText(info.question),
        resCorrecta: decodeText(info.correct_answer),
        todasRespuestas: info.incorrect_answers.concat(info.correct_answer).map(res => {
            return decodeText(res);
        }).sort(nuevoOrden),
        categoria: decodeText(info.category),
        dificultad: info.difficulty,
        tipo: info.type
    }
};

export const generarID = () => {

    let id = localStorage.getItem('ultimoID');

    if (id === null) {
        id = 1
    } else {
        id = parseInt(id) + 1;
    }

    localStorage.setItem('ultimoID', id);

    return id;
};

export const decodeText = (text) => {
    const div = document.createElement('div');
    div.innerHTML = text;
    let newText = div.textContent;

    return newText;
};

export const nuevoOrden = () => Math.random() - 0.5;

window.onload = localStorage.removeItem('ultimoID');