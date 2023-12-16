// TODO...

let cardsContainer = null;

const bindElements = () => {
    cardsContainer = document.querySelector("#container-cards");
};

const renderDataFromURLParameters = () => {

    const url = new URL(window.location.href);

    const title = url.searchParams.get("title");
    const date = url.searchParams.get("date");
    const mediaURL = url.searchParams.get("mediaURL");
    const explanation = url.searchParams.get("explanation");

    cardsContainer.innerHTML = `
        <div class="description__image">
            <div class="card__content">
            <h3 class="card__title">
                ${title}
            </h3>
            <time class="card__date">${date}</time>
            </div>
            <img class="card__img" src="${mediaURL}" alt="${title}" />
        </div>
        <div class="description__content">
            <p>${explanation}</p>
        </div>
    `;
};

const main = () => {
    bindElements();
    renderDataFromURLParameters();
}

window.onload = main;