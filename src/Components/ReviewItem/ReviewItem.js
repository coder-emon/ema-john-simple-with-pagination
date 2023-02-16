import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import "./ReviewItem.css";
const ReviewItem = ({ product, handleDeleteItem }) => {
  const { img, name, price, quantity, shipping, id } = product;

  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-details-btn">
        <div className="review-details">
          <h5>{name}</h5>
          <p>Qrice ${price}</p>
          <p>Quantity: {quantity}</p>
          <p>Shipping: {shipping}</p>
        </div>

        <div className="delete-btn-wraper" onClick={() => handleDeleteItem(id)}>
          <FontAwesomeIcon
            className="delete-btn"
            icon={faTrashCan}
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
