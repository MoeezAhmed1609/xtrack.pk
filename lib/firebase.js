// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZgQM3X9VAmChij97i5sXUd4-T55_qeBc",
  authDomain: "xtrackpk-1e415.firebaseapp.com",
  projectId: "xtrackpk-1e415",
  storageBucket: "xtrackpk-1e415.appspot.com",
  messagingSenderId: "418242878234",
  appId: "1:418242878234:web:bd91272951b11562cd6aa3",
  measurementId: "G-HG7LQF2SRN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)