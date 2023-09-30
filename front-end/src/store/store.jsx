import { configureStore } from "@reduxjs/toolkit";
import NavIndexReducer  from "./NavIndex";

export default configureStore({
    reducer : {
        navindex: NavIndexReducer,
    }
})
