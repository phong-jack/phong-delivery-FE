import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import OrderDetailModal from "../../Widgets/OrderDetailModal";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import StatusBadge from "../../Widgets/StatusBadge";
import {
  convertUTCtoVietnamTime,
  getVietNamDongFormat,
} from "../../../utils/func.ulti";
import moment from "moment";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const [isShowOrderDetailModal, setOrderDetailModal] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);

  const [listOrder, setListOrder] = useState();
  const [selectedOrderId, setSelectedOrderId] = useState();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  if (!user) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }
  const getOrderList = async () => {
    const res = await axiosJWT.get("/order/" + user.id);
    if (res.data && res.data.metadata) {
      // setListOrder(res.data.metadata);
      setListOrder(sortOrdersByTime(res.data.metadata));
    }
  };

  const sortOrdersByTime = (orders) => {
    return [...orders].sort((a, b) =>
      moment(a.updatedAt).isAfter(moment(b.updatedAt)) ? -1 : 1
    );
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const handleCloseModal = () => {
    setOrderDetailModal(false);
  };

  return (
    <>
      {" "}
      <div style={{ height: "1000px" }}>
        <div className="mt-5">
          <h1 className="text-uppercase">Danh sách đơn hàng</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="d-flex justify-content-between">
                  ID
                  <i className="fa-solid fa-sort"></i>
                </th>
                <th>Tên quán</th>
                <th>Món </th>
                <th style={{ width: "8%" }}>Trạng thái</th>
                <th style={{ width: "10%" }}>Số tiền</th>
                <th style={{ width: "18%" }}>Thời gian đặt</th>
                <th style={{ width: "8%" }}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {listOrder &&
                listOrder?.map((order) => {
                  return (
                    <>
                      <tr>
                        <td>{order.orderId}</td>
                        <td>{order.shopName}</td>
                        <td>
                          {order.foodDrinks &&
                            order.foodDrinks.map((foodDrink, index) => (
                              <span key={foodDrink.id}>
                                {foodDrink.name}
                                {index !== order.foodDrinks.length - 1 && ", "}
                              </span>
                            ))}
                        </td>
                        <td>
                          <StatusBadge statusCode={order.statusCode} />
                        </td>
                        <td>{getVietNamDongFormat(order.totalAmount)}</td>
                        <td>{convertUTCtoVietnamTime(order.updatedAt)}</td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              setOrderDetailModal(true);
                              setSelectedOrderId(order.orderId);
                            }}
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
      <OrderDetailModal
        isShowOrderDetailModal={isShowOrderDetailModal}
        handleCloseModal={handleCloseModal}
        orderId={selectedOrderId}
        getOrderList={getOrderList}
      />
    </>
  );
};

export default OrderHistoryPage;
