import React, { useRef } from 'react';
import Link from 'next/link';
// import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
// import { TiDeleteOutline } from 'react-icons/ti';
// import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';

const Cart = () => {
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  return (
    <div>
         <button
            type="button"
            className="cart-heading"
            onClick={() => setShowCart(false)}>
              {/* <AiOutlineLeft /> */}
              <span className="heading">Your Cart</span>
              <span className="cart-num-items">({totalQuantities} items)</span>
            </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            {/* <AiOutlineShopping size={150} /> */}
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
        {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="flex" key={item.id}>
            <img src={item.image} className="w-[150px] h-[150px] " />
            <div className="item-desc">
                <div className="flex top">
                <h5>{item.name}</h5>
                <h4>GHC{item.discPrice}</h4>
                </div>
                <div className="flex bottom">
                <div>
                <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuantity(item.id, 'dec') }>
                        Decrement
                    {/* <AiOutlineMinus /> */}
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuantity(item.id, 'inc') }>
                        Increment
                        {/* <AiOutlinePlus /> */}
                    </span>
                </p>
                </div>
                <button
                    type="button"
                    className="remove-item underline"
                    onClick={() => onRemove(item)}
                >
                    {/* <TiDeleteOutline /> */}
                    Remove
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>GHC{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="text-white bg-black px-5 py-1" disabled={true}>
                Place Order
              </button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Cart