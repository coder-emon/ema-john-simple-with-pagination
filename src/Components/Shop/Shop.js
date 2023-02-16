import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // const { products } = useLoaderData();
  const { loader, setLoader } = useContext(AuthContext)

  const [cart, setCart] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoader(true)
    fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setCount(data.count)
        setLoader(false)
      })
  }, [page, size])

  const pages = Math.ceil(count / size)



  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
      setCart(newCart);
    } else {
      const rest = cart.filter((product) => product._id !== selectedProduct._id);
      selectedProduct.quantity = exists.quantity + 1;
      newCart = [...rest, selectedProduct];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  useEffect(() => {
    const storedCart = getShoppingCart();
    const saveCart = [];
    const ids = Object.keys(storedCart)
    fetch("http://localhost:5000/productsbyids", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(ids)
    })
      .then(res => res.json())
      .then(cartData => {
        if (storedCart) {
          for (const id in storedCart) {
            const addedProduct = cartData.find((product) => product._id === id);
            if (addedProduct) {
              const quantiy = storedCart[id];
              addedProduct.quantity = quantiy;
              saveCart.push(addedProduct);
            }
          }
        }
        setCart(saveCart);
      })
      .catch(err => {
        console.error(err);
      })

  }, [products]);
  if (loader) {
    console.log("Loading found");
    return <Loader></Loader>;
  }
  console.log(page, pages)
  return (
    <div className="shop-container">
      <div>
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="pagination-container">
          <span className="next_prev" onClick={() => setPage(page && page - 1)}>Prev</span>
          {
            [...Array(pages).keys()].map(number => <span className={number == page ? "selceted" : "pagination"} key={number} onClick={() => setPage(number)}>{number + 1}</span>)
          }
          <span className="next_prev" onClick={() => setPage(page < pages - 1 ? (page + 1) : pages - 1)}>Next</span>
          <select onChange={(e) => setSize(e.target.value)}>
            <option value="5" selected={size == 5} >5</option>
            <option value="10" selected={size == 10}>10</option>
            <option value="15" selected={size == 15}>15</option>
            <option value="20" selected={size == 20}>20</option>
          </select>
        </div>
      </div>
      <div className="cart-container">
        <Cart cart={cart} clearCart={clearCart}></Cart>
      </div>

    </div>
  );
};

export default Shop;
