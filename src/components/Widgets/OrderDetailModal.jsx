import {
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getVietNamDongFormat } from "../../utils/func.ulti";
import ConfirmModal from "./ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/axiosConfig";
import { loginSuccess } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "../../constant";

const OrderDetailModal = (props) => {
  const { isShowOrderDetailModal, handleCloseModal, orderId, getOrderList } =
    props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const axiostJWT = createAxios(user, dispatch, loginSuccess);
  const [listProduct, setListProduct] = useState();
  const [orderDetail, setOrderDetail] = useState();

  useEffect(() => {
    const getFoodDrinksByOrderId = async (orderId) => {
      const res = await axiostJWT.get("/order/detail/" + orderId);
      if (res.data && res.data.metadata) {
        setOrderDetail(res.data.metadata);
        setListProduct(res.data.metadata.foodDrinks);
      }
    };
    getFoodDrinksByOrderId(orderId);
  }, [orderId]);

  //Huy don
  const handleCancelOrder = async () => {
    try {
      const res = await axiostJWT.post(
        "/order/toggleStatus/" + orderDetail.orderId,
        { orderStatus: ORDER_STATUS.CANCEL }
      );
      if (res.data && res.data.metadata) {
        toast.success("Hủy đơn thành công");
        handleCloseModal();
        getOrderList();
      }
    } catch (error) {
      // toast.error("Có lỗi khi hủy đơn!");
      toast.error(error.response.data.message);
    }
  };

  const handleFinishOrder = async () => {
    try {
      const res = await axiostJWT.post(
        "/order/toggleStatus/" + orderDetail.orderId,
        { orderStatus: ORDER_STATUS.FINISHED }
      );
      if (res.data && res.data.metadata) {
        toast.success("Nhận hàng thành công");
        handleCloseModal();
        getOrderList();
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
          {(orderDetail?.statusCode === ORDER_STATUS.FINISHED && <></>) || (
            <>
              <button
                className="btn btn-danger"
                onClick={() => handleCancelOrder()}
                disabled={
                  orderDetail?.statusCode === ORDER_STATUS.REJECTED ||
                  orderDetail?.statusCode === ORDER_STATUS.CANCEL
                }
              >
                Hủy đơn
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleFinishOrder()}
                disabled={
                  orderDetail?.statusCode === ORDER_STATUS.REJECTED ||
                  orderDetail?.statusCode === ORDER_STATUS.CANCEL
                }
              >
                Xác nhận nhận đơn
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>

      {/* COnfirm modal */}
      <ConfirmModal />
    </>
  );
};

export default OrderDetailModal;
