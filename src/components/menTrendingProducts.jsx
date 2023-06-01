import Link from 'next/link';
import { db } from '@/config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const productCollectionRef = collection(db, 'products');

export default function MenTrendingProducts() {
  const [productList, setProductList] = useState([]);


  useEffect(() => {
    const getProductList = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          views: doc.data().views || 0, // Initialize view count to 0
        }));
        setProductList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getProductList();
  }, []);

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
  }, [productList]);

  // Filter and sort products by view count and sex value
  const filteredProducts = productList.filter(product => product.sex === 'm');
  const sortedProducts = filteredProducts.sort((a, b) => b.views - a.views);

  // Display the top four products
  const topFourProducts = sortedProducts.slice(0, 4);

  return (
    <div className="flex flex-col justify-between">
      <section className="px-3 py-2 bg-gray-300 rounded-t-sm">
        <p className='uppercase text-sm md:text-base'>Trending products: men</p>
      </section>
      {/* Product Cart */}
      <section className="m-6 rounded-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {topFourProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.name} id={`product-link-${product.id}`} 
            className="mb-8 flex flex-col items-center">
                <div className='mb-2'>
                  <img
                  width={500}
                  height={500}
                    className="h-[130px] lg:h-[230px] w-full object-cover hover:scale-105 transition duration-300 ease-in-out"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="text-sm mb-2">{product.views} views</div>
                {/* <div className="text-sm mb-2">{product.sex}</div> */}
                <div className="text-center text-sm">{product.name}</div>
                <div className="flex items-center gap-4">
                  <p className='font-medium'>GHC {product.normalPrice}</p>
                  <p className="line-through text-sm text-slate-400">GHC {product.discPrice}</p>
                </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}