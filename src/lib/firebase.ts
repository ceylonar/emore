// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiK4428Nf2GNLrXKNUTwAtBqpe1e1g0BU",
  authDomain: "emor-elegance.firebaseapp.com",
  projectId: "emor-elegance",
  storageBucket: "emor-elegance.firebasestorage.app",
  messagingSenderId: "144267791385",
  appId: "1:144267791385:web:c1d194a0d863c217962e88"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
