import { Container } from "react-bootstrap";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/User/Pages/HomePage";
import ShopPage from "./components/User/Pages/ShopPage";
import { ToastContainer } from "react-toastify";
import OrderPage from "./components/User/Pages/OrderPage";
import ProfilePage from "./components/User/Pages/ProfilePage";
import ErrorPage from "./components/User/Pages/ErrorPage";

function App() {
  const [isShowLoginModal, setShowLoginModal] = useState(false);

  //Modal handle
  const handleClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Header setShowLoginModal={setShowLoginModal} />
      <Container>
        <Routes>
          {/* Page for USER */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route path="/order-card" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Page for SHOP */}

          {/* Page mặc định */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </Container>
      <LoginModal
        isShowLoginModal={isShowLoginModal}
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
