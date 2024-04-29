import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { createAxios } from "../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

const ChangePasswordModal = (props) => {
  const { isShowModal, handleCloseModal } = props;

  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");

  const user = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !renewPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (newPassword !== renewPassword) {
      toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await axiosJWT.post(`/changePassword/${user.id}`, {
        oldPassword,
        newPassword,
      });
      if (res.data && res.data.metadata) {
        toast.success("Mật khẩu đã được thay đổi thành công.");
        setOldPassword("");
        setNewPassword("");
        setRenewPassword("");
        handleCloseModal();
      } else {
        toast.error("Lỗi khi thay đổi mật khẩu");
      }
    } catch (error) {
      toast.error("Lỗi khi thay đổi mật khẩu");
    }
  };

  return (
    <Modal
      show={isShowModal}
      onHide={handleCloseModal}
      backdrop="static"
      centered
    >
      <Modal.Header>
        <div className="modal-title h4">Đổi mật khẩu </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <div className="form-group mb-2">
              <label for="exampleInputPassword">Mật khẩu cũ</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword"
                placeholder="Nhập vào mật khẩu cũ"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label for="exampleInputPassword2">Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="Mật khẩu mới"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label for="exampleInputPassword3">Nhập lại mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword3"
                placeholder="Nhập lại mật khẩu mới"
                onChange={(e) => setRenewPassword(e.target.value)}
              />
            </div>
            <div className="d-flex flex-row-reverse mt-3">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleChangePassword()}
              >
                Đổi mật khẩu
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="col-4 mt-3 btn btn-dark" onClick={handleCloseModal}>
          <i className="fa-solid fa-angles-left "></i>Go Back
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
