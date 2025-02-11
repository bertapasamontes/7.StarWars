import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
//     authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
//     projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
//     storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
//     messagingSenderId: process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
//     appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"]
// };

const firebaseConfig = {
    apiKey: "AIzaSyDfJAuB6UePl-BSEQHuM0N7VuPySOoszp0",
    authDomain: "starwars-itacademy2025v02.firebaseapp.com",
    databaseURL: "https://starwars-itacademy2025v02-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "starwars-itacademy2025v02",
    storageBucket: "starwars-itacademy2025v02.firebasestorage.app",
    messagingSenderId: "605373812980",
    appId: "1:605373812980:web:bc0e9102b0c28d42980ea1",
    measurementId: "G-E3LZP6MVM8"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export const database = getFirestore(app);