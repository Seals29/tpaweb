// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfp_7ZGBdn1N0CpP4Kw-8wskG-WF8muzQ",
  authDomain: "oldegg-3c56e.firebaseapp.com",
  projectId: "oldegg-3c56e",
  storageBucket: "oldegg-3c56e.appspot.com",
  messagingSenderId: "785755234218",
  appId: "1:785755234218:web:f187ad5248ad93f78055d3",
  measurementId: "G-2EP40H2HN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const db = getFirestore(app);
