import { useAppDispatch, useAppSelector } from "@/stores/store";
import { LoginPayloadType } from "@/types/auth.type";
import {
  getUserThunk,
  loginThunk,
  logoutThunk,
} from "../redux/thunk/authThunks";
import { resetError, setVerifying } from "../redux/slice/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const {
    user,
    isVerifying,
    isAuthenticated,
    errorMessage,
    isLoading,
    isRefreshing,
  } = useAppSelector((state) => state.auth);

  return {
    user,
    isVerifying,
    isAuthenticated,
    errorMessage,
    isLoading,
    isRefreshing,

    //   actions

    login: (payload: LoginPayloadType) => dispatch(loginThunk(payload)),

    logout: () => dispatch(logoutThunk()),

    verifyAuth: () => {
      dispatch(getUserThunk());
      dispatch(setVerifying(false));
    },

    resetError: () => dispatch(resetError()),
  };
};
