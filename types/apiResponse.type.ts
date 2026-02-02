import { UserType } from "./user.type";

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiResponseUser extends ApiResponse<UserType> {
  token: string;
}
