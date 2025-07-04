

const BaseUrl = "https://pokeapi.co/api/v2/"

const PokemonType = 'type'
const limit = 'pokemon?limit=150'



// Fetch Pokemon data with details
export async function fetchPokemonData() {
    const response = await fetch(`${BaseUrl}${limit}`, { cache: 'no-store' })
    const data = await response.json()

    const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url)
            const detail = await detailResponse.json()
            return {
                id: detail.id,
                name: detail.name,
                types: detail.types.map((type) => type.type.name),
                sprites: detail.sprites
            }
        })
    )
    return pokemonDetails
}


// Fetch Pokemon type list
export async function fetchTypes() {
    const response = await fetch(`${BaseUrl}${PokemonType}`,{cache: 'no-store'})
    const data = await response.json()
    return data.results.filter((type) =>
        !['unknown', 'shadow'].includes(type.name)
    )
}



// Fetch Pokemon detail by name
export async function getPokemon(name) {
    try {
        const response = await fetch(`${BaseUrl}pokemon/${name}`, {
            next: { revalidate: 3600 }
        })

        if (!response.ok) {
            return null
        }

        return await response.json()
    } catch (error) {
        return null
    }
}