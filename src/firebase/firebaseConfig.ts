// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLhvkylD2qSVK5yBBTeWnufB7ig0GsE8k",
  authDomain: "minhaescola-320a9.firebaseapp.com",
  projectId: "minhaescola-320a9",
  storageBucket: "minhaescola-320a9.firebasestorage.app",
  messagingSenderId: "593269729317",
  appId: "1:593269729317:web:973d2477547bbc372c37cc",
  measurementId: "G-746M8B3WS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}