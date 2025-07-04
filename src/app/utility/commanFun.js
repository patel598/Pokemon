

export const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const formatId = (id) => {
  return `#${id.toString().padStart(3, '0')}`
}


// Function for format Stat name
export const formatStatName = (name) => {
  const statNames = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    'speed': 'Speed'
  }
  return statNames[name] || name
}

// Function for set different color of Stat progressbar
export const getStatColor = (statName) => {
  const colors = {
    'hp': 'bg-red-500',
    'attack': 'bg-orange-500',
    'defense': 'bg-yellow-500',
    'special-attack': 'bg-blue-500',
    'special-defense': 'bg-green-500',
    'speed': 'bg-purple-500'
  }
  return colors[statName] || 'bg-gray-500'
}




// Fuction for filter Pokemon data 
export const filterPokemon = (selectedType, pokemon) => {
  return selectedType ? pokemon.filter(p => p.types.includes(selectedType)) : pokemon
}

