import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    username: "",
    email: "",
    role: "",
    isAvatarImageSet: false,
    avatarimage: "",
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
    updateAvatarImage: (state, action) => {
      state.user.avatarimage = action.payload;
    },
  },
});

export const {
  updateUser,
  updateUsername,
  updateEmail,
  updateRole,
  updateAvatarImage,
} = User.actions;

export default User.reducer;
