import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumb from '../../components/Breadcrumb'
import { ArrowLeft, Weight, Ruler, Zap } from 'lucide-react'
import Link from 'next/link'
import { formatId, formatName, formatStatName, getStatColor } from '@/app/utility/commanFun'
import { getPokemon } from '@/app/utility/constant-api'



export async function generateMetadata({ params }) {
  const searchParam = await params
  const pokemon = await getPokemon(searchParam.name)
  const description = pokemon.types.map(type => formatName(type.type.name))


  return {
    title: formatName(pokemon.name),
    description: description.toString(),
  };
}



export default async function PokemonDetail({ params }) {
  const searchParam = await params
  const pokemon = await getPokemon(searchParam.name)



  if (!pokemon) {
    notFound()
  }



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb component */}
      <Breadcrumb items={[{ label: formatName(pokemon.name) }]} />

      {/* Go Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pokemon List
        </Link>
      </div>
      {/* Card detail section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Name and ID section */}
            <div className="text-center md:text-left">
              <div className="text-sm opacity-75 mb-2">{formatId(pokemon.id)}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {formatName(pokemon.name)}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium"
                  >
                    {formatName(type.type.name)}
                  </span>
                ))}
              </div>
            </div>

            {/* Image section */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                {pokemon.sprites.front_default ? (
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={192}
                    height={192}
                    priority
                    className="object-contain"
                  />
                ) : (
                  <div className="text-white/50 text-center">
                    <div className="text-4xl mb-2">❓</div>
                    <div className="text-sm">No Image</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detail section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Base Stats and Abilities section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Base Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-600 text-right">
                        {formatStatName(stat.stat.name)}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <div
                          className={`h-full ${getStatColor(stat.stat.name)} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${(stat.base_stat / 100) * 100}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm font-bold text-gray-800 text-right">
                        {stat.base_stat}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Abilities</h2>
                <div className="flex flex-wrap gap-3">
                  {pokemon.abilities.map((ability) => (
                    <div
                      key={ability.ability.name}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${ability.is_hidden
                        ? 'bg-purple-100 text-purple-800 border-2 border-purple-200'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {formatName(ability.ability.name)}
                      {ability.is_hidden && (
                        <span className="ml-2 text-xs">(Hidden)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Physical Traits and Other Sprites section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Physical Traits</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Ruler className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-gray-700">Height</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {(pokemon.height / 10).toFixed(1)} m
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Weight className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-700">Weight</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium text-gray-700">Base Experience</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {pokemon.base_experience}
                  </div>
                </div>
              </div>

              {(pokemon.sprites.back_default || pokemon.sprites.front_shiny) && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Other Sprites</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {pokemon.sprites.back_default && (
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Image
                          src={pokemon.sprites.back_default}
                          alt={`${pokemon.name} back`}
                          width={96}
                          height={96}
                          priority
                          className="mx-auto mb-2"
                        />
                        <div className="text-sm text-gray-600">Back</div>
                      </div>
                    )}
                    {pokemon.sprites.front_shiny && (
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Image
                          src={pokemon.sprites.front_shiny}
                          alt={`${pokemon.name} shiny`}
                          width={96}
                          height={96}
                          priority
                          className="mx-auto mb-2"
                        />
                        <div className="text-sm text-gray-600">Shiny</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}