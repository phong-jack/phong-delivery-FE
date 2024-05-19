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
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState();
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  const getProductDetail = async (productId) => {
    console.log(productId);
    if (!productId) return;
    const res = await getFoodDrinkInfo(productId);
    if (res && res.metadata) {
      setProduct(res.metadata);
      setProductName(res.metadata.name);
      setImage(res.metadata.image);
      setDescription(res.metadata.description);
      setPrice(res.metadata.price);
      setCategoryId(res.metadata.categoryId);
    }
  };
  useEffect(() => {
    const getCategories = async () => {
      const res = await getAllCategory();
      if (res && res.metadata) {
        setCategories(res.metadata);
      }
    };

    getCategories();
    getProductDetail(productId);
  }, [productId, show]);

  const handleUpdateProduct = async () => {
    if (isNaN(price)) {
      toast.error("Số tiền phải là số");
      return;
    }

    try {
      const res = await axiosJWT.put("/foodDrink/update/" + productId, {
        name: productName,
        description,
        price,
        image,
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axiosJWT.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu là form-data
        },
      });
      setImage(res.data.metadata.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
    if (/^\d*$/.test(inputPrice)) {
      setPrice(inputPrice);
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Thêm món</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product && (
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
                    value={productName}
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="description">Giới thiệu món</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
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
                    value={price}
                    onChange={handlePriceChange}
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
                    value={categoryId}
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
                      src={image}
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
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleCloseModal();
          }}
        >
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
