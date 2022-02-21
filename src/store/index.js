import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import postsSlice from "./posts";

const store = configureStore({
  reducer: { auth: authSlice.reducer, posts: postsSlice.reducer },
});

export default store;
