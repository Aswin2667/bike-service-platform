import { configureStore } from "@reduxjs/toolkit";
import NavIndexReducer  from "../slices/NavIndex";
import isAuthenticated from "../slices/isAuthenticated";
import AuthToken from "../slices/AuthToken";
import User from "../slices/User"
import cartReducer from "../slices/CartSlice";
export default configureStore({
    reducer : {
        navindex: NavIndexReducer,
        Authenticated : isAuthenticated,
        Token:AuthToken,
        user:User,
        cart: cartReducer
    }
})
