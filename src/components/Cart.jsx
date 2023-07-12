import Link from 'next/link';

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

import { useStateContext } from '../context/StateContext';
import { useEffect, useState } from 'react';

const Cart = () => {
  const { cartItems, setCartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();
  const [totalPriceInCart, setTotalPriceInCart] = useState(0)

  // Looping through the cartItems to get the total quantities
  const getTotalQuantitiesInCart = () => {
    let q = 0;
    cartItems.map((item) => {
      if (item.hasOwnProperty('quantity')) {
        q += item.quantity
      }
    })

    return q;
  }
  const totalQuantitiesInCart = getTotalQuantitiesInCart()

  useEffect(() => {
    const getTotalPriceInCart = () => {
      let totalPrice = 0;
      for (const item of cartItems) {
        if (item.hasOwnProperty('discPrice')) {
          totalPrice += item.discPrice * item.quantity;
        }
      }
      setTotalPriceInCart(totalPrice);
    };
    getTotalPriceInCart();
  }, [cartItems]);

  const handleColorChange = (itemId, newColor) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          color: newColor,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleSizeChange = (itemId, newSize) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          size: newSize,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };
  

  return (
    <div>
         <button
            type="button"
            className="cart-heading"
            onClick={() => setShowCart(false)}>
              <span className="heading">Your Cart</span>
              <span className="cart-num-items">({totalQuantitiesInCart} items)</span>
            </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
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
                    </span>
                    <span className="num">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuantity(item.id, 'inc') }>
                        Increment
                    </span>
                </p>
                </div>
                  <button
                      type="button"
                      className="remove-item underline"
                      onClick={() => onRemove(item)}
                  >
                      Remove
                  </button>
                </div>
                <div>
                  <label htmlFor={`color-${item.id}`}>Color:</label>
                  <input
                    type="text"
                    id={`color-${item.id}`}
                    value={item.color}
                    onChange={(e) => handleColorChange(item.id, e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`size-${item.id}`}>Size:</label>
                  <input
                    type="text"
                    id={`size-${item.id}`}
                    value={item.size}
                    onChange={(e) => handleSizeChange(item.id, e.target.value)}
                  />
                </div>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
            </div>
          </div>
        ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>GHC{totalPriceInCart}</h3>
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
                    {cartItems.map((item) => (
                      <div key={item.id}>
                        <p className='ring-1'>
                          {item.name} <br />
                          {item.color} <br />
                          {item.size} <br />
                        <span className='ml-2 bg-black rounded-[50%] w-1 h-1 object-cover text-white'>
                          {item.quantity}
                        </span>
                        </p>
                      </div>
                    ))}
                    <p>
                      Total quantity: {totalQuantitiesInCart}
                    </p>
                    <p>
                      Total Price: GHC {totalPriceInCart}
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