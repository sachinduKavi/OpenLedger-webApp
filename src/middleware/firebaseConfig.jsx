// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWGX8IRqZeoTDRLU8tVlnU3VNX1Duj-gg",
  authDomain: "open-ledger-1d594.firebaseapp.com",
  projectId: "open-ledger-1d594",
  storageBucket: "open-ledger-1d594.appspot.com",
  messagingSenderId: "231878270994",
  appId: "1:231878270994:web:573eef8d7feb18221ef8cb",
  measurementId: "G-8QZBBRRQT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

