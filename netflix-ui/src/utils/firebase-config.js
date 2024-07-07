
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDhaFQ161ShrdzTwkqYrVi0f1HDCD4f52A",
  authDomain: "react-netflix-clone-827c6.firebaseapp.com",
  projectId: "react-netflix-clone-827c6",
  storageBucket: "react-netflix-clone-827c6.appspot.com",
  messagingSenderId: "951633033725",
  appId: "1:951633033725:web:309504c2ea30beed9c0194",
  measurementId: "G-N84K62MGFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
