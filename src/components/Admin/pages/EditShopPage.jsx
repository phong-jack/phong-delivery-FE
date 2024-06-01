import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import { toast } from "react-toastify";

const EditShopPage = () => {
  useEffect(() => {
    document.title = "Thông tin quán";
  }, []);

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const getShopData = async (shopId) => {
    const res = await axiosJWT.get("/shop/" + shopId);
    if (res.data && res.data.metadata) {
      setShopName(res.data.metadata.name);
      setPhone(res.data.metadata.phone);
      setAddress(res.data.metadata.address);
      setImageUrl(res.data.metadata.imageUrl);
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
      setImageUrl(res.data.metadata.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateShop = async () => {
    const res = await axiosJWT.put("/shop/update/" + user.shopId, {
      name: shopName,
      phone: phone,
      address: address,
      imageUrl: imageUrl,
    });
    if (res.data && res.data.metadata) {
      setShopName(res.data.metadata.name);
      setPhone(res.data.metadata.phone);
      setAddress(res.data.metadata.address);
      setImageUrl(res.data.metadata.imageUrl);
      console.log(res.data.metadata);
      toast.success("Cập nhật thông tin quán thành công!");
    }
  };

  useEffect(() => {
    getShopData(user.shopId);
  }, []);

  return (
    <>
      <div
        className="d-flex justify-content-center mt-4"
        style={{ minHeight: "1000px" }}
      >
        <div style={{ width: "50%" }}>
          <h1>Cập nhật thông tin quán</h1>
          <form>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form4Example1"
                className="form-control"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <label class="form-label" for="form4Example1">
                Tên Quán
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="email"
                id="form4Example2"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label className="form-label" for="form4Example2">
                Số điện thoại quán
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                className="form-control"
                id="form4Example3"
                rows="4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <label className="form-label" for="form4Example3">
                Địa chỉ quán
              </label>
            </div>

            <div className="card-header">Ảnh đại diện</div>
            <div className="card-body text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                alt="ảnh đại diện"
                src={imageUrl}
                style={{ width: "150px", height: "150px" }}
              />
              <div class="small font-italic text-muted mb-4">
                JPG hoặc PNG không quá 5 MB
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Chọn file ở đây
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={(event) => handleFileUpload(event)}
                />
              </div>
            </div>
            <button
              data-mdb-ripple-init
              type="button"
              class="btn btn-primary btn-block mb-4 "
              onClick={() => handleUpdateShop()}
            >
              Lưu
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditShopPage;
