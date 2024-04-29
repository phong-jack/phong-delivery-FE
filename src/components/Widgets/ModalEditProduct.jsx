import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getFoodDrinkInfo } from "../../api/foodDrink.api";
import { getAllCategory } from "../../api/category.api";
import { getVietNamDongFormat } from "../../utils/func.ulti";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/axiosConfig";
import { loginSuccess } from "../../redux/authSlice";
import { toast } from "react-toastify";

const ModalEditProduct = (props) => {
  const { show, productId, handleCloseModal, getProductPaginate } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState();
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      const res = await getAllCategory();
      if (res && res.metadata) {
        setCategories(res.metadata);
      }
    };

    const getProductDetail = async () => {
      if (!productId) return;
      const res = await getFoodDrinkInfo(productId);
      if (res && res.metadata) {
        setProduct(res.metadata);
      }
    };

    getCategories();
    getProductDetail();
  }, [productId]);

  const handleUpdateProduct = async () => {
    if (isNaN(price)) {
      console.log("fkajsdklfsl", typeof price);
      return;
    }

    try {
      const res = await axiosJWT.put("/foodDrink/update/" + productId, {
        name: productName,
        description,
        price,
        categoryId,
      });
      if (res.data && res.data.metadata) {
        toast.success("Chỉnh sửa thành công!");
        handleCloseModal();
        getProductPaginate(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Thêm món</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mb-2">
                <label htmlFor="name">Tên món</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Nhập vào tên món"
                  className="form-control"
                  required
                  defaultValue={product && product.name}
                  type="text"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="description">Giới thiệu món</label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={product && product.description}
                  placeholder="Nhập vào giới thiệu"
                  className="form-control"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="price">Giá tiền</label>
                <input
                  id="price"
                  name="price"
                  placeholder="Giá tiền của món"
                  className="form-control"
                  required
                  type="text"
                  defaultValue={product && product.price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="categoryId">Category</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  className="form-control"
                  required
                  onChange={(event) => setCategoryId(event.target.value)}
                  defaultValue={product && product.categoryId}
                >
                  <option>Chọn loại món</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="">Ảnh món</label>
                <div>
                  <img
                    className="img-account-profile rounded-circle"
                    alt=""
                    src={product && product.image}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <input
                    id="image"
                    name="image"
                    className="form-control-file px-3"
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileUpload(event)}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleUpdateProduct}>
          Chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditProduct;
