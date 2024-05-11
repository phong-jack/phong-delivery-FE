import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { findShopPaginate } from "../../api/shop.api";

const SearchModal = (props) => {
  const { show, handleClose, setTotalShops, setTotalPages, setListShop } =
    props;

  const [searchInput, setSearchInput] = useState("");

  //get list shop
  const findShop = async (page) => {
    try {
      const res = await findShopPaginate(searchInput, page);
      if (res && res.metadata) {
        setTotalShops(res.metadata.total);
        setTotalPages(res.metadata.totalPages);
        setListShop(res.metadata.data);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tìm kiếm</Modal.Title>
        </Modal.Header>
        <div class="modal-body">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <span
              class="input-group-text border-0 btn"
              id="search-addon"
              onClick={() => findShop(1)}
            >
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
