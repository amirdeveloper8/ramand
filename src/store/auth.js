import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    userName: null,
  },
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.userName = user.email;
      state.authenticated = true;
      localStorage.setItem("token", user.email);
    },
    logout(state) {
      state.authenticated = false;
      state.userName = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
