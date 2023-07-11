import * as React from "react"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "@/components/Image"

import { Separator } from "@/components/ui/separator"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useStateContext} from '@/context/StateContext';
import Cart from "./Cart";
import { getAllProducts } from "@/firebase/firestore/getData";
import { filterItemsBySubtext } from "@/utils/productfunctions";


export default function Header() {
  const { showCart, setShowCart, totalQuantities, cartItems } = useStateContext();
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultLength, setResultLength] = useState(0);

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

  const handleToggleSearch = () => {
    console.log('search');
    setShowSearch((prevState) => !prevState);
  };
  useEffect(() => {
    const handleBodyOverflow = () => {
      if (showSearch) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };
    handleBodyOverflow();
  }, [showSearch]);

  /*The logic for the search lies in the two useEffects below
  In the first useEffect, we fetch all the products from the API and set the state
  In the second useEffect, we filter the products based on the search term and set the state
  */
  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      setAllProducts(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      let results;
      results = filterItemsBySubtext(allProducts, searchTerm);
      setResultLength(results.length);
      setSearchResults(results.slice(0, 4));
    };
    handleSearch();
  }, [searchTerm]);

  return (
    <>
      <header className="border-b">
        {/* DESKTOP DESKTOP DESKTOP DESKTOP */}
        {/* Banner */}
        <div className="flex justify-center bg-black py-2">
            <span className="text-sm text-white">Promo: Get 30% discount on first order</span>
        </div>
        <div className="w-[90%] m-auto hidden md:block">
          <div className="flex items-center justify-between">
            <div>
              {/* Logo */}
              <h1>Logo</h1>
            </div>
            <div>
              {/* Nav */}
              nav items goes here
              {/* <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex p-4">
                        <div className="flex flex-col gap-3 w-[280px]">
                          <h4 className="scroll-m-20 uppercase text-base font-semibold tracking-tight">
                            Shop categories
                          </h4>
                          <ul className="flex flex-wrap gap-3">
                            <ListItem href="#">
                              Oxfords
                            </ListItem>
                            <ListItem href="#">
                              Loafer
                            </ListItem>
                            <ListItem href="#">
                              Sandals
                            </ListItem>
                            <ListItem href="#">
                              Brogues
                            </ListItem>
                            <ListItem href="#">
                              Slippers
                            </ListItem>
                            <ListItem href="#">
                              Crocs
                            </ListItem>
                            <ListItem href="#">
                              Sneakers
                            </ListItem>
                          </ul>
                        </div>
                        <div className="flex gap-2">
                          <div>
                            <Image className="w-16 md:w-48" ar={'1'}src={'./assets/images/herosection.jpg'} />
                          </div>
                          <div className="flex flex-col">
                            <Image className="w-16 md:w-48" ar={'1'}src={'./assets/images/herosection.jpg'} />
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <div className="flex p-4">
                        <div className="flex flex-col gap-3 w-[280px]">
                          <h4 className="scroll-m-20 uppercase text-base font-semibold tracking-tight">
                            Shop categories
                          </h4>
                          <ul className="flex flex-wrap gap-3">
                          <ListItem href="#">
                            Heels
                          </ListItem>
                          <ListItem href="#">
                            slipper Heels
                          </ListItem>
                          <ListItem href="#">
                            Special ZARA collections
                          </ListItem>
                          <ListItem href="#">
                            Crocs
                          </ListItem>
                          <ListItem href="#">
                            Flats
                          </ListItem>
                          <ListItem href="#">
                            Sandals
                          </ListItem>
                          </ul>
                        </div>
                        <div className="flex gap-2">
                          <div>
                            <Image className="w-16 md:w-48" ar={'1'}src={'./assets/images/herosection.jpg'} />
                          </div>
                          <div className="flex flex-col">
                            <Image className="w-16 md:w-48" ar={'1'}src={'./assets/images/herosection.jpg'} />
                          </div>
                        </div>
                      </div>
                      
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <span className="uppercase">Discover</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu> */}
            </div>
              {/* Search & Bag */}
            <div className="flex items-center gap-4">
              <div>
                <button onClick={handleToggleSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* MOBILE MOBILE MOBILE MOBILE */}
        <div className="flex items-center justify-between mx-3 gap-2 md:hidden">
          <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side={'left'}>
                <Tabs defaultValue="men" className="w-full mt-12">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="women">Women</TabsTrigger>
                    <TabsTrigger value="men">Men</TabsTrigger>
                  </TabsList>

                  <TabsContent value="women">
                    <div>
                      <div className="grid grid-cols-2 justify-center gap-2">
                        <div>
                          <Image className="" ar={'1'}src={'./assets/images/herosection.jpg'} />
                        </div>
                        <div>
                          <Image className="" ar={'1'}src={'./assets/images/herosection.jpg'} />
                        </div>
                      </div>
                      <div className="">
                        <Separator className="my-4" />
                        <h4 className="uppercase text-sm font-medium tracking-tight">Shop categories</h4>
                        <ul className="flex my-3 flex-col gap-2 text-sm">
                          <li>
                            <a href="#">
                              Heels
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Slipper Heels
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Special ZARA collections
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Crocs
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Flats
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Sandals
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="men">
                      <div className="">
                        <div className="grid grid-cols-2 justify-center gap-2">
                          <div>
                            <Image className="" ar={'1'}src={'./assets/images/herosection.jpg'} />
                          </div>
                          <div className="flex flex-col">
                            <Image className="" ar={'1'}src={'./assets/images/herosection.jpg'} />
                          </div>
                        </div>
                        <div className="text-sm">
                          <Separator className="my-4" />
                          <h4 className="uppercase text-sm font-medium tracking-tight">Shop categories</h4>
                          <ul className="flex my-3 flex-col gap-2 text-sm">
                            <li>
                              <a href="#">
                                Oxfords
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Sandals
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Crocs
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Sneakers
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Slippers
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Brogues
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                  </TabsContent>
                </Tabs>
                <Separator className="my-4" />
                <h4 className="uppercase text-sm font-medium tracking-tight">
                  Discover
                </h4>
                <ul className="flex my-3 flex-col gap-2 text-sm">
                  <li>
                    <a href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Faq
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Contact us
                    </a>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
            <div>
              <Link href={'/'}>
              Logo
              </Link>
            </div>
            {/* SEARCH SEARCH SEARCH */}
            <div className="flex items-center gap-4">
              <div>
                <button onClick={handleToggleSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </div>
              <div>
                <button type="button" onClick={() => setShowCart(!showCart)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  {/* <span className="cart-item-qty">{totalQuantities}</span> */}
                </button>
              </div>
            </div>
        </div>
        {showCart && <Cart />}
      </header>
       {/* SEARCH SEARCH SEARCH SEARCH */}
       {showSearch ? (
          <div
            className="whats_overlay fixed w-screen bg-black z-10 bg-opacity-40 overflow-auto"
            onClick={(e) => {
              if (
                e.target.classList.contains("whats_overlay") || // using the `classList` property instead of `className`.
                e.target.parentElement.classList.contains("whats_overlay")
              ) {
                setShowSearch(false);
              }
            }}
          >
            <div className="bg-white bg-opacity-100">
              <div className="flex items-center p-3">
                <div className="mr-2">
                  {/* <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" /> */}
                </div>
                <input
                  type="text"
                  className="flex-grow outline-none focus:ring-0 "
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="ml-2 cursor-pointer"
                  onClick={handleToggleSearch}
                >
                  {/* <XMarkIcon className="h-7 w-7 text-gray-500" />
                   */}
                   X
                </button>
              </div>

              <div>
                <div className="w-full flex justify-between px-3 pt-3">
                  <span className="text-xs text-gray-700">
                    {resultLength} results
                  </span>
                  <a href="/#" className="text-xs text-gray-700">
                    See all
                  </a>
                </div>
                <hr />
                <div className="flex flex-col md:flex-row ">
                  {searchResults.map(({ id, data }) => {
                    const { name, image, normalPrice, discPrice } = data;
                    return (
                      <div
                        className="flex flex-row md:flex-col w-full md:w-fit items-center p-3 gap-3 hover:grayscale border-transparent border-b-2 hover:border-gray-100 cursor-pointer"
                        key={`search_${id}`}
                      >
                        <a href={`/products/${id}`}>
                          <Image className="w-16 md:w-24" ar="1" src={image} />
                          <div className="flex flex-col ">
                            <h3 className="font-bold ">{name}</h3>
                            <div>
                              <span className="text-base">
                                GH₵ {discPrice}
                              </span>
                              <span className="ml-4 text-xs line-through font-extralight text-gray-600">
                                GH₵{normalPrice}
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
    </>
  )
}

const ListItem = (({ className, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground hover:underline">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


















