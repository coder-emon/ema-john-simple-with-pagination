import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './Product.css'
const Product = ({product, handleAddToCart}) => {
    const {img, name, price, ratings, seller } = product
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className="product-info">
                <div className="name_price">
                    <h6>{name}</h6>
                    <h6>Price: ${price}</h6>
                </div>
                <div className="seller_review">
                    <p>Manufacturer: {seller}</p>
                    <p>Ratings: {ratings}</p>
                </div>
            </div>
            <button className='addtocart' onClick={() => handleAddToCart(product)}>
                <p>Add to Cart <span> <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon></span></p>
            </button>
        </div>
    );
};

export default Product;