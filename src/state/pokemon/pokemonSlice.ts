import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IPokemonDetail from "../../interfaces/IPokemonDetail";


interface PokemonState {
    pokemonList: IPokemonDetail[];
  }

const initialState : PokemonState = {
    pokemonList: []
}

const pokemonSlice = createSlice ({
    name: "pokemon",
    initialState,
    reducers:{
        add: (state, action: PayloadAction<IPokemonDetail[]>) => {
            state.pokemonList.push(...action.payload)
        }
    }
})

export const {add} = pokemonSlice.actions

export default pokemonSlice.reducer

