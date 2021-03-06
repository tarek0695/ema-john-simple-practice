import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    // console.log(props);
    const { img, name, seller, stock, price, star, key } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/" + key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>only {stock} left in stock - order soon</small></p>

                {/* parameter pass korle function ei rokom call kora jabe na.
                {props.handleAddProduct(props.product)}
                karon click korar sob function call hoye jay */}
                {/* <button className='main-button' 
                onClick={props.handleAddProduct(props.product)}>
                <FontAwesomeIcon icon={faShoppingCart}/> Add to cart
                </button> */}
                {props.showAddToCart && <button
                    className='main-button' onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;