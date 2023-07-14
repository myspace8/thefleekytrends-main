import { useEffect, useState } from 'react';
import { getProduct } from '@/firebase/firestore/getData';


export const  filterByGender = (products, gender) =>{
    return products?.filter((product) => product.data.gender === gender);
  }

  
  export const  filterItemsBySubtext = (items, subtext) =>{
    return items.filter((item) => item.data.name.toLowerCase().includes(subtext.toLowerCase()));
  }
  
  
  const useProductList = (cartItems) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchProductList = async () => {
        try {
          const productPromises = cartItems.map((item) => getProduct(item.id));
          const productList = await Promise.all(productPromises);
          if (isMounted) {
            setProductList(productList);
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      if (cartItems.length > 0) {
        fetchProductList();
      }
  
      return () => {
        isMounted = false;
      };
    }, [cartItems]);
  
    return { productList, loading };
};
  
export default useProductList;
