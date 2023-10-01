import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value :0,
}
export const NavIndexReducer = createSlice({
    name : "navindex",
    initialState,
    reducers:{
        updateIndex: (state , action)=> {
            state.value = action.payload
        },
    }   
 })
 export const {updateIndex } = NavIndexReducer.actions;

 export default NavIndexReducer.reducer