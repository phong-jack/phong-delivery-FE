import axios from "axios";
import { jwtDecode } from "jwt-decode";
export const BACKEND_URL = "http://localhost:3055";

const axiosClient = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const res = await axios.post("http://localhost:3055/api/v1/refresh", null, {
      headers: {
        refreshtoken: refreshToken,
      },
    });
    console.log("refresh data", res.data.metadata);
    localStorage.setItem("refreshToken", res.data?.metadata.refreshToken);
    return res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create({
    baseURL: `${BACKEND_URL}/api/v1`,
  });
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.tokens.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          tokens: {
            accessToken: data.accessToken,
          },
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["accesstoken"] = data.accessToken;
      } else {
        config.headers["accesstoken"] = user?.tokens.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

export { axiosClient };
