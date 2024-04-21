import { axiosClient } from "./axiosConfig";

export const getCategoryByShop = async (shopId) => {
  try {
    const res = await axiosClient(`/shop/${shopId}/category`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
