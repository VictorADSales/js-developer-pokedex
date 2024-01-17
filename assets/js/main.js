const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const button = document.getElementById('button')
const modal = document.querySelector('dialog')
function createDetail() {

}
_pokemons = []


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    let node = document.createElement('li')
    node.id = pokemon.number
    node.className = `pokemon ${pokemon.type}`
    node.innerHTML = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
    `
    node.addEventListener("click", () => {
        console.log(pokemon.number);
    })
    return node
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        _pokemons = pokemons
        const newHtml = pokemons.map(convertPokemonToLi)
        newHtml.forEach(n => pokemonList.appendChild(n))
        console.log(newHtml)
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

button.onclick = function() {
    modal.showModal()
    
}

