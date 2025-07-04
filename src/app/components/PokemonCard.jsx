import Link from 'next/link'
import Image from 'next/image'
import { cssObj } from '../utility/data'
import { formatId, formatName } from '../utility/commanFun'



export default function PokemonCard({ pokemon }) {


  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer group p-6 h-full`}>
        <div className="text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {pokemon.sprites.front_default ? (
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                  priority
                  quality={80}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No Image</span>
                </div>
              )}
            </div>
            <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
              {formatId(pokemon.id)}
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
            {formatName(pokemon.name)}
          </h3>

          <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={` ${cssObj[type]}`}
              >
                {formatName(type)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}