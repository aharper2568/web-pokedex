const searchForm = document.querySelector('#search-form');




const searchApi = function(pokemon) {
    event.preventDefault();
    
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
                
                $('#search-form').on("submit", searchApi)
