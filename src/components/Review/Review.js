import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
// import happyImage from '../..images/giphy.gif';
import happyImage from '../../images/giphy.gif';
import { Navigate, useNavigate } from 'react-router-dom';

const Review = () => {
    const [carts, setCarts] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    let navigate = useNavigate();

    const handleProceedCheckout = () => {
        // setCarts([]);
        // processOrder();
        // setOrderPlaced(true);
        navigate('/shipment');
    }
    const removeProduct = (productKey) => {
        const newCart = carts.filter(pd => pd.key !== productKey);
        setCarts(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {

        //cart
        const savedCart = getDatabaseCart();
        //console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;

        });
        setCarts(cartProducts);
    }, [])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="" />
    }
    
    return (

    

        <div className='twin-container'>
            <div style={{ float: 'left' }} className="product-container">
                {/* <h3>Order review:</h3>
            <h4>Cart items: {carts.length}</h4> */}
                {
                    carts.map(pd => <ReviewItem
                        product={pd}
                        key={pd.key}
                        removeProduct={removeProduct}
                    ></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div  className="cart-container">
                <Cart cart={carts}>
                <button onClick={handleProceedCheckout} className='main-button'>Proceed to checkout</button>
                </Cart>
            </div>
        </div>

    );
};

export default Review;