import React from "react";
import { Link } from "react-router-dom";

const ShopCard = (props) => {
  const { id, name, address, imageUrl, isWorking } = props;
  return (
    <>
      {/* <div className="col-lg-3 mb-4 col-6">
        <div className="card ">
          <img src="https://images.foody.vn/res/g69/681408/prof/s640x400/foody-upload-api-foody-mobile-img_2952-190327151015.jpg" alt="" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title overflow-text">Donald Trung - Bánh Ướt & Bánh Cuốn Thịt Heo</h5>
            <p className="card-subtitle my-2">Lorem ipsum dolor sit amet.</p>
            <a href="" className="btn btn-outline-success btn-sm">Xem thêm</a>
          </div>
        </div>
      </div> */}
      {
        <div className="card">
          <img src={imageUrl} alt="" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title overflow-text">{name}</h5>
            <p className="card-subtitle my-2 overflow-text">{address}</p>
            <Link to={`/shop/${id}`} className="btn custom-yellow">
              Xem thêm
            </Link>
          </div>
        </div>
      }
    </>
  );
};

export default ShopCard;