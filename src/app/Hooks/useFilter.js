import { filterPokemon } from "../utility/commanFun";
import { fetchPokemonData, fetchTypes } from "../utility/constant-api";

const { useEffect, useState } = require("react");

const useHook = () => {

    const [pokemon, setPokemon] = useState([])
    const [filteredPokemon, setFilteredPokemon] = useState([])
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    async function getData() {
        try {
            setLoading(true)
            const [pokemon, data] = await Promise.all([fetchPokemonData(), fetchTypes()])
            setPokemon(pokemon)
            setFilteredPokemon(pokemon)
            setTypes(data)

        } catch (err) {
            setError('Failed to fetch Pokemon data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {

        setFilteredPokemon(filterPokemon(selectedType, pokemon))
        let timer
        if (searchTerm) {
            timer = setTimeout(() => {
                setFilteredPokemon(pokemon.filter(p =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                ))
            }, 500);
        }

        return () => clearTimeout(timer)
    }, [selectedType, searchTerm, pokemon])
    return [filteredPokemon, types, selectedType, searchTerm, loading, error,
        setSelectedType, setSearchTerm
    ]


}

export default useHook