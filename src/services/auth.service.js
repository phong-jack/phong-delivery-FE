import { loginUserApi } from "../api/auth.api";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "../redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await loginUserApi(user);
    dispatch(loginSuccess(res.metadata));
    localStorage.setItem("refreshToken", res.metadata.tokens.refreshToken);
    return res.metadata;
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const logOut = async (dispatch, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("/logout", null, {
      headers: { accessToken: `${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/");
    localStorage.removeItem("refreshToken");
    return true;
  } catch (error) {
    dispatch(logoutFailed());
    return false;
  }
};
