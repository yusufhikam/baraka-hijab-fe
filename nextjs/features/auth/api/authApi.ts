import ApiClient from "@/lib/axios/apiClient";
import { ApiResponse } from "@/types/apiResponse.type";
import {
  LoginPayloadType,
  LoginResponseType,
  RegisterPayloadType,
} from "@/types/auth.type";
import { UserType } from "@/types/user.type";

const authApi = {
  login: async (payload: LoginPayloadType) => {
    const res = await ApiClient.post<ApiResponse<LoginResponseType>>(
      "/auth/login",
      payload,
    );

    // if (!res.status) {
    //   throw new Error(res.message || "Login failed.");
    // }

    return res;
  },

  register: async (payload: RegisterPayloadType) =>
    ApiClient.post<ApiResponse<LoginResponseType>>("/auth/register", payload),

  logout: async () => ApiClient.post<ApiResponse<null>>("/auth/logout"),

  getUser: () => ApiClient.get<ApiResponse<UserType>>("/auth/me"),

  refreshToken: () =>
    ApiClient.get<ApiResponse<LoginResponseType>>("/auth/refresh"),
};

export default authApi;
