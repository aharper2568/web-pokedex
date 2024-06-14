const cardEl = $('#pokemon')
const searchForm = $('#search-form');
const results = $('#results');
const searchInput = $('#search-input')
const searchHistoryEl = $('#search-history');



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
        addToSearchHistory(pokeName);
        searchApi(pokeName);
        renderSearchHistory()
    }
}
const searchApi = function (pokemon) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => populatePokemonContainer(data))



}


function addToSearchHistory(pokemon) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
 if (!history.includes(pokemon)) {
    history.push(pokemon);
    localStorage.setItem('searchHistory', JSON.stringify(history));
 }
}

function renderSearchHistory() {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistoryEl.empty();
    history.forEach (pokemon => {
        const historyItem = $(`<li class="list-group-item btn">${pokemon}</li>`);
        historyItem.on('click', () => {
            searchApi(pokemon);
        });
        searchHistoryEl.append(historyItem)
    })
}




$('#search-form').on("submit", handleFormSubmit)


function populatePokemonContainer(data) {
    const abilities = data.abilities.map(ability => `
 ${ability.ability.name}`).join('/').toUpperCase();

    const types = data.types.map(type => type.type.name).join(',').toUpperCase();
    const names = (data.name).toUpperCase();

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
                        <p class="card-text"><b>Abilities: </b><br><a href="${data.abilities[0].ability.url}" target="blank">${abilities}</a></p>
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
    function decagramsToPounds(decagrams) {
        const pounds = decagrams / 4.5359;
        return parseFloat(pounds.toFixed(2));
      }
      function decimetersToFeet(decimeters) {
        const feet = decimeters * 0.328084;
        return parseFloat(feet.toFixed(2));
    }
    
 
  


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

$(document).ready(function () {
    renderSearchHistory();
    searchForm.on('submit', handleFormSubmit)
  });


  const pokemonCard = document.querySelector('.card');

// Initialize Hammer on the Pokémon card element
const hammer = new Hammer(pokemonCard[0]);

let lastScale = 1;
let currentScale = 1;

// Pinch event handler
hammer.on('pinch', function (event) {
    currentScale = Math.max(1, Math.min(lastScale * event.scale, 3)); // Limit scale to a max of 3
    pokemonCard.style.transform = `scale(${currentScale})`;
});

// Pinchend event handler
hammer.on('pinchend', function () {
    lastScale = currentScale;
});