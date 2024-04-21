import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodDrinkInfo } from "../api/foodDrink.api";
import {
  removeOrderDetail,
  updateOrderDetail,
} from "../services/order.service";
import { Link } from "react-router-dom";
import { getVietNamDongFormat } from "../utils/func.ulti";

const OrderSection = () => {
  let order = useSelector((state) => state.order.currentOrder);

  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    if (orderDetails) {
      getCartData(order);
    }
  }, []);

  const getCartData = async (order) => {
    if (!order || !Array.isArray(order.orderDetails)) {
      // Kiểm tra nếu order hoặc orderDetails không có sẵn hoặc không phải là một mảng
      // Thực hiện các xử lý hoặc trả về một giá trị mặc định nếu cần thiết
      return;
    }
    const newOrderDetails = await Promise.all(
      order?.orderDetails.map(async (item) => {
        const res = await getFoodDrinkInfo(item.foodDrinkId);
        const foodDrink = res.metadata;
        return {
          ...foodDrink,
          quantity: item.quantity,
        };
      })
    );
    const newTotal = calculatorTotal(newOrderDetails);
    setOrderDetails(newOrderDetails);
    setTotal(newTotal);
  };

  const calculatorTotal = (orderDetails) => {
    return orderDetails.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleRemoveItem = (id) => {
    const newOrderDetails = order.orderDetails.filter((item) => {
      return item.foodDrinkId !== id;
    });
    const newOrder = {
      shopId: order.shopId,
      orderDetails: newOrderDetails,
    };
    if (newOrderDetails.length === 0) {
      //nếu order detail băng rỗng thì set null order current và set lại bằng null
      removeOrderDetail(dispatch);
      setOrderDetails(null);
      setTotal(0);
    } else {
      updateOrderDetail(newOrder, dispatch);
      getCartData(newOrder);
    }
  };

  const handleQuantityChange = (newQuantity, id) => {
    const newOrderDetails = order.orderDetails.map((item) => {
      if (item.foodDrinkId === id) {
        return {
          ...item,
          quantity: +newQuantity,
        };
      } else {
        return item;
      }
    });
    const newOrder = {
      shopId: order.shopId,
      orderDetails: newOrderDetails,
    };
    updateOrderDetail(newOrder, dispatch);
    getCartData(newOrder);
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Đơn hàng
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {(orderDetails && orderDetails.length) || 0} Món
                        </MDBTypography>
                      </div>

                      {orderDetails &&
                        orderDetails?.map((item) => (
                          <>
                            <hr className="my-4" />
                            <MDBRow
                              className="mb-4 d-flex justify-content-between align-items-center"
                              key={`item ${item.id}`}
                            >
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src={item.image}
                                  fluid
                                  className="rounded-3"
                                  alt={item.name}
                                />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography
                                  tag="h6"
                                  className="text-black mb-0"
                                >
                                  {item.description}
                                </MDBTypography>
                                <MDBTypography tag="h6" className="text-muted">
                                  {item.name}
                                </MDBTypography>
                              </MDBCol>

                              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <input
                                  id="form1"
                                  min="1"
                                  name="quantity"
                                  defaultValue={item.quantity}
                                  type="number"
                                  class="form-control"
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      e.target.value,
                                      item.id
                                    )
                                  }
                                />
                              </div>

                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  {getVietNamDongFormat(item.price)}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <button
                                  className="text-muted btn"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <MDBIcon fas icon="times" />
                                </button>
                              </MDBCol>
                            </MDBRow>
                          </>
                        ))}

                      <hr className="my-4" />
                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          {(order && (
                            <Link
                              to={`/shop/${order.shopId}`}
                              className="card-text text-body"
                            >
                              <MDBIcon fas icon="long-arrow-alt-left me-2" />
                              Trở lại quán
                            </Link>
                          )) || (
                            <Link to={`/`} className="card-text text-body">
                              <MDBIcon fas icon="long-arrow-alt-left me-2" />
                              Trở lại trang chủ
                            </Link>
                          )}
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1 text-uppercase"
                      >
                        Tóm Tắt
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Số lượng món:{" "}
                          {(orderDetails && orderDetails.length) || 0}
                        </MDBTypography>
                        <MDBTypography tag="h5">
                          {total ? getVietNamDongFormat(total) : `0 VND`}
                        </MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        PHƯƠNG THỨC THANH TOÁN
                      </MDBTypography>

                      <div className="mb-4 pb-2">
                        <select
                          className="select p-2 rounded bg-grey"
                          style={{ width: "100%" }}
                        >
                          <option value="1">COD</option>
                          <option value="2">CHUYỂN KHOẢN (VNPAY)</option>
                        </select>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Địa chỉ
                      </MDBTypography>

                      <div className="mb-5">
                        <MDBInput
                          size="lg"
                          label="Nhập vào địa chỉ muốn giao hàng"
                        />
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Ghi chú
                      </MDBTypography>
                      <div>
                        <textarea
                          name=""
                          className="form-control"
                          id=""
                          cols="30"
                          rows="5"
                        ></textarea>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Tổng tiền
                        </MDBTypography>
                        <MDBTypography tag="h5">
                          {total ? getVietNamDongFormat(total) : `0 VND`}
                        </MDBTypography>
                      </div>

                      <button type="button" class="btn btn-warning btn-lg">
                        Thanh toán
                      </button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default OrderSection;
