const students = [
    { name: "Estudiante 1", grade: 95 },
    { name: "Estudiante 2", grade: 78 },
    { name: "Estudiante 3", grade: 60 },
    { name: "Estudiante 4", grade: 89 },
    { name: "Estudiante 5", grade: 45 }
];  

let calificaciones = [];

const ejercicioArrObjeto = () => {
    calificaciones = students.map((e) => {
        let letter;
        if(e.grade >= 90) letter = "A";
        else if (e.grade >= 80 && e.grade <= 89) letter = "B";
        else if (e.grade >= 70 && e.grade <= 79) letter = "C";
        else if (e.grade >= 60 && e.grade <= 69) letter = "D";
        else if (e.grade >= 0 && e.grade <= 59) letter = "F";
        return {...e, letterGrade: letter};
    });
};

const arr1 = [1, 2, 3, 4, 5];
let arrduplicado = [];

const ejercicio1 = () => {
    arrduplicado = arr1.map((e) => {
        return e*2;
    });
    console.log(arrduplicado);
}

const nombres = ['juan', 'maría', 'carlos', 'laura', 'pedro'];
const capitalizarNombres = [];

const ejercicio2 = () => {
    nombres.forEach((e) => {
        capitalizarNombres.push(e[0].toUpperCase().concat(e.slice(1)));
    });
    console.log(capitalizarNombres);
};

const celsiusTemperatures = [0, 10, 25, 30, 35];
const fahrenheitTemperatures = [];

const ejercicio3 = () => {
    celsiusTemperatures.forEach(e => {
        fahrenheitTemperatures.push(Math.round((e * 9/5) + 32));
    });
    console.log(fahrenheitTemperatures);
};

const calificaciones2 = [92, 78, 88, 94, 70, 89, 60, 72, 85];
const calificacionesLetras = [];

const ejercicio4 = () => {
    let letra;
    calificaciones2.forEach(e => {
        if(e >= 90) letra = "A";
        else if(e >= 80 && e <= 89) letra = "B";
        else if(e >= 70 && e <= 79) letra = "C";
        else if(e >= 60 && e <= 69) letra = "D";
        else if(e >= 0 && e <= 59) letra = "F";

        calificacionesLetras.push(letra);
    });
    console.log(calificacionesLetras);
};

const rectangulos = [
    { ancho: 5, alto: 10 },
    { ancho: 7, alto: 3 },
    { ancho: 2, alto: 8 },
    { ancho: 9, alto: 6 },
    { ancho: 4, alto: 5 },
];

const areas = [];

const ejercicio5 = () => {
    rectangulos.forEach(e => {
        areas.push({...e, area: e.alto * e.ancho});
    });

    console.log(areas);
} 

const nombres2 = ["Juan", "María", "Carlos", "Laura", "Pedro", "Ana"];
const nombresOrdenados = [];

const ejercicio6 = () => {
    nombres2.forEach((e, i) => {
        nombresOrdenados.push(e);
    });
    nombresOrdenados.sort();
    console.log(nombresOrdenados);
};

const main = () => {
    ejercicio1();
    ejercicio2();
    ejercicio3();
    ejercicio4();
    ejercicio5();
    ejercicio6();
};


window.onload = main;


