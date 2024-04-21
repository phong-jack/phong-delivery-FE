import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { orderFoodDrink } from "../../services/order.service";
import { getVietNamDongFormat } from "../../utils/func.ulti";

const FoodCard = (props) => {
  const { id, shopDetail, name, price, imageUrl } = props;

  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.login.currentUser);
  let order = useSelector((state) => state.order.currentOrder);

  const handleOrder = () => {
    if (!user) {
      toast.warning("Chưa đăng nhập, hãy đăng nhập để đặt hàng!");
      return;
    }
    if (!shopDetail.isWorking) {
      toast.warning("Quán đã đóng cửa!");
      return;
    }
    if (!order) {
      order = {
        shopId: shopDetail.id,
        orderDetails: [{ foodDrinkId: id, quantity: 1 }],
      };
      orderFoodDrink(order, dispatch);
      toast.success("Đặt món thành công!");
    } else {
      if (order && order.shopId !== shopDetail.id) {
        toast.warning("Bạn chỉ có thể đặt món từ cùng một quán!");
        return;
      }
      const newOrderDetails = order.orderDetails.map((item) =>
        item.foodDrinkId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const isProductExist = newOrderDetails.some(
        (item) => item.foodDrinkId === id
      );
      if (!isProductExist) {
        newOrderDetails.push({ foodDrinkId: id, quantity: 1 });
      }
      const newOrder = {
        ...order,
        orderDetails: newOrderDetails,
      };
      orderFoodDrink(newOrder, dispatch);
      toast.success("Đặt món thành công!");
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div>
                <img
                  src={imageUrl}
                  className="img-fluid rounded-3"
                  alt="Shopping item"
                  style={{ width: "65px" }}
                />
              </div>
              <div className="ms-3">
                <h5>{name}</h5>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div>
                <h5 className="mb-0">{getVietNamDongFormat(price)}</h5>
              </div>
              <span
                className="order-food-icon"
                style={{ color: "orangered" }}
                onClick={handleOrder}
              >
                <i
                  className="fa-solid fa-cart-plus"
                  style={{ fontSize: "2rem" }}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
