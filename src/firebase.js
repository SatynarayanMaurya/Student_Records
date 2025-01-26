// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB0g_-yOznxwDusOq9s3dTep_nriL8g2Ok",
    authDomain: "student-records-b4517.firebaseapp.com",
    projectId: "student-records-b4517",
    storageBucket: "student-records-b4517.firebasestorage.app",
    messagingSenderId: "890283757803",
    appId: "1:890283757803:web:602aaee9adc8392a666eae",
    measurementId: "G-X7JBV17LMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const database = getFirestore(app);

// export default database;
