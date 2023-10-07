import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    setCart: (state, action) => {
      state.cartItems = action.payload; 
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id!== action.payload
      );
    },
  },
});
export const { addToCart,setCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

