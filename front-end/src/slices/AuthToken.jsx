import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value :"",
}
export const AuthToken = createSlice({
    name : "Token",
    initialState,
    reducers:{
        setToken: (state , action)=> {
            state.value = action.payload
        },
    }   
 })
 export const {setToken } = AuthToken.actions;

 export default AuthToken.reducer