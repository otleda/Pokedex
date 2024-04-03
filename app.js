//Fn 01
const getTypeColor = type => {
  const normal = '#F5F5F5'
  return {
    normal,
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    ice: '#DEF3FD',
    water: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    ghost: '#CAC0F7',
    psychic: '#EAEDA1',
    dragon: '#97B3E6',
    fighting: '#E6E0D4'
  }[type] || normal
}

//Fn 02 Types to Pokemons
const getPokemonsType = async pokeApiResults => {
    const promises = pokeApiResults.map(result => fetch(result.url))
    const responses = await Promise.allSettled(promises)
    const fulfilled = responses.filter(response => response.status === 'fulfilled')
    const pokePromises = fulfilled.map(url => url.value.json())
    const pokemons = await Promise.all(pokePromises)
    return pokemons.map(fulfilled => fulfilled.types.map(info => info.type.name))
  }

// Fn 03
const getPokemonsIds = (pokeApiResults) => pokeApiResults.map(({ url }) => {
    const urlArray = url.split('/')
    return urlArray.at(urlArray.length - 2)
  })

const getPokemonsImgs = () => {
  return 
}

const handlePageloader = async () => {
try {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0')

  if(!response.ok) {
    throw Error('Não foi possível obter as informações!')
  }

  const { results : pokeApiResults } =  await response.json()
  const types = await getPokemonsType(pokeApiResults)    
  const ids = getPokemonsIds(pokeApiResults)
  const promises = ids.map(id => fetch(`/assets/img/${id}.png`))
  const responses = await Promise.allSettled(promises)
  const fulfilled = responses.filter(response => response.status === 'fulfilled')
  const imgs = fulfilled.map((response) => {return response.value.url})
  
  console.log('Log dos ids do projeto',ids, types, promises, imgs);    

  } catch (error) {
    console.log('algo deu errado!');
  }
}
handlePageloader()