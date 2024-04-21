import {
  MDBBtn,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";

const OrderCart = (props) => {
  const { id, name, description, price, quanity, image } = props;
  console.log(
    "Check order cart: ",
    id,
    name,
    description,
    price,
    quanity,
    image
  );
  return <></>;
};

export default OrderCart;
