import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = action.payload;
    },
    fogot: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { register, login, logout, fogot } = userSlice.actions;

// selectors
export const selectUser = (state: any) => state.userReducer.user;

//Reducer
const userReducer = userSlice.reducer;
export default userReducer;
