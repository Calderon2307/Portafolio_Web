let buttonsTypes = null;
let pokeSection = null;
let titleType = null;
let btnLimpiar = null;
let typeInfo = null;
let loading = null;
let pokeArray = [];
let damageTypes = {};
let idType = 0;
let typeName = '';

const elementos = () => {
    buttonsTypes = document.querySelectorAll('button.button.btn-t');
    pokeSection = document.querySelector('section.poke-show');
    btnLimpiar = document.querySelector('button.limpiarPantalla');
    loading = document.querySelector('figure.loading-container');
    titleType = document.querySelector('section.types');
    typeInfo = document.querySelector('article.type-info');
};

const eventos = () => {

    buttonsTypes.forEach(button => {
        button.addEventListener('click', async () => {
            const idType = button.getAttribute('data-idType');

            loadingHandler(true);
            const _info = await fetchPokemonGroup(idType);
            loadingHandler(false);

            pokeArray = [..._info];

            renderPokemon(true);

            almacenarDatosLS(pokeArray, typeName, damageTypes);
        })
    });

    btnLimpiar.addEventListener("click", e => {
        pokeArray = [];
        titleType.innerHTML = '';
        typeInfo.innerHTML = '';
        renderPokemon(false);
        localStorage.removeItem('PokeTypes');
        localStorage.removeItem('TypeTitle');
        localStorage.removeItem('DamageTypes');
    });

};

const fetchPokemonGroup = async (idType) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${idType}`);
        if (response.ok) {
            const data = await response.json();
            damageTypes = { ...data.damage_relations };
            typeName = data.name;
            const _pokesPromises = data.pokemon.map(poke => fetchSinglePokemon(poke.pokemon.url));
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

const renderPokemon = (render) => {

    if (render) {
        renderInfoType();

        titleType.innerHTML = `<h2 class="title">Pokemons of type: <span class="tipo ${typeName} padding_x">${typeName.toUpperCase()}</span></h2>`;
    }

    pokeSection.innerHTML = "";

    pokeArray.forEach(pokemon => {
        pokeSection.appendChild(crearCard(pokemon));
    });

};

const renderInfoType = () => {
    typeInfo.innerHTML = `
    <h2 class="title">Damage info:</h2>
    <section class="damage-section">
        <h3 class="title strong">Damage To:</h3>
        <section class="damage-container">
            <div class="wrapper">
                <h4 class="damage-title">x2</h4>
                <div class="types x2">
                    ${damageTypes.double_damage_to.map(type => {
        return `<div class="tipo ${type.name}">${type.name.toUpperCase()}</div>`
    }).join(' ')}
                </div>
            </div>
            <hr class="line">
            <div class="wrapper">
                <h4 class="damage-title">x0.5</h4>
                <div class="types x15">
                ${damageTypes.half_damage_to.map(type => {
        return `<div class="tipo ${type.name}">${type.name.toUpperCase()}</div>`
    }).join(' ')}
                </div>
            </div>
            <hr class="line">
            <div class="wrapper">
                <h4 class="damage-title">x0</h4>
                <div class="types x0">
                ${damageTypes.no_damage_to.map(type => {
        return `<div class="tipo ${type.name}">${type.name.toUpperCase()}</div>`
    }).join(' ')}
                </div>
            </div>
        </section>
    </section>
    <section class="damage-section">
        <h3 class="title weak">Damage From:</h3>
        <section class="damage-container">
            <div class="wrapper">
                <h4 class="damage-title">x2</h4>
                <div class="types x2">
                ${damageTypes.double_damage_from.map(type => {
        return `<div class="tipo ${type.name}">${type.name.toUpperCase()}</div>`
    }).join(' ')}
                </div>
            </div>
            <hr class="line">
            <div class="wrapper">
                <h4 class="damage-title">x0.5</h4>
                <div class="types x15">
                ${damageTypes.half_damage_from.map(type => {
        return `<div class="tipo ${type.name}">${type.name.toUpperCase()}</div>`
    }).join(' ')}
                </div>
            </div>
            <hr class="line">
            <div class="wrapper">
                <h4 class="damage-title">x0</h4>
                <div class="types x0">
                ${damageTypes.no_damage_from.map(type => {
        return `<div class="tipo ${type.name}">${type.name.toUpperCase()}</div>`
    }).join(' ')}
                </div>
            </div>
        </section>
    </section>
    `;
};

const obtenerDatosLS = () => {

    const pokeDataLS = localStorage.getItem('PokeTypes');
    const pokeTypeLS = localStorage.getItem('TypeTitle');
    const damageTypesLS = localStorage.getItem('DamageTypes');
    let pokeDataRestaurada, pokeTypeResytaurada, damageTypesRestauardada;

    if (pokeDataLS) {
        pokeDataRestaurada = JSON.parse(pokeDataLS);
        pokeTypeResytaurada = JSON.parse(pokeTypeLS);
        damageTypesRestauardada = JSON.parse(damageTypesLS);

        pokeArray = [...pokeDataRestaurada];

        typeName = pokeTypeResytaurada;

        damageTypes = { ...damageTypesRestauardada };

        renderPokemon(true);

    }

};

const almacenarDatosLS = (arrayPokes, currentType, damageTypesInfo) => {
    localStorage.setItem('PokeTypes', JSON.stringify(arrayPokes));
    localStorage.setItem('TypeTitle', JSON.stringify(currentType));
    localStorage.setItem('DamageTypes', JSON.stringify(damageTypesInfo));
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