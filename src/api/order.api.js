export const getOrderByShopPaginate = async (
  page = 1,
  perPage = 16,
  shopId,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.get(
      `/order/shop/${shopId}?page=${page}&perPage=${perPage}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
