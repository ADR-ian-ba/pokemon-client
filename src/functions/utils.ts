
import axios from 'axios';
import IPokemon from '../interfaces/IPokemon';


export const fetchData = async (currentId: number): Promise<IPokemon[]> => {
  const pokemons: IPokemon[] = []

  for (let i = currentId; i < currentId + 20; i++) {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)

      const pokemonData: IPokemon = {
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.other['official-artwork'].front_default,
      };
      pokemons.push(pokemonData)
    } catch (error) {
      console.error(error)
    }
  }

  return pokemons
};



