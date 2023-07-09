import db from '../config'; 
import { doc, getDoc, collection, getDocs } from "firebase/firestore";


export async function getProducts() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    views: doc.data().views || 0,
  }));
  return products;
}


/*Each product object has an id and the id of a product can be passed 
into this function as a parameter and this function will get all the various attribute of 
the product object
 */

export const getProduct = async (id) => {
  let docRef = doc(db, "products", id);

  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const documentData = docSnapshot.data();
      // console.log(id);
      return {
        id, // Include the id in the returned data object
        ...documentData
      };
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

// export const getProduct = async (id) => {
//   let docRef = doc(db, "products", id);

//   try {
//     const docSnapshot = await getDoc(docRef);

//     if (docSnapshot.exists()) {
//       const documentData = docSnapshot.data();
//       console.log(id);
//       return documentData;
//     } else {
//       console.log("Document does not exist");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting document:", error);
//     return null;
//   }
// };
