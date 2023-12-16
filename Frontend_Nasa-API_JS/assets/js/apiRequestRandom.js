// TODO...

let form = null;
let countDisplay = null;
let cardsContainer = null;
let existingFirstCard = null;
let loadingOverlay = null;
const baseUrl = "https://api.nasa.gov";
const API_KEY = "b74655YYlLNj6SW5XedAFKIPvqUt8ccYGVwJ6BTI";
let totalCount = 0;

const bindElements = () => {
    form = document.querySelector("#form");
    countDisplay = document.querySelector("#count");
    cardsContainer = document.querySelector("#container-cards");
    existingFirstCard = cardsContainer.querySelector(".first-card");
    loadingOverlay = document.getElementById("loading-overlay");
};

const addEventListeners = () => {
    form.addEventListener("submit", function (event) {
        event.preventDefault();   // Avoid page reload
        loading(false);           // Show a loading overlay
        getData();                // Fetch data from API
    });
};

const loading = (complete) => {
    if (complete) {
        loadingOverlay.style.display = "none";
    }
    else {
        loadingOverlay.style.display = "flex";
    }
};

const getData = async () => {

    const queryParams = new URLSearchParams();

    queryParams.append("api_key", API_KEY);
    queryParams.append("count", "1");
    queryParams.append("thumbs", "true");

    const urlWithParams = `${baseUrl}/planetary/apod?${queryParams.toString()}`;

    try {

        const response = await fetch(urlWithParams);

        if (response.ok) {
            const data = await response.json(); // Parse the response as JSON
            loading(true);                      // Hide the loading overlay
            displayData(data[0]);               // Display the data on the card

        } else if (response.status === 400 || response.status === 404) {

            // Throws an error with the API's error message.
            const errorData = await response.json();
            throw new Error(`The request was not successful: ${errorData.msg}`);

        } else {

            // Throws a general error 
            throw new Error(`The request was not successful`);
        }
    } catch (error) {

        loading(true);                              // Hide the loading overlay
        showErrorAlert(error);                      // Display an error using a function declared later
        console.error("An error occurred:", error); // Show the error in the console
    }
};

const displayData = ({ date, explanation, media_type, title, url, thumbnail_url }) => {

    const mediaURL = media_type === "image" ? url : thumbnail_url;
    const encodedExplanation = encodeURIComponent(explanation);

    const newCardHTML = `
        <li class="card">
            <div class="card__content">
            <h3 class="card__title">
                <a href="description.html?date=${date}&explanation=${encodedExplanation}&title=${title}&mediaURL=${mediaURL}" class="card__link">
                ${title}
                </a>
            </h3>
            <time class="card__date">${date}</time>
            </div>
            <img class="card__img" src="${mediaURL}" alt="${title}" />
        </li>
    `;

    // If it's the first element, remove the default card
    if (totalCount == 0) {
        cardsContainer.removeChild(existingFirstCard);
    }

    // Add the new element to the beginning of the list
    cardsContainer.insertAdjacentHTML("afterbegin", newCardHTML);

    // Increment the count and update the display
    totalCount++;
    countDisplay.textContent = totalCount;
};

const showErrorAlert = (msg) => {
    alert(msg || "An unexpected error occurred");
};

const main = () => {
    bindElements();
    addEventListeners();
}

window.onload = main;