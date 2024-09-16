import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { list } from "@/components/Tabs";
import axios from "../../axios";

export type Autor = {
  _id: string;
  fullName: string;
  avatarUrl: string;
};

export type CommentType = {
  _id: string;
  autor: Autor;
  content: string;
  parentComment: string[];
  createdAt: string;
  updatedAt: string;
};

export type PostType = {
  _id: string;
  tags: string[];
  imageUrl: string;
  text?: string;
  comments?: CommentType[];
  title: string;
  user: Autor;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export interface PostsState {
  posts: {
    items: PostType[];
    status: "loading" | "error" | "success";
  };
  tags: {
    items: string[];
    status: "loading" | "error" | "success";
  };
}

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (id?: number) => {
    const sortParams = list.find((item) => item.id === id);
    if (sortParams) {
      const { field, property } = sortParams;

      const { data } = await axios.get(
        `/posts?sortBy=${field}&sortOrder=${property}`
      );
      return data;
    }
    const { data } = await axios.get("/posts");
    return data;
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

const initialState: PostsState = {
  posts: {
    items: [],
    status: Status.LOADING,
  },
  tags: {
    items: [],
    status: Status.LOADING,
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = Status.SUCCESS;
    }),
      builder.addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = Status.LOADING;
      }),
      builder.addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = Status.ERROR;
      });
    builder.addCase(deletePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.meta.arg
      );
    });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
