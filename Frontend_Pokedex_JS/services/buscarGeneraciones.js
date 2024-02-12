let formSection = null;
let pokeSection = null;
let regionInfo = null;
let btnLimpiar = null;
let botonesGeneraciones = null;
let loading = null;
let btnNext = document.createElement('button');
let btnPrev = document.createElement('button');
const buttonContanier = document.createElement('div');
const regionImage = document.createElement('div');
let pokeArray = [];
let genCount = 0;

const elementos = () => {
    formSection = document.querySelector('section.form');
    pokeSection = document.querySelector('section.poke-show');
    regionInfo = document.querySelector('section.region-info');
    btnLimpiar = document.querySelector('button.limpiarPantalla');
    botonesGeneraciones = document.querySelectorAll('button.button.btn-g');
    loading = document.querySelector('figure.loading-container');
};

const eventos = () => {

    botonesGeneraciones.forEach(boton => {
        boton.addEventListener("click", async () => {

            if (boton.textContent === "Kanto") {

                genCount = 1;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("151", "0");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("kanto");

                almacenarDatosLS(pokeArray, genCount, "kanto");
            }

            if (boton.textContent === "Johto") {

                genCount = 2;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("100", "151");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("johto");

                almacenarDatosLS(pokeArray, genCount, "johto");
            }

            if (boton.textContent === "Hoenn") {

                genCount = 3;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("135", "251");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("hoenn");

                almacenarDatosLS(pokeArray, genCount, "hoenn");
            }

            if (boton.textContent === "Sinnoh") {

                genCount = 4;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("108", "386");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("sinnoh");

                almacenarDatosLS(pokeArray, genCount, "sinnoh");
            }

            if (boton.textContent === "Unova" || boton.textContent === "Teselia") {

                genCount = 5;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("155", "494");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("unova");

                almacenarDatosLS(pokeArray, genCount, "unova");
            }

            if (boton.textContent === "Kalos") {

                genCount = 6;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("72", "649");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("kalos");

                almacenarDatosLS(pokeArray, genCount, "kalos");
            }

            if (boton.textContent === "Alola") {

                genCount = 7;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("88", "721");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("alola");

                almacenarDatosLS(pokeArray, genCount, "alola");
            }

            if (boton.textContent === "Galar") {

                genCount = 8;

                loadingHandler(true);
                const _info = await fetchPokemonGroup("96", "809");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("galar");

                almacenarDatosLS(pokeArray, genCount, "galar");
            }

            if (boton.textContent === "Paldea") {

                genCount = 9;

                alert('Es una generacion nueva, por lo que pueden faltar algunos pokemones.');

                loadingHandler(true);
                const _info = await fetchPokemonGroup("120", "905");
                loadingHandler(false);

                pokeArray = [..._info];

                renderPokemon("paldea");

                almacenarDatosLS(pokeArray, genCount, "paldea");
            }
        });
    });

    btnNext.addEventListener("click", async e => {

        genCount += 1;

        if (genCount === 2) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("100", "151");
            loadingHandler(false);

            pokeArray = [..._info];


            renderPokemon("johto");

            almacenarDatosLS(pokeArray, genCount, "johto");

        }

        if (genCount === 3) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("135", "251");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("hoenn");

            almacenarDatosLS(pokeArray, genCount, "hoenn");

        }

        if (genCount === 4) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("108", "386");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("sinnoh");

            almacenarDatosLS(pokeArray, genCount, "sinnoh");

        }

        if (genCount === 5) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("155", "494");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("unova");

            almacenarDatosLS(pokeArray, genCount, "unova");

        }

        if (genCount === 6) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("72", "649");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("kalos");

            almacenarDatosLS(pokeArray, genCount, "kalos");

        }

        if (genCount === 7) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("88", "721");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("alola");

            almacenarDatosLS(pokeArray, genCount, "alola");

        }

        if (genCount === 8) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("96", "809");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("galar");

            almacenarDatosLS(pokeArray, genCount, "galar");

        }

        if (genCount === 9) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("118", "905");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("paldea");

            almacenarDatosLS(pokeArray, genCount, "paldea");

        }
    });

    btnPrev.addEventListener("click", async e => {

        genCount -= 1;

        if (genCount === 1) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("151", "0");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("kanto");

            almacenarDatosLS(pokeArray, genCount, "kanto");

        }

        if (genCount === 2) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("100", "151");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("johto");

            almacenarDatosLS(pokeArray, genCount, "johto");

        }

        if (genCount === 3) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("135", "251");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("hoenn");

            almacenarDatosLS(pokeArray, genCount, "hoenn");

        }

        if (genCount === 4) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("108", "386");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("sinnoh");

            almacenarDatosLS(pokeArray, genCount, "sinnoh");

        }

        if (genCount === 5) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("155", "494");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("unova");

            almacenarDatosLS(pokeArray, genCount, "unova");

        }

        if (genCount === 6) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("72", "649");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("kalos");

            almacenarDatosLS(pokeArray, genCount, "kalos");

        }

        if (genCount === 7) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("88", "721");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("alola");

            almacenarDatosLS(pokeArray, genCount, "alola");

        }

        if (genCount === 8) {

            loadingHandler(true);
            goOnTop();
            const _info = await fetchPokemonGroup("96", "809");
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon("galar");

            almacenarDatosLS(pokeArray, genCount, "galar");

        }
    });

    pokeSection.addEventListener("click", e => {
        /* console.log(e.target); */
    });

    btnLimpiar.addEventListener("click", e => {
        pokeArray = [];
        renderPokemon();
        buttonContanier.removeChild(btnPrev);
        buttonContanier.removeChild(btnNext);
        regionInfo.removeChild(regionImage);
        localStorage.removeItem('PokesGeneraciones');
        localStorage.removeItem('PokesGeneracionesNombreRegion');
        localStorage.removeItem('PokesGeneracionesNumRegion');
    });

};

