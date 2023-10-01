import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value :false,
    token :""
}
export const isAuthenticated = createSlice({
    name : "Authenticated",
    initialState,
    reducers:{
        setAuthenticated: (state , action)=> {
            state.value = !state.value;
        },
    }   
 })
 export const {setAuthenticated } = isAuthenticated.actions;

 export default isAuthenticated.reducer