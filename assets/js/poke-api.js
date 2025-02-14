
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    pokemon.stats = stats
    pokemon.hp = stats[0]
    pokemon.attack = stats[1]
    pokemon.defense = stats[2]
    pokemon.specialAttack = stats[3]
    pokemon.specialDefense = stats[4]
    pokemon.speed = stats[5]
    pokemon.total = Number(pokemon.hp) + Number(pokemon.attack) + Number(pokemon.defense) + Number(pokemon.specialAttack) + Number(pokemon.specialDefense) + Number(pokemon.speed)

    const habilidades = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name).join(', ')
    pokemon.habilidades = habilidades
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
