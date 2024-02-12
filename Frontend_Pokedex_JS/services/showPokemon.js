let buttonswitchContainer = null;
let buttonSwitch = null;
let spriteContainer = null;
let typesContainer = null;
let significado = null;
let pokedexNumber = null;
let altura = null;
let peso = null;
let nombrePokemon = null;
let pokemonDescription = null;
let fromPokedex = null;
let normalStats = null;
let specialStats = null;
let totalStats = null;
let lineaEvolutiva = null;
let formasAlternas = null;
let showShiny = false;
let castPoke = {};
let loading = null;
let mainURL = 'https://pokeapi.co/api/v2/pokemon/';

const elementos = () => {

    loading = document.querySelector('figure.loading-container');

    buttonswitchContainer = document.querySelector('button.switch');

    buttonSwitch = document.querySelector('button.switch>div.buttonSwitch');

    spriteContainer = document.querySelector('section.imgSection>figure.imgContainer');

    typesContainer = document.querySelector('section.firstSectionInfo>section.types');

    significado = document.querySelector('section.firstSectionInfo>section.infoPokemon>p.pokeNameMeaning');

    pokedexNumber = document.querySelector('section.firstSectionInfo>section.infoPokemon>p.pokedexNumberContainer>span.pokedexNumber');

    altura = document.querySelector('section.firstSectionInfo>section.infoPokemon>div.pokeDimensions>p.pokeHeightContainer>span.pokeHeight');

    peso = document.querySelector('section.firstSectionInfo>section.infoPokemon>div.pokeDimensions>p.pokeWeightContainer>span.pokeWeight');

    nombrePokemon = document.querySelector('section.secondSectionInfo>section.pokeNameContanier>p.pokeName');

    pokemonDescription = document.querySelector('section.secondSectionInfo>section.pokeDescriptionContainer>p.pokeDescription');

    fromPokedex = document.querySelector('section.secondSectionInfo>section.pokeDescriptionContainer>p.pokedexName');

    normalStats = document.querySelector('section.secondSectionInfo>section.pokeStatsContainer>div.statsWrapper>div.stats-container>section.normalStats');

    specialStats = document.querySelector('section.secondSectionInfo>section.pokeStatsContainer>div.statsWrapper>div.stats-container>section.specialStats');

    totalStats = document.querySelector('section.secondSectionInfo>section.pokeStatsContainer>p.totalStats>span.total');

    lineaEvolutiva = document.querySelector('section.secondSectionInfo>section.pokeEvoChainContainer>div.chainWrapper');

    formasAlternas = document.querySelector('section.secondSectionInfo>section.pokeFormsContainer>div.formsWrapper');

};

