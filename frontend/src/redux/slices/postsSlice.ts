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
  text: string;
  comments: CommentType[] | [];
  title: string;
  user: Autor;
  likesCount: number;
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
    isLiked: boolean;
    items: PostType[];
    status: "loading" | "error" | "success";
  };
  tags: {
    items: string[];
    status: "loading" | "error" | "success";
  };
}

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

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
    isLiked: false,
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
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.status = Status.LOADING;
    }),
      builder.addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = Status.SUCCESS;
      }),
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
