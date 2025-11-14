import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNI8gvlBpOEo4MC_8UNkhjLfbHlX1KbFs",
    authDomain: "reataurant-reservation.firebaseapp.com",
    projectId: "reataurant-reservation",
    storageBucket: "reataurant-reservation.firebasestorage.app",
    messagingSenderId: "1071550490905",
    appId: "1:1071550490905:web:217af632eeae63ac1d3d88",
    measurementId: "G-37T37EKTT5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
