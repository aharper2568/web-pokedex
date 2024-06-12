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
    const pokeName = searchInput.val().toLowerCase();
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
const imgCard = $('#img-card')
const pokeCard =$('#pokemon-card')
const cardEl = $('#pokemon')
const spriteImg = $('#sprite');
const name =  $('#name');
const type = $('#type');
const abilities = $('#abilities');
const cryCard = $('<h3>')
const cryEl = $('<audio controls>').attr('src', data.cries.legacy);
const spriteImgBack = $('#sprite-back')
const shinyButton = $('<button>')
spriteImgBack.attr('src', data.sprites.back_default);
spriteImg.attr ('src', data.sprites.front_default);
name.text(data.name)
type.text(data.types.map(type => type.type.name).join('/'))
abilities.text(data.abilities.map(ability => ability.ability.name).join('/'))
cryCard.text('cries:')
pokeCard.addClass('card')
shinyButton.addClass('btn')
shinyButton.text('Shiny!')
imgCard.append(shinyButton)

cryCard.append(cryEl)


cardEl.append(cryCard)
let mode = 'notshiny'
$(shinyButton).on('click', function(){
    if (mode === 'notshiny'){
        mode ='shiny';
    spriteImg.attr('src', data.sprites.front_shiny);
    spriteImgBack.attr('src', data.sprites.back_shiny);
    } else {
        mode = 'notshiny'
    spriteImg.attr('src', data.sprites.front_default);
    spriteImgBack.attr('src', data.sprites.back_default);
    }
})

}

