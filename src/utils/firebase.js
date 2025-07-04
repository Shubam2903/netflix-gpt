// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKaymfMXVwx1_uWm722TDfzbrsZiTgrow",
  authDomain: "netflix-gpt-c4bdc.firebaseapp.com",
  projectId: "netflix-gpt-c4bdc",
  storageBucket: "netflix-gpt-c4bdc.firebasestorage.app",
  messagingSenderId: "104941940830",
  appId: "1:104941940830:web:a83c9e82a8ceca3af404cf",
  measurementId: "G-N9GM98LPMY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
