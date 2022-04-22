import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
   // console.log(props.product);
    const { img, name, seller, stock, price, star } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
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
                <button 
                className='main-button' onClick={() => props.handleAddProduct(props.product)}> 
                <FontAwesomeIcon icon={faShoppingCart}/>
                Add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;