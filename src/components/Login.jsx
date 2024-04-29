import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { toast } from "react-toastify";

const Login = (props) => {
  const { handleClose } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setShowPass] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const isShowPassword = () => {
    setShowPass(!isShowPass);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    try {
      const userInfo = await loginUser(newUser, dispatch, navigate);
      if (userInfo) {
        handleClose();
        toast.success("Đăng nhập thành công!");
        if (userInfo.isShop) {
          navigate("/admin/order");
        }
      } else {
        toast.error("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="login-container col-12 d-flex flex-column container"
        style={{ color: "orange" }}
      >
        <div className="title fs-2 text-center fw-bold">
          Đăng nhập vào Phong Delivery
        </div>
        <div className="text fw-medium mt-4">Tài khoản</div>
        <input
          type="text"
          placeholder="Tài khoản..."
          className="mt-2 p-2 border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
        <button
          className="col-12 m-auto mt-4 btn btn-warning"
          disabled={!username || !password}
          onClick={(e) => handleLogin(e)}
        >
          {loadingApi && <i className="fa-solid fa-spinner fa-spin"></i>}
          &nbsp;Đăng nhập
        </button>
      </div>
    </>
  );
};

export default Login;
