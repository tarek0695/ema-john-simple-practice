import React from 'react';
// import '../Product/Product.css';


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price, 0).toFixed(2);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }else if(total > 15){
        shipping = 4.99;
    } else if(total > 0){
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2);
    // const tax = Math.round(total / 10);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNum = num => {
        const precission = num.toFixed(2);
        return Number(precission);
    }
    return (

        <div>
            <h4>Order Summary</h4>
            <p>Item Ordered: {cart.length}</p>
            <p>Product price: ${total.toFixed(2)}</p>
            <p><small>Shipping fee: ${formatNum(shipping)}</small></p>
            <p><small>Tax: ${tax}</small></p>
            <p>Total price: ${grandTotal}</p>

            {props.children}
            
        </div>

        
    );
};

export default Cart;