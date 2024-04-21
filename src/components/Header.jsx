import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../assets/phong-delivery.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../api/axiosConfig";
import { logoutSuccess } from "../redux/authSlice";
import { logOut } from "../services/auth.service";
import { toast } from "react-toastify";
import { removeOrderDetail } from "../services/order.service";

const Header = (props) => {
  const { setShowLoginModal } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login.currentUser);
  const order = useSelector((state) => state.order.currentOrder);
  const accessToken = user?.tokens.accessToken;

  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  //click login event
  const handleFormLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    const logoutResult = logOut(dispatch, navigate, accessToken, axiosJWT);
    removeOrderDetail(dispatch);
    if (logoutResult) {
      toast.success("Đăng xuất thành công!");
    } else {
      toast.error("Đăng xuất thất bại!");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="" width="150" height="30" className="" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="" className="btn mx-2">
                Đồ Ăn
              </Link>
              <Link to="" className="btn mx-2">
                Thức uống
              </Link>
              <Link to="" className="btn mx-2">
                Đồ nhậu
              </Link>
            </Nav>
            <Nav className="align-items-center">
              {(user && (
                <>
                  <Link to="/order-card">
                    <i
                      className="fa-solid fa-cart-shopping m-2"
                      style={{ color: "orange" }}
                    >
                      <span class="badge rounded-pill badge-notification bg-danger">
                        {order?.orderDetails ? order.orderDetails.length : 0}
                      </span>
                    </i>
                  </Link>
                  <img
                    src={user.image}
                    className="rounded-circle m-2"
                    height={25}
                  />
                  <NavDropdown title={user.fullName} className="">
                    <li>
                      <Link to="/order-history" className="dropdown-item">
                        Lịch sử đơn hàng
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Cập nhật thông tin
                      </Link>
                    </li>

                    <NavDropdown.Divider />

                    <Link
                      to="/"
                      className="dropdown-item"
                      onClick={() => handleLogout()}
                    >
                      Đăng xuất
                    </Link>
                  </NavDropdown>
                </>
              )) || (
                <button
                  className="btn btn-warning btn-rounded"
                  onClick={handleFormLogin}
                >
                  Đăng nhập
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
