import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon/pokemonSlice"
import nextReducer from "./pokemon/nextSlice"

export const store = configureStore({
    reducer:{
        pokemon: pokemonReducer,
        next: nextReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch