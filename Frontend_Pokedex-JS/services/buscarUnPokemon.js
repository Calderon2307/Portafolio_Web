let form = null;
let section = null;
let btnLimpiar = null;
let loading = null;
let pokeArray = [];

const elementos = () => {
    form = document.querySelector('form.form');
    pokeSection = document.querySelector('section.poke-show');
    btnLimpiar = document.querySelector('button.limpiarPantalla');
    loading = document.querySelector('figure.loading-container');
};

const eventos = () => {
    form.addEventListener("submit", async e => {
        e.preventDefault();

        const pokemon = new FormData(form).get('pokemonName').toLowerCase();

        if (!pokemon) {
            alert('No has escrito nada');
            return;
        }

        loadingHandler(true);
        const _pokemon = await buscarPokemon(pokemon);
        loadingHandler(false);

        if (!_pokemon) {
            form.reset();
            return;
        }

        pokeArray.unshift(_pokemon);

        renderPokemon();

        form.reset();

        localStorage.setItem('PokeIndividual', JSON.stringify(pokeArray));

        /* console.log(_pokemon); */
    });

    /* section.addEventListener("click", e => {
        console.log(e.target);
    }); */

    btnLimpiar.addEventListener("click", e => {
        pokeArray = [];
        renderPokemon();
        localStorage.removeItem('PokeIndividual');
    });
};

const buscarPokemon = async (pokemon) => {

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (response.ok) {
            const data = await response.json();
            const pokeCast = castInfo(data);
            console.log(pokeCast);
            return pokeCast;
        }

        switch (response.status) {
            case 404:
                alert("No lo encontré!");
                break;
            default:
                alert("No se que pasó :c");
        }

    } catch (error) {
        console.error(error);
    }

};

