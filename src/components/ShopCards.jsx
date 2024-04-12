import React, { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import axios from "axios";
import { BACKEND_URL } from "../constant";
const ShopCards = () => {
  const [listShop, setListShop] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(BACKEND_URL + "/api/v1/shop");
        if (res.data && res.data.metadata) {
          setListShop(res.data.metadata);
        }
        console.log("check list shop:: ", listShop);
      } catch (error) {
        console.log(error);
      }
    };
    getData();

  }, []);

  return (
    <>
      {/* <section id="shops-container" className='mt-5 '>
        <div className="container ">
          <div className="row">
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
          </div>
          <nav aria-label="Page navigation example" className='container-orange'>
            <ul class="pagination" >
              <li class="page-item "><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </section> */}

      <section id="shops-container" className="mt-5 ">
        <div className="container ">
          <div className="row">
            {listShop && listShop.map((shop) => {
              return (
                <>
                  <ShopCard
                    name={shop.name}
                    address={shop.address}
                    imageUrl={shop.imageUrl}
                    isWorking={shop.isWorking}
                  />
                </>
              );
            })}
          </div>
          <nav
            aria-label="Page navigation example"
            className="container-orange"
          >
            <ul class="pagination">
              <li class="page-item ">
                <a class="page-link" href="#">
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default ShopCards;
