import { axiosClient } from "./axiosConfig";

export const getAllShop = async () => {
  try {
    const res = await axiosClient.get("/shop");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShopsPaginate = async (page = 1, perPage = 16) => {
  try {
    const res = await axiosClient.get(`/shop?page=${page}&perPage=${perPage}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShopDetail = async (id) => {
  try {
    const res = await axiosClient.get(`/shop/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
