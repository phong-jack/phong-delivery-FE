import React, { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import { getShopsPaginate } from "../../api/shop.api";
import ReactPaginate from "react-paginate";

const ShopCards = () => {
  const [listShop, setListShop] = useState([]);
  const [totalShops, setTotalShops] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getShops();
  }, []);

  //get list shop
  const getShops = async (page) => {
    try {
      const res = await getShopsPaginate(page);
      if (res && res.metadata) {
        setTotalShops(res.metadata.total);
        setTotalPages(res.metadata.totalPages);
        setListShop(res.metadata.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (event) => {
    getShops(Number(event.selected + 1));
  };

  return (
    <>
      <section id="shops-container" className="mt-5 ">
        <div className="container">
          <div className="row" style={{ minHeight: "1000px" }}>
            {listShop &&
              listShop.map((shop) => {
                return (
                  <div key={`shop ${shop.id}`} className="col-lg-3 mb-4 col-6">
                    <ShopCard
                      id={shop.id}
                      name={shop.name}
                      address={shop.address}
                      imageUrl={shop.imageUrl}
                      isWorking={shop.isWorking}
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
    </>
  );
};

export default ShopCards;