const eventos = () => {
    buttonswitchContainer.addEventListener('click', () => {
        if (showShiny) {
            loadingHandler(true);
            buttonSwitch.classList.remove('shinyOn');

            buttonSwitch.classList.add('shinyOff');

            spriteContainer.innerHTML = `
            <img src="${castPoke.sprite}" alt=""
            class="imgPokemon">
            `;

            lineaEvolutiva.innerHTML = castPoke.cadena_evolutiva.map(evo => {

                return `
                    <div class="wrapperContainer">
                        <div class="pokeChainWrapper">
                            <figure class="pokeChainContainer">
                                <img src="${evo.sprites.normal}" alt="${evo.nombre} sprite" class="imgChain">
                            </figure>
                        </div>
                        <div class="types">
                            ${evo.tipos.map(tipo => {

                    return `
                                    <div class="tipo ${tipo}">${tipo.toUpperCase()}</div>
                                `;
                }).join(' ')}
                        </div>
                        <p class="namePokemon">${evo.nombre}</p>
                    </div>
                `;

            }).join(' ');

            formasAlternas.innerHTML = castPoke.formas.map(forma => {

                return `
                    <div class="wrapperContainer">
                        <div class="pokeFormWrapper">
                            <figure class="pokeFormContainer">
                                <img src="${forma.sprites.normal}" alt="${forma.nombre} sprite" class="imgForm">
                            </figure>
                        </div>
                        <div class="types">
                            ${forma.tipos.map(tipo => {

                    return `
                                    <div class="tipo ${tipo}">${tipo.toUpperCase()}</div>
                                `;
                }).join(' ')}
                        </div>
                        <p class="namePokemon">${forma.nombre}</p>
                    </div>
                `;

            }).join(' ');

            loadingHandler(false);

            showShiny = false;

        } else {
            loadingHandler(true);

            buttonSwitch.classList.remove('shinyOff');

            buttonSwitch.classList.add('shinyOn');

            spriteContainer.innerHTML = `
            <img src="${castPoke.shiny}" alt=""
            class="imgPokemon">
            `;

            lineaEvolutiva.innerHTML = castPoke.cadena_evolutiva.map(evo => {

                return `
                    <div class="wrapperContainer">
                        <div class="pokeChainWrapper">
                            <figure class="pokeChainContainer">
                                <img src="${evo.sprites.shiny}" alt="${evo.nombre} sprite" class="imgChain">
                            </figure>
                        </div>
                        <div class="types">
                            ${evo.tipos.map(tipo => {

                    return `
                                    <div class="tipo ${tipo}">${tipo.toUpperCase()}</div>
                                `;
                }).join(' ')}
                        </div>
                        <p class="namePokemon">${evo.nombre}</p>
                    </div>
                `;

            }).join(' ');

            formasAlternas.innerHTML = castPoke.formas.map(forma => {

                return `
                    <div class="wrapperContainer">
                        <div class="pokeFormWrapper">
                            <figure class="pokeFormContainer">
                                <img src="${forma.sprites.shiny}" alt="${forma.nombre} sprite" class="imgForm">
                            </figure>
                        </div>
                        <div class="types">
                            ${forma.tipos.map(tipo => {

                    return `
                                    <div class="tipo ${tipo}">${tipo.toUpperCase()}</div>
                                `;
                }).join(' ')}
                        </div>
                        <p class="namePokemon">${forma.nombre}</p>
                    </div>
                `;

            }).join(' ');

            loadingHandler(false);

            showShiny = true;
        }
    });
};

const fetchPokemon = async () => {
    let numPoke = JSON.parse(localStorage.getItem('showPokemon'));

    try {
        loadingHandler(true);
        const _info = await fetch(`https://pokeapi.co/api/v2/pokemon/${numPoke}`);

        if (_info.ok) {
            const _data = await _info.json();
            changeWindowName(_data);
            castPoke = await castInfo(_data);
            printInfo(castPoke);
            loadingHandler(false);
            /* console.log(castPoke); */
        }

    } catch (error) {
        console.error(error);
    }
};

