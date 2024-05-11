import { axiosClient } from "./axiosConfig";

export const loginUserApi = async (user) => {
  const res = await axiosClient.post(`/login`, user);
  return res.data;
};

export const registerUserApi = async (user) => {
  const res = await axiosClient.post("/register", user);
  return res.data;
};
