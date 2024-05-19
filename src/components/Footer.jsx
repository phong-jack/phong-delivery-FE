import React from "react";
import logo from "../assets/phong-delivery.png";

const Footer = () => {
  return (
    <>
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          <img src={logo} alt="logo" className="img-thumbnail" />
          <p className="text-muted">Copyright 2024</p>
        </div>

        <div className="col mb-3"></div>
        <div className="col mb-3"></div>

        <div className="col mb-3">
          <h5>Chi Tiết</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Trang chủ
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Tính Năng
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Giá Cả
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                FAQs
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Về Chúng Tôi
              </a>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5>Dịch vụ</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Đặc đồ ăn
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Tiện ích
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Nhanh chóng
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted">
                Hợp lý
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-muted"></a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
