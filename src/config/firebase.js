// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo0uTkWs_Xyd3a4mAOTlbibRCPD2srYXw",
  authDomain: "fleekytrends-v2.firebaseapp.com",
  projectId: "fleekytrends-v2",
  storageBucket: "fleekytrends-v2.appspot.com",
  messagingSenderId: "174015697441",
  appId: "1:174015697441:web:b15186f291382cdc750960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);