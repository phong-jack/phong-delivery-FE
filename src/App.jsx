import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Login from './components/Login';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';
import { useState } from 'react';
import ShopCards from './components/ShopCards';
import { Route, Routes } from 'react-router-dom';
import OrderSection from './components/OrderSection';
import './App.scss';


function App() {
    const [isShowLoginModal, setShowLoginModal] = useState(false);

    //Modal handle
    const handleClose = () => {
        setShowLoginModal(false);
    };

    return (
        <>
            <Header
                setShowLoginModal={setShowLoginModal}
            />
            <Container >
                <Routes>
                    <Route path='/' element={<ShopCards />} />
                    <Route path='/order-card' element={<OrderSection />} />
                </Routes>
                <Footer />
            </Container>
            <LoginModal
                isShowLoginModal={isShowLoginModal}
                handleClose={handleClose}
            />
        </>
    );
}

export default App;
