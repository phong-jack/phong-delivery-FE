import { useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from '../assets/phong-delivery.png';
import { Link } from "react-router-dom";

const Header = (props) => {
  const { setShowLoginModal } = props;

  const [isLogin, setLogin] = useState(false);

  //click login event
  const handleFormLogin = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" >
        <Container>
          <Link to="/" className="navbar-brand"><img src={logo} alt="" width="150" height="30" className="" /></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <Link to="" className="btn mx-2">Đồ Ăn</Link>
              <Link to="" className="btn mx-2">Thức uống</Link>
              <Link to="" className="btn mx-2">Đồ nhậu</Link>
            </Nav>
            <Nav className="align-items-center">

              {isLogin && (
                <>
                  <Link><i className="fa-solid fa-cart-shopping m-2"></i></Link>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle m-2"
                    height={25}
                  />
                  <NavDropdown title="Tên USER" className="">
                    <NavDropdown.Item href="/order-history">Lịch sử đơn hàng</NavDropdown.Item>
                    <NavDropdown.Item href="/user/:userId">Cập nhật thông tin</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">
                      Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) ||
                (
                  <button className="btn btn-warning btn-rounded" onClick={handleFormLogin}>Đăng nhập</button>
                )
              }


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </>
  );
};

export default Header;