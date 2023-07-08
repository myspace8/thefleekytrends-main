// Inside a file named firebase.js (or any name you prefer)
import db from '../config'; // Assuming your Firebase configuration is in config.js
import { collection, getDocs } from 'firebase/firestore';

const productsRef = collection(db, 'products');
export async function getProducts() {
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    views: doc.data().views || 0,
  }));
  return products;
}
