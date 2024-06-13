const cardEl = $('#pokemon')
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


<<<<<<< HEAD
=======

>>>>>>> 756478f5e6109bfc7b1769dd49680c52b27dade7
}




$('#search-form').on("submit", handleFormSubmit)


function populatePokemonContainer(data) {
    const abilities = data.abilities.map(ability => `
<<<<<<< HEAD
<a href="${ability.ability.url}" target="blank">${ability.ability.name}</a>`).join('/');

    const types = data.types.map(type => type.type.name).join(',').toUpperCase();
=======
<a href="${ability.ability.url}" target="blank">${ability.ability.name}</a>`).join('/').toUpperCase();

    const types = data.types.map(type => type.type.name).join(',').toUpperCase();
    const names = (data.name).toUpperCase();
>>>>>>> 756478f5e6109bfc7b1769dd49680c52b27dade7

    const pokemonCard = $(`
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4 text-center">
                    <img id="sprite" src="${data.sprites.front_default}" class="img-fluid rounded-start" alt="${data.name}">
                    <img id="sprite-back" src="${data.sprites.back_default}" class="img-fluid rounded-start" alt="${data.name}">
                    <button id="shiny-button" class="btn btn-warning mt-3">Shiny!</button>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title">Name: ${names}</h3>
                        <p class="card-text"><b>Abilities: </b><br>${abilities}</p>
                        <p class="card-text"><b>Type: </b> ${types}</p>
                        <p class="card-text"><b>ID: </b> ${data.id}</p>
                        <h3>Cries:</h3>
                        <audio id="cry" controls src="${data.cries.latest}"></audio>
                        <h3>Stats:</h3>
                        <p class="card-text"><b>HP: </b>${data.stats[0].base_stat}</p>
                        <p class="card-text"><b>Attack: </b>${data.stats[1].base_stat}</p>
                        <p class="card-text"><b>Defense: </b>${data.stats[2].base_stat}</p>
                        <p class="card-text"><b>Special Attack: </b>${data.stats[3].base_stat}</p>
                        <p class="card-text"><b>Special Defense: </b>${data.stats[4].base_stat}</p>
                        <p class="card-text"><b>Speed: </b>${data.stats[5].base_stat}</p>
                        <p class="card-text"><b>Height: </b>${decimetersToFeet(data.height)} Feet</p>
                        <p class="card-text"><b>Weight: </b>${decagramsToPounds(data.weight)} Lbs</p>
                      
                    </div>
                </div>
            </div>
        </div>
    `);
<<<<<<< HEAD
=======
    function decagramsToPounds(decagrams) {
        const pounds = decagrams / 4.5359;
        return parseFloat(pounds.toFixed(2));
      }
      function decimetersToFeet(decimeters) {
        const feet = decimeters * 0.328084;
        return parseFloat(feet.toFixed(2));
    }
    
 
  

>>>>>>> 756478f5e6109bfc7b1769dd49680c52b27dade7

    results.empty().append(pokemonCard);

    let mode = 'notshiny';
    $('#shiny-button').on('click', function () {
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

