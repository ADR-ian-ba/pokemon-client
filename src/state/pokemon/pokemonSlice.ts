import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IPokemon from "../../interfaces/IPokemon";


interface PokemonState {
    pokemonList: IPokemon[];
  }

const initialState : PokemonState = {
    pokemonList: []
}

const pokemonSlice = createSlice ({
    name: "pokemon",
    initialState,
    reducers:{
        add: (state, action: PayloadAction<IPokemon[]>) => {
            state.pokemonList.push(...action.payload)
        }
    }
})

export const {add} = pokemonSlice.actions

export default pokemonSlice.reducer

