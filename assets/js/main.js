const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const button = document.getElementById('button')
const modal = document.querySelector('dialog')
const returnbutton = document.getElementsByClassName('return')


function closeDialog() {
   document.getElementById('modal-box').close()
}



const maxRecords = 151;
const limit = 10;   
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
        const novoTexto = `
            <div class="pop-up ${pokemon.type}">
            <div style="display: flex;justify-content:space-between;">
            <div class="return" onclick="closeDialog()">🠔</div>
            <span id="modal-number">#${pokemon.number}</span>
            </div>
            <span class="name-modal">${pokemon.name}</span>
            <ol class="modal-types">
                ${pokemon.types.map((type) => `<li class="modal-type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}">
            
            <div class="detail">
                <ol class="types">
                    <div class="modal-details-box">
                    <li class="modal-details" style="margin-top: .5rem;">HP</li>
                    <li class="modal-details" style="margin-top: .5rem;">${pokemon.hp}</li>
                    <li class="modal-details" style="margin-top: .5rem;"><div style="background-color: rgb(189, 189, 189);"><div style="height: 0.25rem;;width:${Number(pokemon.hp) * 0.63}%;background-color: rgb(45, 163, 12);border-radius: 1rem;"></div></div></li>

                    <li class="modal-details">Attack</li>
                    <li class="modal-details">${pokemon.attack}</li>
                    <li class="modal-details"><div style="background-color: rgb(189, 189, 189);"><div style="height: 0.25rem;;width:${Number(pokemon.attack) * 0.8}%;background-color: rgb(45, 163, 12);border-radius: 1rem;max-width: -webkit-fill-available;"></div></div></li>
                    
                    <li class="modal-details">Defense</li>
                    <li class="modal-details">${pokemon.defense}</li>
                    <li class="modal-details"><div style="background-color: rgb(189, 189, 189);"><div style="height: 0.25rem;;width:${Number(pokemon.defense) * 0.8}%;background-color: rgb(45, 163, 12);border-radius: 1rem;max-width: -webkit-fill-available;"></div></div></li>
                    
                    <li class="modal-details">Sp. Atk</li>
                    <li class="modal-details">${pokemon.specialAttack}</li>
                    <li class="modal-details"><div style="background-color: rgb(189, 189, 189);"><div style="height: 0.25rem;;width:${Number(pokemon.specialAttack) * 0.6}%;background-color: rgb(45, 163, 12);border-radius: 1rem;max-width: -webkit-fill-available;"></div></div></li>

                    <li class="modal-details">Sp. Def</li>
                    <li class="modal-details">${pokemon.specialDefense}</li>
                    <li class="modal-details"><div style="background-color: rgb(189, 189, 189);"><div style="height: 0.25rem;;width:${Number(pokemon.specialDefense) * 0.6}%;background-color: rgb(45, 163, 12);border-radius: 1rem;max-width: -webkit-fill-available;"></div></div></li>

                    <li class="modal-details">Speed</li>
                    <li class="modal-details">${pokemon.speed}</li>
                    <li class="modal-details"><div style="background-color: rgb(189, 189, 189);"><div style="height: 0.25rem;;width:${Number(pokemon.speed) * 0.8}%;background-color: rgb(45, 163, 12);border-radius: 1rem;max-width: -webkit-fill-available;"></div></div></li>

                    <li class="modal-details">Total</li>
                    <li class="modal-details">${pokemon.total}</li>
                    <li class="modal-details"><div style="background-color: rgb(189, 189, 189);"><div style="height: 0.25rem;;width:${Number(pokemon.total) * 0.15}%;background-color: rgb(45, 163, 12);border-radius: 1rem;max-width: -webkit-fill-available;"></div></div></li>
                    <li class="modal-stats weight-height">Height</li>
                            
                    <li class="modal-stats" style="width: 3.5rem;">${pokemon.height} cm</li>
                    <li class="modal-details habilidades">Habilidades: ${pokemon.habilidades}</li>
                    <li class="modal-stats weight-height" style="margin-bottom: 2rem;">Weight</li>
                            
                    <li class="modal-stats" style="width: 3.5rem;margin-bottom: 2rem;">${pokemon.weight} lb's</li>
                    </div>
                </ol>
            </div>
        </div>`
        document.getElementById('modal-box').innerHTML = novoTexto
        document.getElementById('modal-box').showModal()
        console.log(pokemon.habilidades)
    })
    return node
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
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

