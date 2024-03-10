import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Move {
    name: string;
}
  
interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    official: string;
    sprite: string;
    move: Move[];
}


interface PokemonState {
    pokemonList: Pokemon[];
  }

const initialState : PokemonState = {
    pokemonList: []
}

const pokemonSlice = createSlice ({
    name: "pokemon",
    initialState,
    reducers:{
        add: (state, action: PayloadAction<Pokemon[]>) => {
            state.pokemonList.push(...action.payload)
        }
    }
})

export const {add} = pokemonSlice.actions

export default pokemonSlice.reducer

