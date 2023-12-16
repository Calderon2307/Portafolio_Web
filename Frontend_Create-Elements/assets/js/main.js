const equiposFutbol = [
    {
        "id": "aB3cD5eF7gH9i",
        "nombre": "Real Madrid",
        "pais": "España",
        "entrenador": "Carlo Ancelotti",
        "estadio": "Santiago Bernabeu",
        "imagen": "https://assets.stickpng.com/images/584a9b47b080d7616d298778.png"
    },
    {
        "id": "jK2lM4nO6pQ8r",
        "nombre": "Bayern Munich",
        "pais": "Alemania",
        "entrenador": "Thomas Touchel",
        "estadio": "Allianz Arena",
        "imagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/2048px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"
    },
    {
        "id": "sT1uV3wX5yZ7",
        "nombre": "AS Roma",
        "pais": "Italia",
        "entrenador": "Jose Mourinho",
        "estadio": "Olimpico de Roma",
        "imagen": "https://assets.stickpng.com/images/584ab0a430d6736bca3d6e11.png"
    },
    {
        "id": "bD9eR1gT3iL5k",
        "nombre": "Barcelona",
        "pais": "España",
        "entrenador": "Xavi Hernandez",
        "estadio": "Camp Nou",
        "imagen": "https://emojiisland.com/cdn/shop/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_grande.png?v=1571606036"
    },
    {
        "id": "mN7oP9qS1tV3w",
        "nombre": "Manchester City",
        "pais": "Inglaterra",
        "entrenador": "Pep Guardiola",
        "estadio": "Etihad Stadium",
        "imagen": "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png"
    },
    {
        "id": "cJ4kL6mO8pQ0r",
        "nombre": "Liverpool",
        "pais": "Inglaterra",
        "entrenador": "Jurgen Klopp",
        "estadio": "Anfield",
        "imagen": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e5.png"
    },
    {
        "id": "oA2pB4qC6rD8s",
        "nombre": "Bayer Leverkusen",
        "pais": "Alemania",
        "entrenador": "Xavi Alonso",
        "estadio": "Bay Arena",
        "imagen": "https://assets.stickpng.com/images/584d8651367b6a13e54477d1.png"
    },
    {
        "id": "dE1fG3hI5jK7l",
        "nombre": "Atletico de Madrid",
        "pais": "España",
        "entrenador": "Cholo Simeone",
        "estadio": "Wanda Metropolitano",
        "imagen": "https://i.pinimg.com/736x/3b/f8/ae/3bf8aefe1389dd4225cdd53b8d5d9dbd.jpg"
    },
    {
        "id": "tU9vW1wX3yZ5a",
        "nombre": "Arsenal",
        "pais": "Inglaterra",
        "entrenador": "Mikel Arteta",
        "estadio": "Emirates Stadium",
        "imagen": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4df.png"
    },
    {
        "id": "gH2iJ4kL6mN8o",
        "nombre": "Borussia Dortmund",
        "pais": "Alemania",
        "entrenador": "Edin Terzic",
        "estadio": "Signal Iduna Park",
        "imagen": "https://upload.wikimedia.org/wikipedia/commons/7/74/Borussia_Dortmund.png"
    }
];


//Elementos
let cardsSection = null;
let createForm = null;

const bindElements = () => {
    cardsSection = document.querySelector(".cards");
    createForm = document.querySelector("form#create-form");
}

const bindListeners = () => {
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const infoForm = new FormData(createForm);
        let _infoForm = {};

        infoForm.forEach((value, key) => {
            _infoForm[key] = value;
        });

        equiposFutbol.unshift(_infoForm);

        //console.log(equiposFutbol);
        renderCards(equiposFutbol);
        createForm.reset();
    });
};

//Logica

const removeCard = (id) => {

    const cardsArray = Array.from(cardsSection.children);

    for (let card of cardsArray) {
        if (card.getAttribute("data-id") === id) {

            cardsSection.removeChild(card);

            const index = cardsArray.indexOf(card);
            equiposFutbol.splice(index, 1);

        }
    }


}

//generación de cards
const createCard = ({ id, nombre, pais, entrenador, estadio, imagen }) => {
    const card = document.createElement("article");

    card.classList.add("card");
    card.dataset["id"] = id;

    card.innerHTML = `
        <figure><img src="${imagen}" alt="Avatar"></figure>
        <h3>${nombre}</h3>
        <h3> Pais: <span class="email">${pais}</span> </h3>
        <h3> Entrenado: <span class="email">${entrenador}</span> </h3>
        <h3> Estadio: <span class="email">${estadio}</span> </h3>
        <div class="btn-container"><button> Aceptar </button><button onclick="removeCard('${id}')"> Eliminar </button></div>
    `;

    return card;
}

const renderCards = (cardsInfo = []) => {

    cardsSection.innerHTML = "";

    cardsInfo.forEach(cardInfo => {
        const card = createCard(cardInfo);
        cardsSection.appendChild(card);
    });


}

const main = () => {
    bindElements();
    bindListeners();
    renderCards(equiposFutbol);
}

window.onload = main;