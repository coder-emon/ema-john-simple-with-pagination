import React from "react";
import loaderImg from "../../assets/Loader.gif";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader-flex">
      <h2>Loading...</h2>
      <img src={loaderImg} alt="" />
    </div>
  );
};

export default Loader;
