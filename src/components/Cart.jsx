import React, { useRef, useState } from 'react';
import Link from 'next/link';
// import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
// import { TiDeleteOutline } from 'react-icons/ti';
// import toast from 'react-hot-toast';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useStateContext } from '../context/StateContext';
import { orderBy } from 'lodash';

const Cart = () => {
  const [showModal, setShowModal] = useState(false)
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Place Order</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Order Summary</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p>
                    {cartItems.map((item) => (
                      <div key={item.id}>
                        <p className='ring-1'>
                          {item.name}
                        <span className='ml-2 bg-black rounded-[50%] w-1 h-1 object-cover text-white'>{item.quantity}</span>
                        </p>
                      </div>
                    ))}
                    <p>
                      {totalQuantities}
                    </p>
                    <p>
                      {totalPrice}
                    </p>
                  </p>
                </div>
                <DialogFooter>
                  <Button disabled={true} className='mt-3'>Proceed to WhatsApp</Button>
                  <Button disabled={true}  type="submit">Copy Order Message</Button>
                </DialogFooter>
                <div>
                  <p className='text-gray-400 text-sm text-center'>Copy and send the order message to us on WhatsApp</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
    </div>
  )
}

export default Cart