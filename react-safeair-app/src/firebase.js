// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN_VWXlrqVGAfR9kBeLnvybeL2-gv-r5I",
  authDomain: "safeair-b0c14.firebaseapp.com",
  databaseURL: "https://safeair-b0c14-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "safeair-b0c14",
  storageBucket: "safeair-b0c14.appspot.com",
  messagingSenderId: "882266510112",
  appId: "1:882266510112:web:380ceba54239121206bd45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const db = getFirestore();
export default app;
export { auth, db, database};