const fetchPokemonGroup = async (limit, offset) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        if (response.ok) {

            const data = await response.json();

            if (genCount < 9) {
                btnNext.style.display = 'block';

                if (genCount === 1) {
                    btnNext.textContent = 'Johto';
                    btnNext.classList.add('btn');
                }

                if (genCount === 2) {
                    btnNext.textContent = 'Hoenn';
                    btnNext.classList.add('btn');
                }

                if (genCount === 3) {
                    btnNext.textContent = 'Sinnoh';
                    btnNext.classList.add('btn');
                }

                if (genCount === 4) {
                    btnNext.textContent = 'Unova';
                    btnNext.classList.add('btn');
                }

                if (genCount === 5) {
                    btnNext.textContent = 'Kalos';
                    btnNext.classList.add('btn');
                }

                if (genCount === 6) {
                    btnNext.textContent = 'Alola';
                    btnNext.classList.add('btn');
                }

                if (genCount === 7) {
                    btnNext.textContent = 'Galar';
                    btnNext.classList.add('btn');
                }

                if (genCount === 8) {
                    btnNext.textContent = 'Paldea';
                    btnNext.classList.add('btn');
                }
            } else {
                btnNext.style.display = 'none';
            }

            if (genCount > 1) {

                btnPrev.style.display = 'block'

                if (genCount === 2) {
                    btnPrev.textContent = 'Kanto';
                    btnPrev.classList.add('btn');
                }

                if (genCount === 3) {
                    btnPrev.textContent = 'Johto';
                    btnPrev.classList.add('btn');
                }

                if (genCount === 4) {
                    btnPrev.textContent = 'Hoenn';
                    btnPrev.classList.add('btn');
                }

                if (genCount === 5) {
                    btnPrev.textContent = 'Sinnoh';
                    btnPrev.classList.add('btn');
                }

                if (genCount === 6) {
                    btnPrev.textContent = 'Unova';
                    btnPrev.classList.add('btn');
                }

                if (genCount === 7) {
                    btnPrev.textContent = 'Kalos';
                    btnPrev.classList.add('btn');
                }

                if (genCount === 8) {
                    btnPrev.textContent = 'Alola';
                    btnPrev.classList.add('btn');
                }

                if (genCount === 9) {
                    btnPrev.textContent = 'Galar';
                    btnPrev.classList.add('btn');
                }
            } else {
                btnPrev.style.display = 'none';
            }

            const _pokesPromises = data.results.map(poke => fetchSinglePokemon(poke.url));
            const _pokesResolves = await Promise.all(_pokesPromises);
            return _pokesResolves;
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

const fetchSinglePokemon = async (_info) => {
    try {
        const response = await fetch(_info);
        if (response.ok) {
            const data = await response.json();
            const _infoCast = castInfo(data);
            return _infoCast;
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

const crearBotones = (_info) => {
    if (!_info.url) {
        return '';
    }
    else {
        return `
            <button class="btn" data-url="${_info.url}">${_info.name}</button>
        `;
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

const renderPokemon = (region) => {

    pokeSection.innerHTML = "";

    regionImage.classList.remove('kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea');
    regionImage.classList.add('region-container', region);
    regionImage.innerHTML = `<h3 class="region-name">${region}</h3>`;

    regionInfo.appendChild(regionImage);

    pokeArray.forEach(pokemon => {
        pokeSection.appendChild(crearCard(pokemon));
    });


    buttonContanier.classList.add('btn-container');
    buttonContanier.innerHTML = "";

    buttonContanier.appendChild(btnPrev);

    buttonContanier.appendChild(btnNext);

    pokeSection.appendChild(buttonContanier);

};

const obtenerDatosLS = () => {
    const pokeDataLS = localStorage.getItem('PokesGeneraciones');
    const numRegionLS = localStorage.getItem('PokesGeneracionesNumRegion');
    const nombreRegionLS = localStorage.getItem('PokesGeneracionesNombreRegion');
    let pokeDataRestaurada, numRegionRestaurado, nombreRegionRestaurado;

    if (pokeDataLS) {
        pokeDataRestaurada = JSON.parse(pokeDataLS);
        numRegionRestaurado = JSON.parse(numRegionLS);
        nombreRegionRestaurado = JSON.parse(nombreRegionLS);

        pokeArray = [...pokeDataRestaurada];

        genCount = numRegionRestaurado;

        if (genCount < 9) {
            btnNext.style.display = 'block';

            if (genCount === 1) {
                btnNext.textContent = 'Johto';
                btnNext.classList.add('btn');
            }

            if (genCount === 2) {
                btnNext.textContent = 'Hoenn';
                btnNext.classList.add('btn');
            }

            if (genCount === 3) {
                btnNext.textContent = 'Sinnoh';
                btnNext.classList.add('btn');
            }

            if (genCount === 4) {
                btnNext.textContent = 'Unova';
                btnNext.classList.add('btn');
            }

            if (genCount === 5) {
                btnNext.textContent = 'Kalos';
                btnNext.classList.add('btn');
            }

            if (genCount === 6) {
                btnNext.textContent = 'Alola';
                btnNext.classList.add('btn');
            }

            if (genCount === 7) {
                btnNext.textContent = 'Galar';
                btnNext.classList.add('btn');
            }

            if (genCount === 8) {
                btnNext.textContent = 'Paldea';
                btnNext.classList.add('btn');
            }
        } else {
            btnNext.style.display = 'none';
        }

        if (genCount > 1) {

            btnPrev.style.display = 'block'

            if (genCount === 2) {
                btnPrev.textContent = 'Kanto';
                btnPrev.classList.add('btn');
            }

            if (genCount === 3) {
                btnPrev.textContent = 'Johto';
                btnPrev.classList.add('btn');
            }

            if (genCount === 4) {
                btnPrev.textContent = 'Hoenn';
                btnPrev.classList.add('btn');
            }

            if (genCount === 5) {
                btnPrev.textContent = 'Sinnoh';
                btnPrev.classList.add('btn');
            }

            if (genCount === 6) {
                btnPrev.textContent = 'Unova';
                btnPrev.classList.add('btn');
            }

            if (genCount === 7) {
                btnPrev.textContent = 'Kalos';
                btnPrev.classList.add('btn');
            }

            if (genCount === 8) {
                btnPrev.textContent = 'Alola';
                btnPrev.classList.add('btn');
            }

            if (genCount === 9) {
                btnPrev.textContent = 'Galar';
                btnPrev.classList.add('btn');
            }
        } else {
            btnPrev.style.display = 'none';
        }

        renderPokemon(nombreRegionRestaurado);
    }

};

const almacenarDatosLS = (arrayPokes, numRegion, nombreRegion) => {
    localStorage.setItem('PokesGeneraciones', JSON.stringify(arrayPokes));
    localStorage.setItem('PokesGeneracionesNombreRegion', JSON.stringify(nombreRegion));
    localStorage.setItem('PokesGeneracionesNumRegion', JSON.stringify(numRegion));
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

const goOnTop = () => {
    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );
};

const main = () => {
    elementos();
    eventos();
    obtenerDatosLS();
};

window.onload = main;