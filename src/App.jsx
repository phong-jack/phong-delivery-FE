import { Container } from "react-bootstrap";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/User/Pages/HomePage";
import ShopPage from "./components/User/Pages/ShopPage";
import { ToastContainer } from "react-toastify";
import OrderPage from "./components/User/Pages/OrderPage";
import ProfilePage from "./components/User/Pages/ProfilePage";
import ErrorPage from "./components/User/Pages/ErrorPage";
import OrderHistoryPage from "./components/User/Pages/OrderHistoryPage";
import DashboardPage from "./components/Admin/pages/DashboardPage";
import ProductPage from "./components/Admin/pages/ProductPage";
import { useSelector } from "react-redux";
import HeaderAdmin from "./components/Admin/HeaderAdmin";
import OrderDetailPage from "./components/Admin/pages/OrderDetailPage";
import RegisterModal from "./components/RegisterModal";
import SearchBox from "./components/User/Pages/SearchPage";
import SearchPage from "./components/User/Pages/SearchPage";
import SuccessPay from "./components/User/Pages/SuccessPay";
import EditShopPage from "./components/Admin/pages/EditShopPage";

function App() {
  const [isShowLoginModal, setShowLoginModal] = useState(false);
  const [isShowRegisterModal, setShowRegisterModal] = useState(false);
  const user = useSelector((state) => state.auth?.login.currentUser);

  //Modal handle
  const handleClose = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <>
      {(user && user.isShop && <HeaderAdmin />) || (
        <Header
          setShowLoginModal={setShowLoginModal}
          setShowRegisterModal={setShowRegisterModal}
        />
      )}

      <Container>
        <Routes>
          {/* Page for USER */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route path="/order-card" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/search" element={<SearchBox />} />
          <Route path="/success" element={<SuccessPay />} />

          {/* Page for SHOP */}
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/product" element={<ProductPage />} />
          <Route path="/admin/order" element={<OrderDetailPage />} />
          <Route path="/admin/edit-shop" element={<EditShopPage />} />

          {/* Page mặc định */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </Container>
      <LoginModal
        isShowLoginModal={isShowLoginModal}
        handleClose={handleClose}
      />
      <RegisterModal
        isShowRegisterModal={isShowRegisterModal}
        handleClose={handleClose}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
