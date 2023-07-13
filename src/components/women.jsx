import Link from 'next/link';
import { doc, updateDoc } from 'firebase/firestore';
import db from '@/firebase/config';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { getProducts } from '@/firebase/firestore/getData';
import { dummyTrending } from '@/dummData';
import Layout from './layout';
import Title from './collection-title';
import Filter from './filters';


export default function Women() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true); // Add the loading state


  useEffect(() => {
    const getProductList = async () => {
      setProductList(dummyTrending);
      try {
        const data = await getProducts();
        const filteredProducts = data.filter((product) => product.sex === 'f');
        setProductList(filteredProducts);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
      }
    };
    getProductList();
  }, []);

  // const [productList, setProductList] = useState([]);

  
  // useEffect(() => {
  //   const getProductList = async () => {
  //     setProductList(dummyTrending)
  //     try {
  //       const data = await getProducts();
  //       const filteredProducts = data.filter((product) => product.sex === 'f');
  //       setProductList(filteredProducts);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getProductList();
  // }, []);

  useEffect(() => {
    // Update view count when a product is viewed
    const debouncedUpdateViewCount = debounce(async (productId) => {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, { views: productList.find((product) => product.id === productId).views + 1 });
    }, 500); // Adjust the debounce delay (in milliseconds) as per your preference
    
    const updateViewCount = (productId) => debouncedUpdateViewCount(productId);
    

  // Add event listeners to track product views
    productList.forEach((product) => {
      const handleProductView = () => updateViewCount(product.id);
      const productLink = document.getElementById(`product-link-${product.id}`);
      if (productLink) {
        productLink.addEventListener('click', handleProductView);
        return () => {
          productLink.removeEventListener('click', handleProductView);
        };
      }
    });
  }, []);

  return (
    <div>
    <Layout>
      <div>
          <Title title={"Women's"}/>
        </div>
        <div className='sticky top-[84px] md:top-[94px] bg-white z-40 border-y'>
          <Filter totalNumberOfProducts={'250'} />
        </div>
      {/* ... */}
      <div className="flex flex-col justify-between bg-white px-4 md:px-6">
        <section className="my-3 md:my-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-3 lg:grid-cols-4">
          {loading
            ? Array.from(Array(8).keys()).map((index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between ring-1 ring-slate-200"
                >
                  <div className="animate-pulse bg-gray-200 h-[208px] md:h-[550px] w-full" />
                  <div className="flex flex-col w-full text-sm px-[2px]">
                    <div className="animate-pulse bg-gray-200 h-4 w-1/2 mb-2" />
                    <div className="flex items-center gap-4">
                      <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
                      <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            : 
            (
              // Render the actual product image when data is available
              productList.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  id={`product-link-${product.id}`}
                  className="flex flex-col items-center"
                >
                  {/* Rest of your code */}
                  <div className='mb-2'>
                        <img
                        width='500'
                        height='500'
                            className="h-auto md:h-auto w-full"
                            src={product.image}
                            alt={product.name}
                        />
                        </div>
                        <div className='flex flex-col w-full text-sm px-[2px]'>
                          {/* <div className="text-sm mb-2">{product.views} views</div> */}
                          <p className="font-semibold">{product.name}</p>
                          <div className="flex items-center font-normal gap-4 pt-1">
                            <p className=''>GHC {product.normalPrice}</p>
                            <p className="line-through text-slate-400">GHC {product.discPrice}</p>
                          </div>
                      </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  </div>
  );
}
    // <div>
    //   <Layout>
    //     <div>
    //       <Title title={"Women's"}/>
    //     </div>
    //     <div className='sticky top-[84px] md:top-[94px] bg-white z-40 border-y'>
    //       <Filter totalNumberOfProducts={'250'} />
    //     </div>
    //     <div className="flex flex-col justify-between bg-white px-4 md:px-6">
    //       {/* Product Cart */}
    //       <section className="my-3 md:my-6">
    //           <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-3 lg:grid-cols-4">
    //             {productList.map((product) => (
    //               <Link href={`/products/${product.id}`} key={product.id} id={`product-link-${product.id}`} 
    //               className="flex flex-col items-center justify-between ring-1 ring-slate-200">
    //                   <div className='mb-2'>
    //                     <img
    //                     width='500'
    //                     height='500'
    //                         className="h-[208px] md:h-[550px] object-contain w-full"
    //                         src={product.image}
    //                         alt={product.name}
    //                     />
    //                     </div>
    //                     <div className='flex flex-col w-full text-sm px-[2px]'>
    //                       {/* <div className="text-sm mb-2">{product.views} views</div> */}
    //                       <p className="font-semibold">{product.name}</p>
    //                       <div className="flex items-center font-normal gap-4 pt-1">
    //                         <p className=''>GHC {product.normalPrice}</p>
    //                         <p className="line-through text-slate-400">GHC {product.discPrice}</p>
    //                       </div>
    //                   </div>
    //               </Link>
    //             ))}
    //           </div>
    //       </section>
    //     </div>
    //   </Layout>
    // </div>

// <div>
//   <Layout>
//     {/* ... */}
//     <div className="flex flex-col justify-between bg-white px-4 md:px-6">
//       <section className="my-3 md:my-6">
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-3 lg:grid-cols-4">
//           {loading ? (
//             // Render the skeleton image while loading
//             <div className="flex flex-col items-center justify-between ring-1 ring-slate-200">
//               <div className="animate-pulse bg-gray-200 h-[208px] md:h-[550px] w-full" />
//               <div className="flex flex-col w-full text-sm px-[2px]">
//                 <div className="animate-pulse bg-gray-200 h-4 w-1/2 mb-2" />
//                 <div className="flex items-center gap-4">
//                   <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
//                   <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Render the actual product image when data is available
//             productList.map((product) => (
//               <Link
//                 href={`/products/${product.id}`}
//                 key={product.id}
//                 id={`product-link-${product.id}`}
//                 className="flex flex-col items-center justify-between ring-1 ring-slate-200"
//               >
//                 {/* Rest of your code */}
//               </Link>
//             ))
//           )}
//         </div>
//       </section>
//     </div>
//   </Layout>
// </div>