const fetchInfoSpeciesPokemon = async (pokeURL, find) => {
    try {
        const _infoSpecie = await fetch(pokeURL);
        if (_infoSpecie.ok) {

            const _data = await _infoSpecie.json();

            if (find === 'name') {

                let nameES;

                nameES = _data.names.filter(name => name.language.name == 'es').map(name => name.name).toString();

                if (nameES) return nameES;
                else return null;

            } else if (find === 'meaning') {

                let meaning;

                meaning = _data.genera.filter(name =>
                    name.language.name == 'es'
                ).map(name => name.genus).toString() || _data.genera.filter(name =>
                    name.language.name == 'en'
                ).map(name => name.genus).toString();

                if (meaning) return meaning;
                else return null;

            } else if (find === 'description') {

                let description;

                description = _data.flavor_text_entries.filter(text => text.language.name == 'es').map(text => {
                    return {
                        entrada_pokedex: text.flavor_text,
                        version: text.version.name.toUpperCase(),
                    }
                });

                if (description.length === 0) {
                    description = _data.flavor_text_entries.filter(text => text.language.name == 'en').map(text => {
                        return {
                            entrada_pokedex: text.flavor_text,
                            version: text.version.name.toUpperCase(),
                        }
                    });
                }


                console.log(description);

                if (description.length > 0) return description;
                else return null;

            } else if (find === 'versions') {

                let versions;

                versions = _data.varieties.map(async form => {

                    let sprites, types, gender, default_version;

                    default_version = form.is_default;

                    if (default_version === true) {

                        gender = await hasGenderDifferences(pokeURL);

                        if (gender) {

                            let spritesMale = await getSprites(form.pokemon.url, true);

                            let spritesFemale = await getSprites(form.pokemon.url, false);

                            types = await getTypes(form.pokemon.url);

                            let male = {
                                nombre: form.pokemon.name.replace('-', ' ').concat(' macho').toUpperCase(),
                                sprites: spritesMale,
                                tipos: types,
                            };

                            let female = {
                                nombre: form.pokemon.name.replace('-', ' ').concat(' hembra').toUpperCase(),
                                sprites: spritesFemale,
                                tipos: types,
                            };

                            return [male, female];
                        } else {
                            sprites = await getSprites(form.pokemon.url, true);

                            types = await getTypes(form.pokemon.url);

                            return {
                                nombre: form.pokemon.name.replace('-', ' ').toUpperCase(),
                                sprites: sprites,
                                tipos: types,
                            }
                        }

                    } else {
                        sprites = await getSprites(form.pokemon.url, true);

                        types = await getTypes(form.pokemon.url);

                        return {
                            nombre: form.pokemon.name.replace('-', ' ').toUpperCase(),
                            sprites: sprites,
                            tipos: types,
                        }
                    }


                });

                let sendVersions = (await Promise.all(versions)).flatMap(form => form).filter(form => form !== null);


                if (sendVersions.length > 0) {
                    return sendVersions;
                } else {
                    return null
                };

            } else if (find === 'pokedex') {

                return _data.id;

            } else if (find === 'evolution') {

                const _infoChain = await fetchEvolutionChain(_data.evolution_chain.url);

                return _infoChain;

            };
        } else {
            throw new Error('Error con la petición');
        }
    } catch (error) {
        console.error(error);
    }
};

