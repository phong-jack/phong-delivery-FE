import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findShopByQuery } from "../../../api/shop.api";
import ReactPaginate from "react-paginate";
import ShopCard from "../ShopCard";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";

const SearchBox = () => {
  useEffect(() => {
    document.title = "Tìm kiếm";
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const [listShop, setListShop] = useState([]);
  const [totalShops, setTotalShops] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const findShopsByDistance = async () => {
    try {
      const res = await axiosJWT.get("/shop/find/by-distance");
      if (res.data && res.data.metadata) {
        setTotalShops(res.data.metadata.count);
        setListShop(res.data.metadata.shops);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //find shop by query
  const findShops = async (query, page) => {
    try {
      const res = await findShopByQuery(query, page);
      if (res && res.metadata) {
        setTotalShops(res.metadata.total);
        setTotalPages(res.metadata.totalPages);
        setListShop(res.metadata.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFindShops = async () => {
    if (!searchInput) return;
    findShops(searchInput, 1);
  };

  const handlePageClick = (event) => {
    findShops(searchInput, Number(event.selected + 1));
  };

  return (
    <>
      <div
        className="form-outline d-flex align-items-center mt-5"
        data-mdb-input-init
      >
        <input
          type="search"
          id="form1"
          className="form-control"
          placeholder="Tìm kiếm quán"
          aria-label="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-warning"
          data-mdb-ripple-init
          onClick={() => handleFindShops()}
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
      {user && (
        <button
          className="btn btn-warning mt-3"
          onClick={() => findShopsByDistance()}
        >
          Gợi ý quán theo khoảng cách
        </button>
      )}
      <div>
        <section id="shops-container" className="mt-5 ">
          <div className="container ">
            <div className="row" style={{ minHeight: "1000px" }}>
              {listShop &&
                listShop.map((shop) => {
                  return (
                    <div
                      key={`shop ${shop.id}`}
                      className="col-lg-3 mb-4 col-6"
                    >
                      <ShopCard
                        id={shop.id}
                        name={shop.name}
                        address={shop.address}
                        imageUrl={shop.imageUrl}
                        isWorking={shop.isWorking}
                        distance={shop.distance}
                      />
                    </div>
                  );
                })}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="pag`e-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default SearchBox;
