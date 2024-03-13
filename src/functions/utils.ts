
import axios from 'axios';
import IPokemon from '../interfaces/IPokemon';
import Iseed from '../interfaces/ISeed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';


const next = useSelector((state: RootState) => state.next.next) 
const dispatch = useDispatch()


export const fetchInitial = async (): Promise<Iseed> => {
  const seedData: Iseed = {
    next: "",
    result: []
  };

  try {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    if (res.status === 200) {
      seedData.next = res.data.next;
      seedData.result = res.data.results;
    } else {
      console.error('Failed to fetch data:', res.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return seedData;
};


export const fetchData = async (id: number): Promise<IPokemon | undefined> => {
  let pokemonData: IPokemon | undefined = undefined;
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (res.status === 200) {
      pokemonData = {
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.other['official-artwork'].front_default,
      };
    } else {
      console.error('Failed to fetch data:', res.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return pokemonData; 
};



