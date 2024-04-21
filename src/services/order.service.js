import {
  clearOrder,
  fetchOrderFailure,
  fetchOrderSuccess,
  startOrderFetching,
} from "../redux/orderSlice";

//json example
/*
{
    "shopId": "1",
    "orderDetails": [
       { "foodDrinkId": "1", "quantity": 6 },
       { "foodDrinkId": "3", "quantity": 6 }
    ]
}
*/
export const orderFoodDrink = (order, dispatch) => {
  dispatch(startOrderFetching());
  try {
    dispatch(fetchOrderSuccess(order));
  } catch (error) {
    dispatch(fetchOrderFailure());
  }
};

export const updateOrderDetail = (order, dispatch) => {
  dispatch(startOrderFetching());
  try {
    dispatch(fetchOrderSuccess(order));
  } catch (error) {
    dispatch(fetchOrderFailure());
  }
};

export const removeOrderDetail = (dispatch) => {
  dispatch(startOrderFetching());
  try {
    dispatch(clearOrder());
  } catch (error) {
    dispatch(fetchOrderFailure());
  }
};
