// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDXoZKmtctanKjhM58XJCwQsIbzJ6bVA5s",
   authDomain: "sshine-2ff08.firebaseapp.com",
   projectId: "sshine-2ff08",
   storageBucket: "sshine-2ff08.appspot.com",
   messagingSenderId: "811479183184",
   appId: "1:811479183184:web:04a753f03909a8fe520655",
   measurementId: "G-DJ8YZLD3Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)




