import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { axiosClient, createAxios } from "../../../api/axiosConfig";
import { loginSuccess, logoutSuccess } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import ChangePasswordModal from "../ChangePasswordModal";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  if (!user) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }

  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isShowModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axiosJWT.get(`/user/${user.id}`);
      const userData = res.data.metadata;
      setFullName(userData.fullName);
      setEmail(userData.email);
      setAvatar(userData.image);
      setPhone(userData.phone);
      setAddress(userData.address);
      setIsActive(userData.isActive);
    };
    getUserInfo();
  }, []);

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
      setAvatar(res.data.metadata.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axiosJWT.post("/user/update", {
        id: user.id,
        fullName,
        email,
        image: avatar,
        phone,
        address,
      });

      const newUser = res.data.metadata;

      dispatch(loginSuccess({ ...user, ...newUser }));
      toast.success("Thay đổi thông tin thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSendVerifyRequest = async () => {
    const res = await axiosJWT.post("sendVerifyRequest", { email: email });
    if (res.data && res.data.metadata) {
      toast.success("Gửi mail xác thực thành công, Kiểm tra mail");
      console.log(res.data.metadata);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div class="container-xl px-4 mt-5" style={{ height: 800 }}>
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Ảnh đại diện</div>
              <div class="card-body text-center">
                <img
                  class="img-account-profile rounded-circle mb-2"
                  alt="ảnh đại diện"
                  src={avatar}
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
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4">
              <div class="card-header">Thông tin cá nhân</div>
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">
                      Tên của bạn (Hiển thị khi đăng nhập)
                    </label>
                    <input
                      class="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      class="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {(isActive && (
                      <>
                        <span>
                          Mail đã được xác thực{" "}
                          <i class="fa-solid fa-check"></i>
                        </span>
                      </>
                    )) || (
                      <div className="row gx-3 mt-2">
                        <div className=" col-6">
                          <p className="badge bg-danger">
                            Email của bạn chưa được xác thực
                          </p>
                        </div>
                        <div className="col-6 text-end">
                          <span
                            className="btn btn-primary"
                            onClick={() => handleSendVerifyRequest()}
                          >
                            Xác thực
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Số điện thoại
                      </label>
                      <input
                        class="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">
                        Địa chỉ
                      </label>
                      <input
                        class="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start">
                    <button
                      class="btn btn-warning"
                      type="button"
                      onClick={() => handleUpdateProfile()}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      class="btn btn-primary d-flex justify-content-end"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isShowModal={isShowModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ProfilePage;
