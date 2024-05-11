import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Register from "./Register";

const RegisterModal = (props) => {
  const { isShowRegisterModal, handleClose } = props;

  return (
    <>
      <Modal show={isShowRegisterModal} onHide={handleClose} backdrop="static">
        <Modal.Header style={{ color: "orange !important" }}>
          <div className="modal-title h4" style={{ color: "orange" }}>
            Chào mừng đến với Phong Delivery{" "}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Register handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <div className="col-4 mt-3 btn btn-dark" onClick={handleClose}>
            <i className="fa-solid fa-angles-left "></i>Go Back
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterModal;
