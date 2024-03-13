import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface nextState{
    next: string
}

const initialState : nextState ={
    next: "https://pokeapi.co/api/v2/pokemon/"
}

const nextSlice = createSlice({
    name: "next",
    initialState,
    reducers:{
        mutate:(state, action: PayloadAction<string>) =>{
            state.next = action.payload
        }
    }

})

export const {mutate} = nextSlice.actions

export default nextSlice.reducer