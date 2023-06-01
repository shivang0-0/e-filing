// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIm0OvLVOO0lXjY3oYEJ1qVnHCPlQRctA",
  authDomain: "e-filinggst.firebaseapp.com",
  projectId: "e-filinggst",
  storageBucket: "e-filinggst.appspot.com",
  messagingSenderId: "29060911602",
  appId: "1:29060911602:web:0f1214e37c8c65d286db6b",
  measurementId: "G-03YYB1EHQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;