const fetchInfoSpeciesPokemon = async (urlSpecies, name) => {
    try {
        const response = await fetch(urlSpecies);
        if (response.ok) {
            const data = await response.json();
            if (name) {
                const spanishName = data.names.find(name => name.language.name === 'es');
                if (spanishName) {
                    return Promise.resolve(spanishName.name.toUpperCase());
                } else return Promise.resolve(null);
            } else {
                const nameMeaning = data.genera.find(des => des.language.name === 'es') || data.genera.find(des => des.language.name === 'en');
                console.log(nameMeaning.genus);
                if (nameMeaning) {
                    return Promise.resolve(nameMeaning.genus);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const castInfo = async (pokemon) => {
    try {
        const name = await fetchInfoSpeciesPokemon(pokemon.species.url, true) ?? pokemon.name
        const meaning = await fetchInfoSpeciesPokemon(pokemon.species.url, false) ?? 'No meaning yet';

        return {
            nombre: name.replace('-', ' '),
            significado: meaning,
            pokedex: pokemon.id,
            sprite: pokemon.sprites.other.home.front_default ?? "https://plantillasdememes.com/img/plantillas/pikachu-confundidosorprendidosonriendo2.jpg",
            shiny: pokemon.sprites.other.home.front_shiny ?? "https://plantillasdememes.com/img/plantillas/pikachu-confundidosorprendidosonriendo2.jpg",
            tipos: pokemon.types.map(t => {
                return t.type.name;
            }),
            estadisticas: pokemon.stats.map(s => {
                return {
                    nombre: s.stat.name,
                    valor: s.base_stat,
                }
            }),
            altura: pokemon.height,
            peso: pokemon.weight,
        };

    } catch (error) {
        console.error(error);
    }
};

const getColorFromType = (type) => {
    let _colors = {
        "normal": "#212121",
        "fighting": "#c62828",
        "flying": "#0277bd",
        "poison": "#6a1b9a",
        "ground": "#3e2723",
        "rock": "#616161",
        "bug": "#827717",
        "ghost": "#12005e",
        "steel": "#37474f",
        "fire": "#bf360c",
        "water": "#1a237e",
        "grass": "#1b5e20",
        "electric": "#fbc02d",
        "psychic": "#c2185b",
        "ice": "#4fc3f7",
        "dragon": "#0d47a1",
        "dark": "#000000",
        "fairy": "#9e00c5"
    }

    return _colors[type] || "#263859";
}

const crearCard = (pokemon) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.setAttribute("data-idPokemon", pokemon.pokedex);

    // let castTipos = pokemon.tipos.map(tipo => {
    //     let div = document.createElement('div');
    //     div.classList.add('tipo');
    //     div.style.backgroundColor = getColorFromType(tipo);
    //     div.textContent = tipo.toUpperCase();
    //     return div;
    // });

    // let tipos = castTipos.map(div => div.outerHTML);

    let tipos = pokemon.tipos.map(tipo => {
        return `<div class="tipo ${tipo}">${tipo.toUpperCase()}</div>`;
    });

    let stats = pokemon.estadisticas.map(stat => {

        let name;
        if (stat.nombre == "hp") name = "HTP";
        else if (stat.nombre == "attack") name = "ATK";
        else if (stat.nombre == "defense") name = "DEF";
        else if (stat.nombre == "special-attack") name = "SPA";
        else if (stat.nombre == "special-defense") name = "SDF";
        else if (stat.nombre == "speed") name = "SPD";

        let rango;
        if (stat.valor <= 80) rango = "low";
        else if (stat.valor > 80 && stat.valor < 150) rango = "medium";
        else rango = "high";

        return `
        <section class="stat">
            <h4 class="stat-name">${name}:</h4>
            <p class="stat-limit">0</p>
            <div class="bar-container">
                <div class="bar ${rango}" style="width: ${stat.valor}px">
                    <p class="stat-value">${stat.valor}</p>
                </div>
            </div>
            <p class="stat-limit">255</p>
        </section>
        `;
    });

    let totalStats = pokemon.estadisticas.map(stat => {
        return stat.valor
    }).reduce((acumulador, valorActual) => acumulador + valorActual, 0);

    card.innerHTML = `
    <div class="card-inner">
    <section class="card-front">
        <div class="pokeImg">
            <figure class="sprite">
                <img ${pokemon.sprite === "https://plantillasdememes.com/img/plantillas/pikachu-confundidosorprendidosonriendo2.jpg" ? "class='rounded'" : ''} src="${pokemon.sprite}" alt="${pokemon.nombre}-Sprite">
            </figure>
            <figure class="sprite shiny">
                <img ${pokemon.shiny === "https://plantillasdememes.com/img/plantillas/pikachu-confundidosorprendidosonriendo2.jpg" ? "class='rounded'" : ''} src="${pokemon.shiny}" alt="${pokemon.nombre}-Shiny">
            </figure>
        </div>
        <div class="pokeInfo">
            <div class="nombrePoke"><p>${pokemon.nombre} - ${pokemon.pokedex}</p></div>
            <div class="nombrePoke italic"><p>" ${pokemon.significado} "</p></div>
            <div class="nombrePoke"><p>Altura: ${pokemon.altura / 10}m --- Peso: ${pokemon.peso / 10}kg</p></div>
            <div class="types">
                ${tipos.join('')}
            </div>
        </div>
    </section>
    <section class="card-back">
        <div class="pokeImg">
            <img class="small ${pokemon.sprite === "https://plantillasdememes.com/img/plantillas/pikachu-confundidosorprendidosonriendo2.jpg" ? 'rounded' : ''}" src="${pokemon.sprite}" alt="${pokemon.nombre}-Sprite" title="${pokemon.nombre}">
            <img class="small shiny ${pokemon.shiny === "https://plantillasdememes.com/img/plantillas/pikachu-confundidosorprendidosonriendo2.jpg" ? 'rounded' : ''}" src="${pokemon.shiny}" alt="${pokemon.nombre}-Sprite" title="${pokemon.nombre} SHINY">
        </div>
        <h3 class="stats-title">${pokemon.nombre} - STATS</h3>
        <article class="stats-container">
            ${stats.join('')}
        </article>
        <p class="total-stats">Total Stats: ${totalStats}</p>
    </section>
    </div>
    `;

    return card;
};

const renderPokemon = () => {

    pokeSection.innerHTML = "";

    pokeArray.forEach(pokemon => {
        pokeSection.appendChild(crearCard(pokemon));
    });

};

const obtenerDatosLS = () => {
    const dataLS = localStorage.getItem('PokeIndividual');
    let dataRestaurada;
    if (dataLS) {
        dataRestaurada = JSON.parse(dataLS);
    }
    pokeArray = [...dataRestaurada];
    renderPokemon();
};

const loadingHandler = (show) => {
    if (show) {
        loading.style.display = 'block';
        loading.style.zIndex = 100;
        document.body.style.overflow = 'hidden';
    }
    else {
        loading.style.display = 'none';
        document.body.style.overflow = 'visible';
    }
};

const main = () => {
    elementos();
    eventos();
    obtenerDatosLS();
};

window.onload = main;