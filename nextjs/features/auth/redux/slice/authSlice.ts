import { UserType } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginThunk, logoutThunk } from "../thunk/authThunks";

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerifying: boolean;
  isRefreshing: boolean;
  errorMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isVerifying: true,
  isRefreshing: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.errorMessage = null;
    },
    setVerifying: (state, action: { payload: boolean }) => {
      state.isVerifying = action.payload;
    },
    setRefreshing: (state, action: { payload: boolean }) => {
      state.isRefreshing = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // todo : reducer LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.errorMessage = action.payload as string;
      })
      // todo : reducer GET USER
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.data;
        state.isAuthenticated = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        // state.isAuthenticated = false;
        // not set error message because it will be handled by interceptor
      })

      // todo : reducer LOGOUT
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetError, setVerifying, setRefreshing } = authSlice.actions;

export const authReducer = authSlice.reducer;
