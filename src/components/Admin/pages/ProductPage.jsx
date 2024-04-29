import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ConfirmModal from "../../Widgets/ConfirmModal";
import {
  getFoodDrinkInfo,
  getFoodDrinkPaginate,
} from "../../../api/foodDrink.api";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import ModalAddNewProduct from "../../Widgets/ModalAddNewProduct";
import { getVietNamDongFormat } from "../../../utils/func.ulti";
import ModalEditProduct from "../../Widgets/ModalEditProduct";

const ProductPage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [isShowConfirmModal, setShowConfirmModal] = useState(false);
  const [listProduct, setListProduct] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const [isShowModalEdit, setShowModalEdit] = useState(false);

  const getProductPaginate = async (page) => {
    const perpage = 15;
    const res = await getFoodDrinkPaginate(user.shopId, page, perpage);
    if (res && res.metadata) {
      setTotalProduct(res.metadata.total);
      setTotalPages(res.metadata.totalPages);
      setListProduct(res.metadata.data);
    }
  };

  const handlePageClick = async (event) => {
    getProductPaginate(Number(event.selected + 1));
  };

  useEffect(() => {
    getProductPaginate(1);
  }, []);

  const handleCloseModal = () => {
    setShowModalAddNew(false);
    setShowModalEdit(false);
  };

  const handleConfirmOke = async () => {
    await handleDeleteProduct(selectedProductId);
    setShowConfirmModal(false);
    await getProductPaginate(1);
  };

  const handleToggleProductStatus = async (id) => {
    const resFoodDrink = await getFoodDrinkInfo(id);
    const foodDrinkInfo = resFoodDrink.metadata;
    const isAvailable = foodDrinkInfo.isAvailable;
    const res = await axiosJWT.put("/foodDrink/changeStatus/" + id, {
      isAvailable: !isAvailable,
    });
    if (res.data && res.data.metadata) {
      getProductPaginate(1);
    }
  };

  const handleDeleteProduct = async (id) => {
    const res = await axiosJWT.delete(`/foodDrink/${id}`);
    if (res.data && res.data.metadata) {
      toast.success("Xóa thành công!");
    }
  };

  const handleOpenModalEdit = (productId) => {
    setSelectedProductId(productId);
    setShowModalEdit(true);
  };

  return (
    <>
      <div className="my-3 add-new " style={{ height: "1000px" }}>
        <div className="mb-3 d-flex justify-content-between">
          <span>
            <b className="h3">Danh sách món</b>
          </span>{" "}
          <button
            className="btn btn-success"
            onClick={() => setShowModalAddNew(true)}
          >
            Thêm món mới
          </button>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="d-flex justify-content-between">ID</th>
                <th>Ảnh</th>
                <th>Tên món</th>
                <th>Giới thiệu</th>
                <th>Giá tiền</th>
                <th>Hành động</th>
                <th style={{ width: "10%" }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {listProduct &&
                listProduct?.map((product) => {
                  return (
                    <>
                      <tr>
                        <td>{product.id}</td>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "50px", height: "50px" }}
                          />{" "}
                          {/* Ảnh nhỏ */}
                        </td>
                        <td> {product.name}</td>
                        <td>{product.description}</td>
                        <td>{getVietNamDongFormat(product.price)}</td>
                        <td>
                          <button
                            className="btn btn-warning mx-3"
                            onClick={() => handleOpenModalEdit(product.id)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setShowConfirmModal(true);
                              setSelectedProductId(product.id);
                            }}
                          >
                            Xóa
                          </button>
                        </td>
                        <td>
                          <div
                            class="form-check form-switch"
                            style={{ fontSize: "2rem" }}
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={product.isAvailable}
                              onChange={() =>
                                handleToggleProductStatus(product.id)
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            ></label>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
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

      <ConfirmModal
        description="Đồng ý xóa?"
        isShowConfirmModal={isShowConfirmModal}
        handleOk={handleConfirmOke}
        handleCancel={() => setShowConfirmModal(false)}
      />
      <ModalAddNewProduct
        show={isShowModalAddNew}
        handleCloseModal={handleCloseModal}
        getProductPaginate={getProductPaginate}
      />
      <ModalEditProduct
        show={isShowModalEdit}
        handleCloseModal={handleCloseModal}
        getProductPaginate={getProductPaginate}
        productId={selectedProductId}
      />
    </>
  );
};

export default ProductPage;
