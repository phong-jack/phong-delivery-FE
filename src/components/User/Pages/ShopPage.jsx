import { useParams } from "react-router-dom";
import FoodCard from "../FoodCard";
import { useEffect, useState } from "react";
import { getShopDetail } from "../../../api/shop.api";
import { getCategoryByShop } from "../../../api/category.api";
import { getFoodDrinkByShop } from "../../../api/foodDrink.api";
import Rating from "react-rating";

const ShopPage = () => {
  const [shopDetail, setShopDetail] = useState({});
  const [menuList, setMenuList] = useState([]);
  const [foodDrinkList, setFoodDrinkList] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getShopInfo(id);
    getMenuList(id);
    getFoodDrinks(id);
  }, []);

  const getShopInfo = async (id) => {
    const res = await getShopDetail(id);
    if (res && res.metadata) {
      setShopDetail(res.metadata);
    }
  };

  const getMenuList = async (shopId) => {
    const res = await getCategoryByShop(shopId);
    if (res && res.metadata) {
      setMenuList(res.metadata);
    }
  };

  const getFoodDrinks = async (shopId) => {
    const res = await getFoodDrinkByShop(shopId);
    if (res && res.metadata) {
      setFoodDrinkList(res.metadata);
    }
  };

  return (
    <>
      {/* Shop info  */}
      <section style={{ backgroundColor: `#f0f0f0` }}>
        <div className="py-3 container ">
          <div className="row">
            <div className="shop-content-image col-lg-6 col-12">
              <img src={shopDetail.imageUrl} alt="" />
            </div>
            <div className="col-lg-6 col-12 shop-info">
              <div className="shop-container-info mt-4">
                <h3>{shopDetail.name}</h3>
                <p>{shopDetail.address}</p>
                <p>
                  {(shopDetail.isWorking && (
                    <span class="badge bg-success">Đang mở cửa</span>
                  )) || <span class="badge bg-danger">Đã đóng cửa!</span>}
                </p>
                <div>
                  <Rating
                    emptySymbol="fa-regular fa-star"
                    fullSymbol="fa-solid fa-star"
                    initialRating={3}
                  />
                  &nbsp; Có 999 + lượt đánh giá
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shop info  */}

      {/* Shop products!! */}
      <>
        <section className="shop-product-containter mt-5">
          <div className="my-3 container ">
            <div className="row">
              <div className="col-lg-3 mb-4">
                <div className="category">
                  <div className="">
                    <div className="px-3 shadow-lg ">
                      <span className="text-uppercase fw-bold fs-1 ">
                        Thực Đơn
                      </span>
                    </div>
                    <ul className="list-group list-group-light">
                      {menuList?.map((menuItem) => (
                        <li key={menuItem.id} className="list-group-item btn">
                          <a
                            href={`#${menuItem.id}`}
                            className="text-decoration-none text-black"
                          >
                            {menuItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-9 "
                style={{ backgroundColor: "rgb(242, 244, 244)" }}
              >
                <div className="input-group mb-3 my-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text "
                      id="inputGroup-sizing-default"
                    >
                      <i
                        className="fa-solid fa-magnifying-glass"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Tìm món"
                    aria-describedby="inputGroup-sizing-default"
                  />

                  <div className="foods-container col-12 mt-3 ">
                    {menuList?.map((menuItem) => (
                      <div key={menuItem.id} id={menuItem.id}>
                        <p className="h4 text-uppercase">{menuItem.name}</p>
                        {foodDrinkList?.map((foodDrink) => {
                          if (menuItem.id === foodDrink.categoryId) {
                            if (foodDrink.isAvailable) {
                              return (
                                <FoodCard
                                  key={foodDrink.id}
                                  shopDetail={shopDetail}
                                  id={foodDrink.id}
                                  name={foodDrink.name}
                                  price={foodDrink.price}
                                  imageUrl={foodDrink.image}
                                />
                              );
                            }
                          }
                          return null;
                        })}
                      </div>
                    ))}
                    {/* {foodDrinkList?.map((foodDrink) => (
                      <FoodCard
                        id={foodDrink.id}
                        shopDetail={shopDetail}
                        name={foodDrink.name}
                        price={foodDrink.price}
                        imageUrl={foodDrink.image}
                      />
                    ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      {/* Shop products!! */}
    </>
  );
};

export default ShopPage;
