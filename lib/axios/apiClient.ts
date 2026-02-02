/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { baseApiURL } from "../utils";
import store from "@/stores/store";
import { setRefreshing } from "@/features/auth/redux/slice/authSlice";
import { authService } from "@/features/auth/api/auth.service";
import { getUserThunk } from "@/features/auth/redux/thunk/authThunks";
// import { cookies } from "next/headers";

const ApiClient = axios.create({
  baseURL: baseApiURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const NO_RETRY_ENDPOINTS = ["/auth/login", "/auth/register"];

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve();
  });

  failedQueue = [];
};

ApiClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

ApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // if credentials are not match will return 401,
    // don't retry and throw error
    if (
      NO_RETRY_ENDPOINTS.some((endpoint) =>
        originalRequest.url?.includes(endpoint),
      )
    ) {
      return Promise.reject(error);
    }

    // kalau bukan 401, skip
    if (error.response?.status !== 401 || originalRequest?._retry)
      return Promise.reject(error);

    // mark request as retried
    originalRequest._retry = true;

    // sedang refresh ? => antrian request menunggu
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      });
    }

    isRefreshing = true;
    store.dispatch(setRefreshing(true));

    try {
      await authService.refreshToken();

      processQueue(null);

      // ✅ SETELAH REFRESH BERHASIL, UPDATE USER DATA
      store.dispatch(getUserThunk());
      store.dispatch(setRefreshing(false));

      // repeat request
      return ApiClient(originalRequest);
    } catch (error) {
      // isRefreshing = false;
      processQueue(error);
      store.dispatch(setRefreshing(false));

      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

export default ApiClient;
