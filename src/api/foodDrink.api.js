import { axiosClient } from "./axiosConfig";

export const getFoodDrinkByShop = async (shopId) => {
  try {
    const res = await axiosClient.get(`/shop/${shopId}/foodDrink`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFoodDrinkInfo = async (id) => {
  const res = await axiosClient.get("/foodDrink/" + id);
  return res.data;
};

export const getFoodDrinkPaginate = async (shopId, page = 1) => {
  try {
    const res = await axiosClient.get(`/foodDrink/shop/${shopId}?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
