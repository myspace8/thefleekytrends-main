import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Fragment, useEffect, useState } from "react";


import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useStateContext} from '@/context/StateContext';
import { getProduct } from "@/firebase/firestore/getData";
// import {useProductList} from "@/utils/productFunctions"


const Cart = () => {
  const { cartItems, setCartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();
  const [totalPriceInCart, setTotalPriceInCart] = useState(0)
  // const [productList, setProductList] = useState([])
  // const [loading, setLoading] = useState(true)

  // const { productList, loading } = useProductList(cartItems);




  //  Fetching data from Firebase for each product in the cart to retrieve the color/size values.
  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     try {
  //       const productPromises = cartItems.map((item) => getProduct(item.id));
  //       const productList = await Promise.all(productPromises);
  //       setProductList(productList);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (cartItems.length > 0) {
  //     fetchProductList();
  //   }
  // }, [cartItems]);
  // console.log(productList)
  

  // const hasColors = Array.isArray(productList.color);

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
    <div className=''>
      <Sheet>
          <SheetTrigger asChild>
            <button type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
            </button>
          </SheetTrigger>
          <SheetContent side={'top'} className='h-full'>
          <div>
              <span className="text-lg font-bold uppercase">Your Shopping Bag</span>
              <span className=""> ({totalQuantitiesInCart} items)</span>
          </div>
          {cartItems.length < 1 && (
            <div className="bg-red-100">
              <h3>Your shopping bag is empty</h3>
              <Link href="/">
                  Continue Shopping
              </Link>
            </div>
          )}
          <div className="flex  bg-indigo-200 p-2">
          {cartItems.length >= 1 && cartItems.map((item) => (
          <div className="flex gap-2" key={item.id}>
            <img src={item.image} className="w-[150px] h-[150px] object-cover " />
            <div className="border border-red-300">
                <div className="flex">
                  <h5 className='text-sm font-semibold'>{item.name}</h5>
                  {/* <h4>GHC{item.discPrice}</h4> */}
                </div>
                <div className='flex gap-2 mt-1'>
                <Tabs defaultValue="color-1">
                  <TabsList>
                    <TabsTrigger value="color-1">
                      <img src={item.image} className="w-[40px] h-[40px] object-cover" />
                    </TabsTrigger>
                    <TabsTrigger value="color-2">
                      <img src={item.image} className="w-[40px] h-[40px] object-cover" />
                    </TabsTrigger>
                    <TabsTrigger value="color-3">
                      <img src={item.image} className="w-[40px] h-[40px] object-cover" />
                    </TabsTrigger>
                  </TabsList>
                  {/*  */}
                  <TabsContent value="color-1">
                    <span>Showing color 1</span>
                    <div className='flex justify-between bg-slate-600'>
                      <div className='w-min'>
                        <span>Size</span>
                        <div className='flex flex-col gap-1'> 
                          <button className='bg-gray-200'>37</button>
                          <button className='bg-gray-200'>39</button>
                          <button className='bg-gray-200'>40</button>
                        </div>
                      </div>
                      <div>
                        <span>Quantity</span>
                        <div className='flex flex-col gap-1'>
                          <div className='flex items-center'>
                            <div className='bg-gray-300 relative h-4 w-4 border border-red-500'>
                              <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>-</button>
                            </div>
                            <div className='bg-gray-300 relative h-4 w-4'>
                              <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>0</span>
                            </div>
                            <div className='bg-gray-300 relative h-4 w-4 border border-red-500'>
                              <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>+</button>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <div className='bg-gray-300 relative h-4 w-4 border border-red-500'>
                              <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>-</button>
                            </div>
                            <div className='bg-gray-300 relative h-4 w-4'>
                              <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>0</span>
                            </div>
                            <div className='bg-gray-300 relative h-4 w-4 border border-red-500'>
                              <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>+</button>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <div className='bg-gray-300 relative h-4 w-4 border border-red-500'>
                              <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>-</button>
                            </div>
                            <div className='bg-gray-300 relative h-4 w-4'>
                              <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>0</span>
                            </div>
                            <div className='bg-gray-300 relative h-4 w-4 border border-red-500'>
                              <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="color-2">Showing color 2</TabsContent>
                  <TabsContent value="color-3">Showing color 3</TabsContent>
                </Tabs>

                </div>
                <div className="flex bottom">

                  {/* INCREMENT & DECREMENT COMPONENT*/}
                {/* <div>
                  <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuantity(item.id, 'dec') }>
                          Decrement
                      </span>
                      <span className="num">{item.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item.id, 'inc') }>
                          Increment
                      </span>
                  </p>
                </div> */}
                  <button
                      type="button"
                      className="remove-item underline"
                      onClick={() => onRemove(item)}
                  >
                      Remove
                  </button>
                </div>
                {/* <div>
                  <label htmlFor={`color-${item.id}`}>Color:</label>
                  <input
                    type="text"
                    id={`color-${item.id}`}
                    value={item.color}
                    onChange={(e) => handleColorChange(item.id, e.target.value)}
                  />
                </div> */}
                {/* <div>
                  <label htmlFor={`size-${item.id}`}>Size:</label>
                  <input
                    type="text"
                    id={`size-${item.id}`}
                    value={item.size}
                    onChange={(e) => handleSizeChange(item.id, e.target.value)}
                  />
                </div> */}
                  {/* <p>Color: {item.color}</p> */}
                  {/* <p>Size: {item.size}</p> */}
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

          </SheetContent>
        </Sheet>
    </div>
  )
}

export default Cart