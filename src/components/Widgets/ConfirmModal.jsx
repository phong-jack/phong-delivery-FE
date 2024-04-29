import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  description = "description",
  isShowConfirmModal,
  handleOk,
  handleCancel,
}) => {
  return (
    <div className="static-modal">
      <Modal animation={false} show={isShowConfirmModal} centered>
        <Modal.Body className="">{description}</Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={() => handleCancel()}>
            Hủy
          </Button>
          <Button className="btn btn-primary" onClick={() => handleOk()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
