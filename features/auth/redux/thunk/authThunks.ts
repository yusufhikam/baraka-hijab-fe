/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginPayloadType } from "@/types/auth.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../api/auth.service";

/**
 * * LOGIN THUNK
 */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayloadType, { rejectWithValue }) => {
    try {
      const data = await authService.login(payload);

      return data.data;
    } catch (error: any) {
      const message =
        error.response.data.message ??
        error.message ??
        "Something went wrong. Login failed.";

      return rejectWithValue(message);
    }
  },
);

/**
 * * GET USER THUNK
 */

export const getUserThunk = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getUser();

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message ?? "Something went wrong. Get user failed.",
      );
    }
  },
);

/**
 * * LOGOUT THUNK
 */

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_arg, { rejectWithValue }) => {
    try {
      const data = await authService.logout();

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ??
          "Something went wrong. Logout failed.",
      );
    }
  },
);
