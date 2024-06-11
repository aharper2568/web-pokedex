const searchForm = $('#search-form');
const results = $('#results');

const searchInput = $('#search-input')




const test = function(pokemon) {

    fetch('https://pokeapi.co/api/v2/pokemon/charizard')
    .then(function(response) {
        return response.json();
        })
        .then(function(data) {
            console.log('SEARCH');
            console.log(data);
            })
            .catch(function (err) {
                console.log(err);
                })};

test()

function handleFormSubmit(event) {
    event.preventDefault();
    const pokeName = searchInput.val()
    if (pokeName) {
        searchApi(pokeName);
    }
}
const searchApi = function(pokemon) {
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then( response => response.json())
    .then (data => populatePokemonContainer(data))
    
    
}


        
                
                $('#search-form').on("submit", handleFormSubmit)


function populatePokemonContainer(data) {
// results.empty()
// const pokemonCard = $(`
// <div class="row">
// <div class="card col-12 col-md-8 m-5">
// <h2>Name: ${data.name}</h2>
// <img src="${data.sprites.front_default}">
// <div>
// <h3>Abilities:</h3>
// <a href="${data.abilities[0].ability.url}">${data.abilities[0].ability.name}</a><br>
// <a href="${data.abilities[1].ability.url}">${data.abilities[1].ability.name}</a>
// </div>
// <h3>Type: </h3>
// <p><b></b>${data.types[0].type.name}, ${data.types[1].type.name}</p>
// <p><b>ID: </b>${data.id}</p>
// <h3>
// </div>
// </div>
// `)

const cardEl = $('#pokemon')
const spriteImg = $('#sprite');
const name =  $('#name');
const type = $('#type');
const abilities = $('#abilities');
spriteImg.attr ('src', data.sprites.front_default);
name.text(data.name)
type.text(data.types[0].type.name)
abilities.text(data.abilities[0].ability.name)





}

