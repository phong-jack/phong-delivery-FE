import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUserApi } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const { handleClose } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [isShowPass, setShowPass] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const isShowPassword = () => {
    setShowPass(!isShowPass);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !phone ||
      !username ||
      !password ||
      !repassword ||
      !fullName
    ) {
      toast.error("Vui lòng điền vào tất cả các trường.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      console.log("Số điện thoại không hợp lệ.");
      return;
    }

    const newUser = {
      email,
      phone,
      username,
      password,
      fullName,
    };

    try {
      const res = await registerUserApi(newUser);
      if (res && res.metadata) {
        toast.success("Đăng ký thành công, kiểm tra email!");
        handleClose();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div
        className="login-container col-12 d-flex flex-column container"
        style={{ color: "orange" }}
      >
        <div className="title fs-2 text-center fw-bold">
          Đăng ký tài khoản Phong Delivery
        </div>
        <div className="text fw-medium mt-4">Email</div>
        <input
          type="text"
          placeholder="Nhập vào email"
          className="mt-2 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="text fw-medium">Số điện thoại</div>
        <input
          type="text"
          placeholder="Nhập vào số diện thoại"
          className="mt-2 p-2 border"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="text fw-medium">Tài khoản</div>
        <input
          type="text"
          placeholder="Tài khoản..."
          className="mt-2 p-2 border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="text fw-medium">Mật khẩu</div>
        <div className="position-relative">
          <input
            type={isShowPass === true ? "text" : "password"}
            placeholder="Mật khẩu"
            className="mt-2 p-2 border w-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={
              isShowPass === true
                ? "fa-solid fa-eye position-absolute top-50"
                : "fa-solid fa-eye-slash position-absolute top-50"
            }
            style={{ right: "10px", cursor: "pointer" }}
            onClick={isShowPassword}
          ></i>
        </div>
        <div className="text fw-medium">Nhập lại mật khẩu</div>
        <div className="position-relative">
          <input
            type={isShowPass === true ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            className="mt-2 p-2 border w-100"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
          <i
            className={
              isShowPass === true
                ? "fa-solid fa-eye position-absolute top-50"
                : "fa-solid fa-eye-slash position-absolute top-50"
            }
            style={{ right: "10px", cursor: "pointer" }}
            onClick={isShowPassword}
          ></i>
        </div>
        <div className="text fw-medium">Tên người dùng</div>
        <input
          type="text"
          placeholder="Nhập vào tên người dùng"
          className="mt-2 p-2 border"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <button
          className="col-12 m-auto mt-4 btn btn-warning"
          disabled={!username || !password}
          onClick={(e) => handleRegister(e)}
        >
          {loadingApi && <i className="fa-solid fa-spinner fa-spin"></i>}
          &nbsp;Đăng nhập
        </button>
      </div>
    </>
  );
};

export default Register;
