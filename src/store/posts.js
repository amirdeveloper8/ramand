import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("todos/getTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  console.log(data);
  return data;
});

const postsSlice = createSlice({
  name: "todos",
  initialState: { list: [], status: null },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.list = action.payload;
    },
    [getPosts.pending]: (state) => {
      state.status = "failed";
    },
  },
});

export const authActions = postsSlice.actions;

export default postsSlice;
