let form = null;
let section = null;
let btnLimpiar = null;
let loading = null;
let pokeTeam = [];
let offset = null;
let limit = null;
let pokeArray = [];

const elementos = () => {
    form = document.querySelector('form.form');
    section = document.querySelector('section.poke-show');
    btnLimpiar = document.querySelector('button.limpiarPantalla');
    loading = document.querySelector('figure.loading-container');
};

const eventos = () => {
    form.addEventListener("submit", async e => {
        e.preventDefault();

        offset = new FormData(form).get("pokemonStart");
        limit = new FormData(form).get("pokemonEnd");

        if (!offset && !limit) {
            alert("Ingresa por lo menos un dato");
            return;
        }

        if (!limit) {
            limit = 1302;
        }

        if (limit && limit > 1302) {
            limit = 1302;
        }

        if (!offset) {
            offset = 0;
        }

        if (offset && offset > 0) {
            offset -= 1;
        }

        if (offset && offset < 0) {
            offset = 0;
        }

        if (limit <= offset) {
            alert("El numero de final es menor al numero de inicio!");
            form.reset();
            return;
        }

        if (limit || limit <= 1302) {
            limit = Math.abs(limit - offset);

            if (limit > 900) {
                alert('Son muchos Pokemones, porfavor reduce la lista');
                return
            }
        }

        loadingHandler(true);
        const _grupo = await buscarGrupoPokemon(limit, offset);
        loadingHandler(false);

        pokeArray = [..._grupo];

        renderPokemon();

        form.reset();

        localStorage.setItem('PokesGrupo', JSON.stringify(pokeArray));


    });

    /* section.addEventListener("click", e => {
        let pokeCardTeam = e.target;
        console.log(pokeCardTeam);
        team.appendChild(pokeCardTeam);
    }); */

    btnLimpiar.addEventListener("click", e => {
        pokeArray = [];
        renderPokemon();
        localStorage.removeItem('PokesGrupo');
    });
};

const buscarGrupoPokemon = async (cantidad, inicio) => {

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${inicio}`);
        if (response.ok) {
            const data = await response.json();
            const infoPokePromises = data.results.map(poke => buscarPokemon(poke.url));
            const infoPoke = await Promise.all(infoPokePromises);
            return infoPoke;
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

const buscarPokemon = async (rutaPokemon) => {
    try {
        let response = await fetch(rutaPokemon);

        if (response.ok) {
            let dataPoke = await response.json();
            let infoCast = castInfo(dataPoke);
            return infoCast;
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
                if (nameMeaning) {
                    return Promise.resolve(nameMeaning.genus);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const fetchInfoNumPokedex = async (pokeURL) => {
    try {
        const _info = await fetch(pokeURL);
        if (_info.ok) {
            const _data = await _info.json();
            return _data.id;
        } else {
            throw new Error('Error con la peticion');
        }
    } catch (error) {
        console.error(error);
    }
};

const castInfo = async (pokemon) => {
    try {
        const namesKeywords = ['mega', 'gmax', 'origin', 'alola', 'galar', 'therian', 'average', 'small', 'large', 'super', 'sensu', 'pom-pom', 'pau', 'baile'];

        let name = namesKeywords.some(keyword => pokemon.name.includes(keyword)) ? pokemon.name : await fetchInfoSpeciesPokemon(pokemon.species.url, 'name') ?? pokeInfo.name;
        const meaning = await fetchInfoSpeciesPokemon(pokemon.species.url, false) ?? 'No meaning yet';
        const pokedexNum = await fetchInfoNumPokedex(pokemon.species.url);

        return {
            nombre: name.replace('-', ' ').toUpperCase(),
            significado: meaning,
            pokedex: pokedexNum,
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
            showPokeID: pokemon.id,
        };

    } catch (error) {
        console.error(error);
    }
};

const crearCard = (pokemon) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.setAttribute("data-idPokemon", pokemon.showPokeID);
    card.addEventListener('click', () => {
        localStorage.setItem('showPokemon', card.getAttribute("data-idPokemon"));
    });

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
    <a href="/pages/showPokemon.html" class="card-inner">
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
    </a>
    `;

    return card;
};

const renderPokemon = () => {

    section.innerHTML = "";

    pokeArray.forEach(pokemon => {
        section.appendChild(crearCard(pokemon));
    });

};

const obtenerDatosLS = () => {
    const dataLS = localStorage.getItem('PokesGrupo');
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