import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PostsState {
  posts: {
    items: {}[];
    status: "loading";
  };
  tags: {
    items: String[];
    status: "loading";
  };
}

const initialState: PostsState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
