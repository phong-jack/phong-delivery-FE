import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/axiosConfig";
import { loginSuccess } from "../../redux/authSlice";
import { MDBCardImage, MDBCol, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { getVietNamDongFormat } from "../../utils/func.ulti";
import ConfirmModal from "./ConfirmModal";
import { ORDER_STATUS } from "../../constant";
import { toast } from "react-toastify";

const ShopOrderDetailModal = (props) => {
  const { isShowOrderDetailModal, handleCloseModal, orderId, getListOrder } =
    props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const axiostJWT = createAxios(user, dispatch, loginSuccess);
  const [listProduct, setListProduct] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const [orderUser, setOrderUser] = useState();

  const getFoodDrinksByOrderId = async (orderId) => {
    const res = await axiostJWT.get("/order/detail/" + orderId);
    if (res.data && res.data.metadata) {
      setOrderDetail(res.data.metadata);
      setListProduct(res.data.metadata.foodDrinks);
      const userId = res.data.metadata?.userId;
      getOrderUserInfo(userId);
    }
  };
  useEffect(() => {
    getFoodDrinksByOrderId(orderId);
  }, [orderId]);

  const handleRejectlOrder = async () => {
    try {
      const res = await axiostJWT.post(
        "/order/toggleStatus/" + orderDetail.orderId,
        { orderStatus: ORDER_STATUS.REJECTED }
      );
      if (res.data && res.data.metadata) {
        toast.success("Từ chối thành công");
        handleCloseModal();
        getListOrder(1);
        getFoodDrinksByOrderId(orderDetail.orderId);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAcceptOrder = async () => {
    try {
      const res = await axiostJWT.post(
        "/order/toggleStatus/" + orderDetail.orderId,
        { orderStatus: ORDER_STATUS.ACCEPTED }
      );
      if (res.data && res.data.metadata) {
        toast.success("Xác nhận thành công");
        handleCloseModal();
        getListOrder(1);
        getFoodDrinksByOrderId(orderDetail.orderId);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleShippingOrder = async () => {
    try {
      const res = await axiostJWT.post(
        "/order/toggleStatus/" + orderDetail.orderId,
        { orderStatus: ORDER_STATUS.SHIPPING }
      );
      if (res.data && res.data.metadata) {
        toast.success("Xác nhận làm xong, chuyển giao ship");
        handleCloseModal();
        getListOrder(1);
        getFoodDrinksByOrderId(orderDetail.orderId);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getOrderUserInfo = async (userId) => {
    try {
      const res = await axiostJWT.get("/user/" + userId);
      if (res.data && res.data.metadata) {
        setOrderUser(res.data.metadata);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={isShowOrderDetailModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={handleCloseModal}>
          <Modal.Title id="contained-modal-title-vcenter">
            Chi tiết đơn hàng #{orderDetail?.orderId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {orderUser && (
              <figure class="fir-image-figure">
                <span class="fir-imageover" rel="noopener" target="_blank">
                  <img
                    class="fir-author-image fir-clickcircle"
                    src={orderUser.image}
                    alt="David East - Author"
                    width="50px"
                    height="50px"
                  />
                  <div class="fir-imageover-color"></div>
                </span>

                <figcaption>
                  <div class="fig-author-figure-title">
                    {orderUser.fullName}
                  </div>
                  <div class="fig-author-figure-title">
                    Số diện thoại : {orderUser.phone}
                  </div>
                </figcaption>
              </figure>
            )}
            {listProduct &&
              listProduct?.map((product) => {
                return (
                  <>
                    <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                      <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage
                          src={product.image}
                          fluid
                          className="rounded-3"
                        />
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                        <MDBTypography tag="h6" className="text-black mb-0">
                          {product.description}
                        </MDBTypography>
                        <MDBTypography tag="h6" className="text-muted">
                          {product.name}
                        </MDBTypography>
                      </MDBCol>

                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <input
                          id="form1"
                          value={product.quantity}
                          type="number"
                          class="form-control"
                          readOnly
                        />
                      </div>

                      <MDBCol md="3" lg="2" xl="2" className="text-end">
                        <MDBTypography tag="h6" className="mb-0">
                          {getVietNamDongFormat(product.price)}
                        </MDBTypography>
                      </MDBCol>
                    </MDBRow>
                  </>
                );
              })}
            <MDBRow className="text-end mb-1 ">
              <MDBTypography tag="h6" className="mb-0">
                Địa chỉ giao hàng: {orderDetail?.address}
              </MDBTypography>
            </MDBRow>
            <MDBRow className="text-end">
              <MDBTypography tag="h6" className="mb-0">
                Tổng tiền: {getVietNamDongFormat(orderDetail?.totalAmount)}
              </MDBTypography>
            </MDBRow>
          </>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => handleRejectlOrder()}
            disabled={
              orderDetail?.statusCode === ORDER_STATUS.REJECTED ||
              orderDetail?.statusCode === ORDER_STATUS.SHIPPING
            }
          >
            Từ chối đơn
          </button>
          {orderDetail?.statusCode === ORDER_STATUS.INIT && (
            <button
              className="btn btn-success"
              onClick={() => handleAcceptOrder()}
            >
              Xác nhận đơn
            </button>
          )}
          {orderDetail?.statusCode === ORDER_STATUS.ACCEPTED && (
            <button
              className="btn btn-success"
              onClick={() => handleShippingOrder()}
            >
              Làm xong
            </button>
          )}
          {orderDetail?.statusCode === ORDER_STATUS.SHIPPING && (
            <button className="btn btn-success" disabled>
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Shipping...</span>
              </div>
            </button>
          )}
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        description="Bạn dồng ý từ chối đơn hàng?"
        handleOk={handleRejectlOrder}
      />
    </>
  );
};

export default ShopOrderDetailModal;
