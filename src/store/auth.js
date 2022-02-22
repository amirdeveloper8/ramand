import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { authenticated: false, userName: null },
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.userName = user.email;
      state.authenticated = true;
    },
    logout(state) {
      state.authenticated = false;
      state.userName = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
