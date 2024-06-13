const searchForm = $('#search-form');
const results = $('#results');

const searchInput = $('#search-input')




const test = function (pokemon) {

    fetch('https://pokeapi.co/api/v2/pokemon/charizard')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('SEARCH');
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
};

test()

function handleFormSubmit(event) {
    event.preventDefault();
    const pokeName = searchInput.val().toLowerCase();
    if (pokeName) {
        searchApi(pokeName);
    }
}
const searchApi = function (pokemon) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => populatePokemonContainer(data))


}




$('#search-form').on("submit", handleFormSubmit)


function populatePokemonContainer(data) {
    const abilities = data.abilities.map(ability => `
<a href="${ability.ability.url}" target="blank">${ability.ability.name}</a>`).join('/');

    const types = data.types.map(type => type.type.name).join(',')

    const pokemonCard = $(`
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4 text-center">
                    <img id="sprite" src="${data.sprites.front_default}" class="img-fluid rounded-start" alt="${data.name}">
                    <img id="sprite-back" src="${data.sprites.back_default}" class="img-fluid rounded-start" alt="${data.name}">
                    <button id="${data.name}" class="btn btn-warning mt-3">Shiny!</button>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text"><b>Abilities:</b><br>${abilities}</p>
                        <p class="card-text"><b>Type:</b> ${types}</p>
                        <p class="card-text"><b>ID:</b> ${data.id}</p>
                        <h3>Cries:</h3>
                        <audio id="cry" controls src="${data.cries.latest}"></audio>
                    </div>
                </div>
            </div>
        </div>
    `);

    results.empty().append(pokemonCard);

    let mode = 'notshiny';
    $(`#${data.name}`).on('click', function () {
        if (mode === 'notshiny') {
            mode = 'shiny';
            $('#sprite').attr('src', data.sprites.front_shiny);
            $('#sprite-back').attr('src', data.sprites.back_shiny);
        } else {
            mode = 'notshiny';
            $('#sprite').attr('src', data.sprites.front_default);
            $('#sprite-back').attr('src', data.sprites.back_default);
        }
    });

}

