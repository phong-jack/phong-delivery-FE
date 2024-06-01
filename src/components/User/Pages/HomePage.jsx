import React, { useEffect } from "react";
import ShopCards from "../ShopCards";

const HomePage = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);
  return (
    <>
      <ShopCards />
    </>
  );
};

export default HomePage;
