import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("todos/getTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return data;
});

const postsSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    status: null,
    updateId: null,
    notif: {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    },
    searchList: null,
    searchStatus: "No Search",
  },
  reducers: {
    updateHandler(state, action) {
      const newPost = action.payload;
      const postUpdated = state.list.find((item) => item.id === newPost.id);

      postUpdated.title = newPost.title;
      postUpdated.body = newPost.body;
      if (state.searchList) {
        const postSearchUpdated = state.searchList.find(
          (item) => item.id === newPost.id
        );
        postSearchUpdated.title = newPost.title;
        postSearchUpdated.body = newPost.body;
      }
    },
    notifHandler(state, action) {
      const notificaton = action.payload;

      state.notif.status = notificaton.status;
      state.notif.title = notificaton.title;
      state.notif.message = notificaton.message;
    },
    searchHandler(state, action) {
      const value = action.payload;

      const result = state.list.filter(
        (item) => item.title.includes(value) || item.body.includes(value)
      );
      state.searchList = result;
    },
  },
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

export const postsActions = postsSlice.actions;

export default postsSlice;