const fetchEvolutionChain = async (pokeURL) => {
    try {
        const _info = await fetch(pokeURL);

        if (_info.ok) {

            const _data = await _info.json();

            let initialForm = [],
                mediumForm = [],
                finalForm = [],
                evolutionChain = [],
                _infoSpecie,
                _dataSpecie;

            /* PRIMERA ETAPA EVOLUTIVA */

            try {
                _infoSpecie = await fetch(_data.chain.species.url);
                if (_infoSpecie.ok) {
                    _dataSpecie = await _infoSpecie.json();

                    initialForm = (await Promise.all(_dataSpecie.varieties.map(async version => {

                        if (version.is_default === true) {
                            let sprites = await getSprites(version.pokemon.url, true);
                            let types = await getTypes(version.pokemon.url);

                            return {
                                nombre: version.pokemon.name.replace('-', ' ').toUpperCase(),
                                sprites: sprites,
                                tipos: types,
                            }
                        } else return null;
                    }))).filter(evo => evo !== null);

                    /* SEGUNDA ETAPA EVOLUTIVA */

                    if (_data.chain.evolves_to.length > 0) {

                        mediumForm = await Promise.all(_data.chain.evolves_to.map(async evo => {

                            /* TERCER ETAPA EVOLUTIVA */

                            if (evo.evolves_to.length > 0) {

                                finalForm = await Promise.all(evo.evolves_to.map(async poke => {
                                    let _infoSpecieFinal, _dataSpecieFinal;

                                    let finalName = poke.species.name.replace('-', ' ').toUpperCase();

                                    try {
                                        _infoSpecieFinal = await fetch(poke.species.url);

                                        if (_infoSpecieFinal.ok) {
                                            _dataSpecieFinal = await _infoSpecieFinal.json();

                                            return Object.assign({}, ...(await Promise.all(_dataSpecieFinal.varieties.map(async version => {

                                                if (version.is_default === true) {
                                                    let finalSprites = await getSprites(version.pokemon.url, true);

                                                    let finalTypes = await getTypes(version.pokemon.url);

                                                    return {
                                                        nombre: finalName,
                                                        sprites: finalSprites,
                                                        tipos: finalTypes,
                                                    }

                                                } else return null;

                                            }))));
                                        } else {
                                            throw new Error('Error con la peticion');
                                        }
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }));
                            }

                            let _infoSpecieMedium, _dataSpecieMedium;

                            let mediumName = evo.species.name.replace('-', ' ').toUpperCase();

                            try {
                                _infoSpecieMedium = await fetch(evo.species.url);
                                if (_infoSpecieMedium.ok) {
                                    _dataSpecieMedium = await _infoSpecieMedium.json();

                                    return Object.assign({}, ...(await Promise.all(_dataSpecieMedium.varieties.map(async version => {

                                        if (version.is_default === true) {

                                            let mediumSprites = await getSprites(version.pokemon.url, true);

                                            let mediumTypes = await getTypes(version.pokemon.url);

                                            return {
                                                nombre: mediumName,
                                                sprites: mediumSprites,
                                                tipos: mediumTypes,
                                            }
                                        } else return null;
                                    }))));
                                } else {
                                    throw new Error('Error con la peticion');
                                }
                            } catch (error) {
                                console.error(error);
                            };
                        }));


                    };
                } else {
                    throw new Error('Error con la peticion');
                }
            } catch (error) {
                console.error(error);
            };

            evolutionChain = [...initialForm, ...mediumForm, ...finalForm];

            return evolutionChain;

        } else {
            throw new Error('Error con la peticion');
        };
    } catch (error) {
        console.error(error);
    };
};

const getSprites = async (pokeURL, defaultSprite) => {
    try {
        const _info = await fetch(pokeURL);

        if (_info.ok) {

            let _data = await _info.json();

            let sprite, shiny;


            if (defaultSprite === true) {

                sprite = _data.sprites?.other?.home?.front_default ?? _data.sprites?.other?.['official-artwork']?.front_default ?? _data.sprites?.front_default ?? 'https://25.media.tumblr.com/a5ca5fcd9295bdbef4d78ddd0ecd42a1/tumblr_msk55wmNLi1ssbvp5o1_500.gif';

                shiny = _data.sprites?.other?.home?.front_shiny ?? _data.sprites?.other?.['official-artwork']?.front_shiny ?? _data.sprites.front_shiny ?? 'https://25.media.tumblr.com/a5ca5fcd9295bdbef4d78ddd0ecd42a1/tumblr_msk55wmNLi1ssbvp5o1_500.gif';
                return {
                    normal: sprite,
                    shiny: shiny,
                }
            } else if (defaultSprite === false) {
                sprite = _data.sprites?.other?.home?.front_female ?? _data.sprites?.other?.['official-artwork']?.front_default ?? _data.sprites?.front_female ?? 'https://25.media.tumblr.com/a5ca5fcd9295bdbef4d78ddd0ecd42a1/tumblr_msk55wmNLi1ssbvp5o1_500.gif';

                shiny = _data.sprites?.other?.home?.front_shiny_female ?? _data.sprites?.other?.['official-artwork']?.front_shiny ?? _data.sprites.front_shiny_female ?? 'https://25.media.tumblr.com/a5ca5fcd9295bdbef4d78ddd0ecd42a1/tumblr_msk55wmNLi1ssbvp5o1_500.gif';

                return {
                    normal: sprite,
                    shiny: shiny,
                }
            }

        } else {
            throw new Error('Error en la petición');
        }
    } catch (error) {
        console.error(error);
    }
};

const getTypes = async (pokeURL) => {

    try {
        const _info = await fetch(pokeURL);

        if (_info.ok) {
            const _data = await _info.json();

            const types = _data.types.map(type => type.type.name);

            return types;
        } else {
            throw new Error('Error en la petición');
        }
    } catch (error) {
        console.error(error);
    }
};

const hasGenderDifferences = async (pokeURL) => {

    try {
        const _info = await fetch(pokeURL);

        if (_info.ok) {
            const _data = await _info.json();

            return _data.has_gender_differences;
        } else {
            throw new Error('Error en la petición');
        }
    } catch (error) {
        console.error(error);
    }
};

const castInfo = async (pokeInfo) => {
    try {
        const namesKeywords = ['mega', 'gmax', 'origin', 'alola', 'galar', 'therian'];

        let name = namesKeywords.some(keyword => pokeInfo.name.includes(keyword)) ? pokeInfo.name : await fetchInfoSpeciesPokemon(pokeInfo.species.url, 'name') ?? pokeInfo.name;

        let nameMeaning = await fetchInfoSpeciesPokemon(pokeInfo.species.url, 'meaning') ?? 'Aun sin significado';

        let pokeDescription = await fetchInfoSpeciesPokemon(pokeInfo.species.url, 'description') ?? [{ entrada_pokedex: 'Este Pokemon aun no posee entradas de ninguna Pokedex.', version: 'VERSION NO DISPONIBLE.' }];

        let versions = await fetchInfoSpeciesPokemon(pokeInfo.species.url, 'versions') ?? [null];

        let pokedexNum = await fetchInfoSpeciesPokemon(pokeInfo.species.url, 'pokedex');

        let forms = pokeInfo.forms.length === 1 && pokeInfo.forms[0].name === pokeInfo.name ?
            [null]
            :
            await Promise.all(pokeInfo?.forms.map(async form => {
                const sprites = await getSprites(form.url, true);

                const types = await getTypes(form.url);

                return {
                    nombre: form.name.replace('-', ' ').toUpperCase(),
                    sprites: sprites,
                    tipos: types,
                }
            }));

        let allForms = [...forms, ...versions].filter(form => form !== null);

        let evolutionChain = await fetchInfoSpeciesPokemon(pokeInfo.species.url, 'evolution');

        return {
            nombre: name.replace('-', ' ').toUpperCase(),
            significado: nameMeaning,
            entradas_pokedex: pokeDescription,
            sprite: pokeInfo.sprites.other['official-artwork'].front_default ?? 'https://25.media.tumblr.com/a5ca5fcd9295bdbef4d78ddd0ecd42a1/tumblr_msk55wmNLi1ssbvp5o1_500.gif',
            shiny: pokeInfo.sprites.other['official-artwork'].front_shiny ?? 'https://25.media.tumblr.com/a5ca5fcd9295bdbef4d78ddd0ecd42a1/tumblr_msk55wmNLi1ssbvp5o1_500.gif',
            pokedex: pokedexNum,
            altura: pokeInfo.height / 10,
            peso: pokeInfo.weight / 10,
            tipos: pokeInfo.types.map(tipo => tipo.type.name),
            stats: {
                normalStats: pokeInfo.stats.filter(
                    stat => ['hp', 'attack', 'defense'].includes(stat.stat.name)
                ).map(stat => {
                    let statName = stat.stat.name;
                    if (statName === 'hp') statName = 'HPT';
                    else if (statName === 'attack') statName = 'ATK';
                    else if (statName === 'defense') statName = 'DEF';

                    return {
                        nombre: stat.stat.name,
                        nombreAbrev: statName,
                        valor: stat.base_stat,
                    }
                }),
                specialStats: pokeInfo.stats.filter(
                    stat => ['special-attack', 'special-defense', 'speed'].includes(stat.stat.name)
                ).map(stat => {
                    let statName = stat.stat.name;
                    if (statName === 'special-attack') statName = 'SPA';
                    else if (statName === 'special-defense') statName = 'SDF';
                    else if (statName === 'speed') statName = 'SPD';

                    return {
                        nombre: stat.stat.name,
                        nombreAbrev: statName,
                        valor: stat.base_stat,
                    }
                }),
            },
            formas: allForms,
            cadena_evolutiva: evolutionChain,
        }

    } catch (error) {
        console.error(error);
    }
};

const changeWindowName = (dataPoke) => {
    document.title += ` ${dataPoke.name.toUpperCase()}`
};

const printInfo = (pokeInfo) => {

    let types, randomPokedex;

    randomPokedex = Math.floor(Math.random() * pokeInfo.entradas_pokedex.length);

    types = pokeInfo.tipos.map(tipo => {
        return `<div class="tipo ${tipo}">${tipo.toUpperCase()}</div>`
    });

    spriteContainer.innerHTML = `
    <img src="${pokeInfo.sprite}" alt=""
    class="imgPokemon">
    `;

    typesContainer.innerHTML = types.join(' ');

    significado.innerHTML = pokeInfo.significado;

    pokedexNumber.innerHTML = pokeInfo.pokedex;

    altura.innerHTML = `${pokeInfo.altura}m`;

    peso.innerHTML = `${pokeInfo.peso}kg`;

    nombrePokemon.innerHTML = pokeInfo.nombre;

    pokemonDescription.innerHTML = pokeInfo.entradas_pokedex[randomPokedex].entrada_pokedex;

    fromPokedex.innerHTML = `Pokedex: ${pokeInfo.entradas_pokedex[randomPokedex].version.replace('-', ' ')}`;

    normalStats.innerHTML = pokeInfo.stats.normalStats.map(stat => {

        let rango;

        if (stat.valor <= 80) rango = 'low';
        else if (stat.valor > 80 && stat.valor < 150) rango = 'medium';
        else rango = 'high';

        return `
            <div class="stat">
                <h3 class="stat-name">${stat.nombreAbrev}</h3>
                <p class="stat-limit">0</p>
                <div class="bar-container">
                    <div class="bar ${rango}" style="width: ${stat.valor}px;">
                        <p class="stat-value">${stat.valor}</p>
                    </div>
                </div>
                <p class="stat-limit">255</p>
            </div>
        `;
    }).join(' ');

    specialStats.innerHTML = pokeInfo.stats.specialStats.map(stat => {

        let rango;

        if (stat.valor <= 80) rango = 'low';
        else if (stat.valor > 80 && stat.valor < 150) rango = 'medium';
        else rango = 'high';

        return `
            <div class="stat">
                <h3 class="stat-name">${stat.nombreAbrev}</h3>
                <p class="stat-limit">0</p>
                <div class="bar-container">
                    <div class="bar ${rango}" style="width: ${stat.valor}px;">
                        <p class="stat-value">${stat.valor}</p>
                    </div>
                </div>
                <p class="stat-limit">255</p>
            </div>
        `;
    }).join(' ');

    totalStats.innerHTML = pokeInfo.stats.normalStats.map(stat => stat.valor).reduce((acumulador, valorActual) => acumulador + valorActual, 0) + pokeInfo.stats.specialStats.map(stat => stat.valor).reduce((acumulador, valorActual) => acumulador + valorActual, 0);

    lineaEvolutiva.innerHTML = pokeInfo.cadena_evolutiva.map(evo => {

        return `
            <div class="wrapperContainer">
                <div class="pokeChainWrapper">
                    <figure class="pokeChainContainer">
                        <img src="${evo.sprites.normal}" alt="${evo.nombre} sprite" class="imgChain">
                    </figure>
                </div>
                <div class="types">
                    ${evo.tipos.map(tipo => {

            return `
                            <div class="tipo ${tipo}">${tipo.toUpperCase()}</div>
                        `;
        }).join(' ')}
                </div>
                <p class="namePokemon">${evo.nombre}</p>
            </div>
        `;

    }).join(' ');

    formasAlternas.innerHTML = pokeInfo.formas.map(forma => {

        return `
            <div class="wrapperContainer">
                <div class="pokeFormWrapper">
                    <figure class="pokeFormContainer">
                        <img src="${forma.sprites.normal}" alt="${forma.nombre} sprite" class="imgForm">
                    </figure>
                </div>
                <div class="types">
                    ${forma.tipos.map(tipo => {

            return `
                            <div class="tipo ${tipo}">${tipo.toUpperCase()}</div>
                        `;
        }).join(' ')}
                </div>
                <p class="namePokemon">${forma.nombre}</p>
            </div>
        `;

    }).join(' ');

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
    fetchPokemon();
}

window.onload = main;