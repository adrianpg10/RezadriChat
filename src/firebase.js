import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APPIKEY,
  authDomain: "chat-e4006.firebaseapp.com",
  projectId: "chat-e4006",
  storageBucket: "chat-e4006.appspot.com",
  messagingSenderId: "1062164353848",
  appId: "1:1062164353848:web:de381896bfdad5182227cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()