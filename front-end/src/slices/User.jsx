import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    username: "",
    email: "",
    role: "",
    isAvatarImageSet: false,
    avatarimage: "",
    bookings:[],
    __v: 0,
  },
};

export const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateUsername: (state, action) => {
      state.user.username = action.payload;
    },
    updateEmail: (state, action) => {
      state.user.email = action.payload;
    },
    updateRole: (state, action) => {
      state.user.role = action.payload;
    },
    updateisAvatarImageSet:((state,action)=>{
      state.user.isAvatarImageSet=true;
    }),
    updateAvatarImage: (state, action) => {
      state.user.avatarimage = action.payload;
    },
    addBooking: (state, action) => {
      state.user.bookings.push(action.payload);
    },
    setBookings: (state, action) => {
      state.user.bookings = action.payload;
    }
  },
});

export const {
  updateUser,
  updateUsername,
  updateEmail,
  updateRole,
  updateAvatarImage,
  updateisAvatarImageSet,
  addBooking,
  setBookings,
} = User.actions;

export default User.reducer;
