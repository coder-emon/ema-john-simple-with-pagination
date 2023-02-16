import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
const Orders = () => {
  const data = useLoaderData();
  const { previousCart } = data;
  const [cart, setCart] = useState(previousCart);
  const handleDeleteItem = (id) => {
    const rest = cart.filter((product) => product._id !== id);
    setCart(rest);
    removeFromDb(id);
  };
  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div>
      <div className="orders-container">
        <div className="review-container">
          {cart.map((product) => (
            <ReviewItem
              handleDeleteItem={handleDeleteItem}
              key={product._id}
              product={product}
            ></ReviewItem>
          ))}
          {cart.length === 0 && (
            <h1>
              No items for review. Please <Link to="/shop">Shop</Link>
            </h1>
          )}
        </div>
        <div className="review-cart-container">
          <div className="review-cart">
            <Cart cart={cart} clearCart={clearCart}></Cart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
