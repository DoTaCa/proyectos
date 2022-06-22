/* Se declaran las variables donde se almacenaran los datos del API */
const pokeTarjeta = document.querySelector('[data-poke-tarjeta]');
const pokeNombre = document.querySelector('[data-poke-nombre]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

/* Se determina el color de la categoria del pokemon */
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

/* Funcion para buscar al Pokemon */
const buscarPokemon = event => {
    /* Se cancela el Submit del Form */
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

/* Se obtiene la informacion del pokemon */
const renderPokemonData = data => {
    /* Se obtiene la imagen del sprite */
    const sprite =  data.sprites.front_default;
    /* se obtiene los datos y tipo */
    const { stats, types } = data;

    /* Se almacena en pokeName el nombre que esta en la data */
    pokeNombre.textContent = data.name;
    /* Se obtiene la ruta donde se encuentra la imagen */
    pokeImg.setAttribute('src', sprite);
    /* Se obtiene el ID del pokemon de data.id */
    pokeId.textContent = `Nº ${data.id}`;
    /* Se llaman los colores que correspondan */
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

/* Funcion para determinar los colores y forma del fondo */
const setCardColor = types => {
    /* Establece Color 1 */
    const colorOne = typeColors[types[0].type.name];
    /* Establece color 2 si existe */
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    /* Se establece la forma y colores de fondo 33% c/u */
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 40px 40px';
}

/* Funcion que determina los colores de TIPO de pokemon */
const renderPokemonTypes = types => {
    /* Limpia el valor */
    pokeTypes.innerHTML = '';
    /* interacciona con los elementos */
    types.forEach(type => {
        /* Crea un Div */
        const typeTextElement = document.createElement("div");
        /* Primer color */
        typeTextElement.style.color = typeColors[type.type.name];
        /* Segundo color */
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

/* Funcion que muestra cada uno de los datos del pokemon */ 
const renderPokemonStats = stats => {
    /* Limpia */
    pokeStats.innerHTML = '';
    /* Recorre los elementos */
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        /* Extrae la información */
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        /* Agraga los elementos */
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

/* Funcion al no encontrar el pokemon */
const renderNotFound = () => {
    pokeNombre.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'pokemon.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}