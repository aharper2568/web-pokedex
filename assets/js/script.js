const cardEl = $('#pokemon');
const searchForm = $('#search-form');
const results = $('#results');
const searchInput = $('#search-input');
const searchHistoryEl = $('#search-history');
let chart;

function handleFormSubmit(event) {
    event.preventDefault();
    const pokeName = searchInput.val().toLowerCase().trim();
    if (pokeName) {
        addToSearchHistory(pokeName);
        searchApi(pokeName);
    }
}

const searchApi = function(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        populatePokemonContainer(data);
        updateChart(data.stats);
    })
    .catch(err => {
        console.log(err);
        results.html('<p class="text-danger">Pokémon not found. Please try again.</p>');
    });
}

function addToSearchHistory(pokemon) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(pokemon)) {
        history.push(pokemon);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        renderSearchHistory();
    }
}

function renderSearchHistory() {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistoryEl.empty();
    history.forEach(pokemon => {
        const historyItem = $(`<li class="list-group-item list-group-item-action">${pokemon}</li>`);
        historyItem.on('click', () => {
            searchApi(pokemon);
        });
        searchHistoryEl.append(historyItem);
    });
}

function decagramsToPounds(decagrams) {
    const pounds = decagrams / 4.5359;
    return parseFloat(pounds.toFixed(2));
}

function decimetersToFeet(decimeters) {
    const feet = decimeters * 0.328084;
    return parseFloat(feet.toFixed(2));
}

function populatePokemonContainer(data) {
    const abilities = data.abilities.map(ability => `
    ${ability.ability.name}`).join('/').toUpperCase();

    const types = data.types.map(type => type.type.name).join(', ').toUpperCase();
    const names = (data.name).toUpperCase();

    const pokemonCard = $(`
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4 text-center">
                    <img style="image-rendering: crisp-edges;" id="sprite" src="${data.sprites.front_default}" class="img-fluid w-100 rounded-start" alt="${data.name}">
                    <img style="image-rendering: crisp-edges;"  id="sprite-back" src="${data.sprites.back_default}" class="img-fluid w-100 rounded-start" alt="${data.name}">
                    <button id="shiny-button" class="btn btn-success btn-lg mt-3">Shiny!</button>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title">Name: ${names}</h3>
                        <p class="card-text"><b>Abilities: </b><br><a href="${data.abilities[0].ability.url}" target="blank">${abilities}</a></p>
                        <p class="card-text"><b>Type: </b> ${types}</p>
                        <p class="card-text"><b>ID: </b> ${data.id}</p>
                        <h3>Cries:</h3>
                        <audio id="cry" controls src="${data.cries ? data.cries.latest : ''}"></audio>
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

   
    const spriteEl = document.getElementById('sprite');
    const spriteBackEl = document.getElementById('sprite-back');
    const hammer = new Hammer(spriteEl);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('swipeleft', function() {
        spriteEl.style.display = 'none';
        spriteBackEl.style.display = 'block';
    });

    hammer.on('swiperight', function() {
        spriteEl.style.display = 'block';
        spriteBackEl.style.display = 'none';
    });
}

function updateChart(stats) {
    const statNames = stats.map(stat => stat.stat.name.toUpperCase());
    const statValues = stats.map(stat => stat.base_stat);

    const ctx = document.getElementById('stats-chart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: statNames,
            datasets: [{
                label: 'Base Stats',
                data: statValues,
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(75, 252, 192, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(201, 203, 207, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(36, 92, 205, 0.5)'
                ],

                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

$(document).ready(function() {
    renderSearchHistory();
    searchForm.on("submit", handleFormSubmit);
});
