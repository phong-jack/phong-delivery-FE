import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { removeOrderDetail } from "../../../services/order.service";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import { clearOrder } from "../../../redux/orderSlice";

const SuccessPay = () => {
  let order = useSelector((state) => state.order.currentOrder);
  let user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    handleCreateOrder();
  }, []);

  const handleCreateOrder = async () => {
    console.log(order);
    const orderDto = {
      shopId: order.shopId,
      address: user.address,
      note: "",
      orderDetails: order.orderDetails,
      paymentMethod: "ONLINE",
    };
    const res = await axiosJWT.post("/order/createNewOrder", orderDto);
    if (res.data && res.data.metadata) {
      toast.success("Thanh toán thành công");
      dispatch(clearOrder());
    } else {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "1000px" }}
    >
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">Thành Công</h5>
          <p class="card-text">Thanh toán thành công</p>
          <Link to="/" class="btn btn-primary">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPay;
