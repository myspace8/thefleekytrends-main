import db from '../config'; 
import { doc, getDoc, collection, getDocs } from "firebase/firestore";


export const  getAllProducts = async () =>{
  let documentsData;
  const collectionRef = collection(db, "products"); // Specify the collection from which you want to fetch documents

  /* Fetch all documents in the collection*/
  try {
    const querySnapshot = await getDocs(collectionRef);

    documentsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
  return documentsData;
}


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