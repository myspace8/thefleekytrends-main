import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { collection, getDocs } from 'firebase/firestore';
import db from "../../firebase/config"
import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { getProducts } from "@/firebase/firestore/getData";

const inter = Inter({ subsets: ["latin"] });

export default function ProductDetails() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const data = await getProducts();
        
        setProductList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductList();
  }, []);

  // -----------------------------------------
  const router = useRouter();
  const { id } = router.query; 
  const product = productList.find((p) => p.id === id);

  return (
    <>
      <div className={`md:w-[900px] md:m-[auto] ${inter.className}`}>
        <div className="flex flex-col md:gap-11 md:flex-row py-4 px-4 md:py-6 bg-white my-6 rounded-sm shadow-md lg:py-8">
          {product && 
            <div className="flex gap-4">
              <div className="md:w-[98%] relative mb-4 md:mb-0">
                <img
                  width={500}
                  height={500}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <p className="absolute top-0 text-sm text-red-400">Product Id: {product.id}</p>
              </div>
            </div>
          } 
          {product && 
            <div className="md:w-2/3">
              <div>
                <div className="text-sm mb-2">{product.views} views</div>
                <h2 className="text-sm lg:text-base">{product.name}</h2>
                <div className="flex gap-4">
                  <p className='font-medium'>GHC {product.normalPrice}</p>
                  <p className="line-through font-medium text-slate-400">GHC {product.discPrice}</p>
                </div>
              </div>
              <div className="mt-6">
                <button class="px-4 w-full py-2 bg-gray-900 text-white rounded-sm shadow-2xl hover: focus:outline-none focus:bg-gray-900">
                  Order now
                </button>              
                <p className="mt-4 mb-8 text-center text-sm text-gray-500">
                  Buying to sell?{' '}
                  <a href="#" className="leading-6 text-gray-600 underline hover:underline-none">
                    Get the best deal
                  </a>
                </p>
              </div>
              <div className="w-full px-4 pt-0">
                <div className="mx-auto w-full border-y max-w-md">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between px- py-2 text-left text-black">
                          <span className="uppercase tracking-wider font-light text-sm">Details</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-black`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="pt-2 pb-2 text-sm text-left text-gray-500">
                          <p>Hearty suede means lasting style in this timeless Italian-made chukka boot with versatile appeal.</p>
                          <span className='mt-4 block'>More details about the product will go here.</span>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
                <div className="m-6">
                  <h2 className="text-center">Customer Reviews</h2>
                  <p className="text-center mt-4 text-sm text-slate-600">No reviews yet</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}