'use client'

import { Search, Filter } from 'lucide-react'
import PokemonCard from './components/PokemonCard'
import LoadingSpinner from './components/LoadingSpinner'
import CardNotFound from './components/CardNotFound'
import useHook from './Hooks/useFilter'



export default function Home() {
  const [filteredPokemon, types, selectedType, searchTerm, loading, error, setSelectedType, setSearchTerm] = useHook();


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (

    <div className="container mx-auto px-4 py-8">

      {/* Header section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Pokemon Explorer
        </h1>
        <p className="text-gray-600 text-lg">
          Discover and explore the world of Pokemon
        </p>
      </div>


      {/* Search and filter section */}

      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Pokemon name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter information section */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredPokemon?.length} Pokemon
          {selectedType && ` of type ${selectedType}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Pokemon card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPokemon.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
      </div>


      {/* Card not found section */}
      {filteredPokemon.length === 0 && (
        <CardNotFound />
      )}
    </div>
  )
}

