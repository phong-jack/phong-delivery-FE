import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/axiosConfig";
import { logoutSuccess } from "../../redux/authSlice";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/phong-delivery.png";
import ErrorPage from "../User/Pages/ErrorPage";
import { logOut } from "../../services/auth.service";
import { toast } from "react-toastify";
import { removeOrderDetail } from "../../services/order.service";

const HeaderAdmin = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const accessToken = user?.tokens.accessToken;

  if (!user.isShop) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }

  const handleLogout = async () => {
    const logoutResult = await logOut(
      dispatch,
      navigate,
      accessToken,
      axiosJWT
    );
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
          <Link to="/admin/order" className="navbar-brand">
            <img src={logo} alt="" width="150" height="30" className="" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/admin/order" className="btn mx-2">
                Đơn hàng
              </Link>
              <Link to="/admin/product" className="btn mx-2">
                Món
              </Link>
              <Link to="/admin/dashboard" className="btn mx-2">
                Thống kê
              </Link>
            </Nav>
            <Nav className="align-items-center">
              {(user && user.isShop && (
                <>
                  <img
                    src={user.image}
                    className="rounded-circle m-2"
                    height={25}
                  />
                  <NavDropdown title={user.fullName} className="">
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

export default HeaderAdmin;
