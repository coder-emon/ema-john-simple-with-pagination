import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = ({ cart, clearCart }) => {
  // console.log(cart);
  let total = 0;
  let shippig = 0;
  let tax = 0;
  let quantity = 0;

  for (let product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shippig = shippig + product.shipping;
    tax = parseFloat((total * 0.1).toFixed(2));
  }
  let grandTotal = total + shippig + tax;

  return (
    <div className="cart">
      <h3>Order Summary</h3>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping Charge: ${shippig} </p>
      <p>Tax: ${tax}</p>
      <h4>Grand Total: ${grandTotal}</h4>
      <div className="btn-wraper">
        <button className="clear-cart" onClick={clearCart}>
          Clear Cart{" "}
          <span>
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </span>
        </button>{" "}
        <br />
        <Link to="/orders">
          <button className="review-cart-btn">
            Review Cart{" "}
            <span>
              <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
