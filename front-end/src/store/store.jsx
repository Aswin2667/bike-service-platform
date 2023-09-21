import { configureStore } from "@reduxjs/toolkit";
import NavIndexReducer  from "../slices/NavIndex";

export default configureStore({
    reducer : {
        navindex: NavIndexReducer,
    }
})
