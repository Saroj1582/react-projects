// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1DBYulE1BplBDDL7p3T8UE76hhRpXlmE",
  authDomain: "vite-contact-ce59b.firebaseapp.com",
  projectId: "vite-contact-ce59b",
  storageBucket: "vite-contact-ce59b.appspot.com",
  messagingSenderId: "412623336980",
  appId: "1:412623336980:web:4e229fef40f1a9c912d901",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
