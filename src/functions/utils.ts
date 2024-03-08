import axios from 'axios';

interface Move {
  name: string; 
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  official: string;
  sprite: string;
  move: Move[]
}

export const fetchData = async (currentId: number): Promise<PokemonData[]> => {
  const pokemons: PokemonData[] = []

  for (let i = currentId; i < currentId + 20; i++) {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const moves: Move[] = res.data.moves.map((each: any) => ({
        name: each.move.name
      }));

      const pokemonData: PokemonData = {
        id: res.data.id,
        name: res.data.name,
        height: res.data.height,
        weight: res.data.weight,
        official: res.data.sprites.other['official-artwork'].front_default,
        sprite: res.data.sprites.front_default,
        move: moves, 
      };
      pokemons.push(pokemonData)
    } catch (error) {
      console.error(error)
    }
  }

  return pokemons
};

