const searchForm = $('#search-form');
const results = $('#results');
const spriteImg = $('#sprite');
const name =  $('#name');
const type = $('#type');
const searchInput = $('#search-input')




const test = function(pokemon) {

    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
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
results.empty()
const pokemonCard = $(`
<div class="row">
<div class="card col-12 col-md-8 m-5">
<p>${data.name}</p>
<img src="${data.sprites.front_default}">
<p>${data.abilities[0].ability.name}/${data.abilities[1].ability.name}</p>
<p><b>Type:</b>${data.types[0].type.name}</p>
<div>
</div>
`)
results.append(pokemonCard)
}

