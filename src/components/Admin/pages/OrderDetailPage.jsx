import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import { Table } from "react-bootstrap";
import StatusBadge from "../../Widgets/StatusBadge";
import {
  convertUTCtoVietnamTime,
  getVietNamDongFormat,
  sortOrdersByTime,
} from "../../../utils/func.ulti";
import ReactPaginate from "react-paginate";
import { getOrderByShopPaginate } from "../../../api/order.api";
import { getShopDetail } from "../../../api/shop.api";
import ShopOrderDetailModal from "../../Widgets/ShopOrderDetailModal";

const OrderDetailPage = () => {
  useEffect(() => {
    document.title = "Quản lý đơn hàng";
  }, []);

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [listOrder, setListOrder] = useState();
  const [shop, setShop] = useState();
  const [totalShops, setTotalShops] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShopOpen, setIsShopOpen] = useState(user?.isWorking);
  const [isShowOrderDetailModal, setOrderDetailModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState();

  useEffect(() => {
    getListOrder(1);
    getShopDetailRaw(user.shopId);
  }, []);

  const getShopDetailRaw = async (id) => {
    const shopDetailData = await getShopDetail(id);
    const shopDetail = shopDetailData.metadata;
    setShop(shopDetail);
    setIsShopOpen(shopDetail.isWorking);
  };

  const getListOrder = async (page) => {
    const shopId = user.shopId;
    const perPage = 10;
    const res = await getOrderByShopPaginate(page, perPage, shopId, axiosJWT);
    if (res && res.metadata) {
      setTotalShops(res.metadata.total);
      setTotalPages(res.metadata.totalPages);
      setListOrder(sortOrdersByTime(res.metadata.data));
    }
  };

  const handleToggleShopStatus = async () => {
    try {
      const res = await axiosJWT.post(`/shop/changeStatus/${shop.id}`, {
        isWorking: !isShopOpen,
      });
      if (res.data.metadata) {
        setIsShopOpen(!isShopOpen); // Cập nhật trạng thái của nút checkbox
      }
    } catch (error) {
      console.error("Error toggling shop status:", error);
    }
  };

  const handlePageClick = (event) => {
    getListOrder(Number(event.selected + 1));
  };

  const handleCloseModal = () => {
    setOrderDetailModal(false);
  };

  return (
    <>
      <div class="form-check form-switch mt-5 " style={{ fontSize: "2rem" }}>
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isShopOpen}
          onChange={handleToggleShopStatus}
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">
          Điều chỉnh trạng thái quán
        </label>
      </div>
      <div style={{ minHeight: "1000px" }}>
        <div className="mt-2">
          <h1 className="text-uppercase">Danh sách đơn hàng</h1>
          <div style={{ minHeight: "1000px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="d-flex justify-content-between">ID</th>
                  <th>Món </th>
                  <th>Trạng thái</th>
                  <th>Số tiền</th>
                  <th>Thời gian</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {listOrder &&
                  listOrder?.map((order) => {
                    return (
                      <>
                        <tr>
                          <td>{order.orderId}</td>
                          <td>
                            {order.foodDrinks &&
                              order.foodDrinks.map((foodDrink, index) => (
                                <span key={foodDrink.id}>
                                  {foodDrink.name}
                                  {index !== order.foodDrinks.length - 1 &&
                                    ", "}
                                </span>
                              ))}
                          </td>
                          <td>
                            <StatusBadge statusCode={order.statusCode} />
                          </td>
                          <td>{getVietNamDongFormat(order.totalAmout)}</td>
                          <td>{convertUTCtoVietnamTime(order.updatedAt)}</td>
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => {
                                setOrderDetailModal(true);
                                setSelectedOrderId(order.orderId);
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="pag`e-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
      <ShopOrderDetailModal
        isShowOrderDetailModal={isShowOrderDetailModal}
        handleCloseModal={handleCloseModal}
        orderId={selectedOrderId}
        getListOrder={getListOrder}
      />
    </>
  );
};

export default OrderDetailPage;
