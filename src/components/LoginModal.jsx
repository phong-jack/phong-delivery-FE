import React, { useState } from 'react';
import Login from './Login';
import { Button, Modal } from 'react-bootstrap';

const LoginModal = (props) => {
    const { isShowLoginModal, handleClose } = props;



    return (
        <>
            <Modal
                show={isShowLoginModal}
                onHide={handleClose}
                backdrop="static"

            >
                <Modal.Header style={{ color: "orange !important" }}>
                    <div className='modal-title h4'
                        style={{ color: "orange" }}>Chào mừng đến với Phong Delivery </div>
                </Modal.Header>
                <Modal.Body>
                    <Login />
                </Modal.Body>
                <Modal.Footer>
                    <div className='col-4 mt-3 btn btn-dark' onClick={handleClose}>
                        <i className='fa-solid fa-angles-left '></i>Go Back
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LoginModal;