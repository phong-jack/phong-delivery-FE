import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { removeOrderDetail } from "../../../services/order.service";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import { clearOrder } from "../../../redux/orderSlice";

const SuccessPay = () => {
  useEffect(() => {
    document.title = "Thành công";
  }, []);

  let order = useSelector((state) => state.order.currentOrder);
  let user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  // Sử dụng useRef để theo dõi nếu hiệu ứng đã chạy
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const handleCreateOrder = async () => {
        try {
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
        } catch (error) {
          toast.error("Có lỗi xảy ra");
        }
      };

      if (order) {
        handleCreateOrder();
      }

      effectRan.current = true; // Đánh dấu rằng hiệu ứng đã chạy
    }

    return () => {
      effectRan.current = true; // Đảm bảo không chạy lại trong Strict Mode
    };
  }, [order, user, axiosJWT, dispatch]);

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
