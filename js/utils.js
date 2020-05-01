function fetchPokemonData(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
}

function fetchPokemonSpecies(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => response.json())
}

function fetchPokemon(id) {
    return Promise.all([fetchPokemonData(id), fetchPokemonSpecies(id)])
        .then(data => {
            return {...data[0], ...data[1]};
        })
        .then(masterData => {
            loadPokemon(masterData);
        });
}

function fetchRandomPokemon() {
    const NUM_PKMN = 800 // actually 807, but #801 - #807 are not yet implemented
    const pkmnId = Math.ceil(Math.random() * NUM_PKMN);

    return fetchPokemon(pkmnId);
}

function generateRandomDesc(flavorTextOptions) {
    const englishDescriptions = flavorTextOptions
        .filter(option => option.language.name === 'en');

    const descId = Math.floor(Math.random() * englishDescriptions.length);

    return englishDescriptions[descId].flavor_text;
}

function generateRandomMoves(moveList) {
    const firstMoveId = Math.floor(Math.random() * moveList.length);
    const secondMoveId = Math.floor(Math.random() * moveList.length);

    // prevent duplicates
    while (secondMoveId === firstMoveId) {
        secondMoveId = Math.floor(Math.random() * moveList.length);
    }

    return Promise.all([fetch(moveList[firstMoveId].move.url), fetch(moveList[secondMoveId].move.url)])
        .then(results => Promise.all([results[0].json(), results[1].json()]))
        .then(moves => {
            return {
                firstMove: {
                    name: moves[0].name,
                    power: moves[0].power
                },
                secondMove: {
                    name: moves[1].name,
                    power: moves[1].power
                }
            };
        })
}

async function loadPokemon(data) {
    const cardImg = document.getElementById('pkmn_img');
    const cardTitle = document.getElementById('pkmn_name');
    const cardSubtitle = document.getElementById('pkmn_desc');
    const cardFirstMove = document.getElementById('move_1');
    const cardSecondMove = document.getElementById('move_2');

    const pkmn_name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    cardImg.src = data.sprites.front_default;
    cardImg.alt = pkmn_name;
    cardImg.title = pkmn_name;

    cardTitle.innerText = pkmn_name;

    cardSubtitle.innerText = generateRandomDesc(data.flavor_text_entries);

    let moves = await generateRandomMoves(data.moves);

    cardFirstMove.innerText = `${moves.firstMove.name} - ${moves.firstMove.power}`;
    cardSecondMove.innerText = `${moves.secondMove.name} - ${moves.secondMove.power}`;
}
