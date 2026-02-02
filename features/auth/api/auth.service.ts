import { LoginPayloadType, RegisterPayloadType } from "@/types/auth.type";
import authApi from "./authApi";

export const authService = {
  async login(payload: LoginPayloadType) {
    // try {
    const res = await authApi.login(payload);

    return res.data;
    // } catch (err) {
    //   console.error("🚀 ~ err:", err);
    //   throw err;
    // }
  },

  async register(payload: RegisterPayloadType) {
    const res = await authApi.register(payload);

    return res.data;
  },

  async logout() {
    const res = await authApi.logout();

    return res.data;
  },

  async getUser() {
    const res = await authApi.getUser();

    return res.data;
  },

  async refreshToken() {
    const res = await authApi.refreshToken();

    return res.data;
  },
};
