import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8gEP6c6ihfuL8A5umbOT59Q26DNeo0dY",  
  authDomain: "codepp-4eb45.firebaseapp.com",
  projectId: "codepp-4eb45",
  storageBucket: "codepp-4eb45.appspot.com", 
  messagingSenderId: "564525709756",
  appId: "1:564525709756:web:8181a28ca449622dee93b9",
  measurementId: "G-LXCLWDQKH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Export Firestore

export default app;
