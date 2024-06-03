import React from "react";
import { Link } from "react-router-dom";
import { roundToKm } from "../../utils/func.ulti";

const ShopCard = (props) => {
  const { id, name, address, imageUrl, isWorking, distance } = props;
  console.log(distance);
  return (
    <>
      {
        <div className="card">
          <img src={imageUrl} alt="" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title overflow-text">{name}</h5>
            <p className="card-subtitle my-2 overflow-text">{address}</p>
            {distance && (
              <p className="card-subtitle my-2 overflow-text">
                Khoảng cách: {roundToKm(distance)} Km
              </p>
            )}
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
