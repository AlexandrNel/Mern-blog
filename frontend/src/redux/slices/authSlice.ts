import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { Status } from "./postsSlice";
import { RootState } from "../store";

type User = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};

interface AuthState {
  data: User | null;
  status: "loading" | "error" | "success";
}

const initialState: AuthState = {
  data: null,
  status: Status.LOADING,
};
type LoginParams = {
  email: string;
  password: string;
};
type RegisterParams = {
  fullName: string;
  email: string;
  password: string;
};
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params: LoginParams) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);
export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params: RegisterParams) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
      state.status = Status.LOADING;
    },
  },
  extraReducers(builder) {
    // Login
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    }),
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      }),
      builder.addCase(fetchLogin.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      });

    // Register
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    }),
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      }),
      builder.addCase(fetchRegister.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      });

    // Auth
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    }),
      builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      }),
      builder.addCase(fetchAuthMe.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      });
  },
});
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const selectAuthData = (state: RootState) => state.auth.data;
export default authSlice.reducer;
export const { logout } = authSlice.actions;
