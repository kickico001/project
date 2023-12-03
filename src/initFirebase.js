import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBzYiWC1DmouMEYURD_1WMygYlYrn135pw",
    authDomain: "cardflux-a19ef.firebaseapp.com",
    projectId: "cardflux-a19ef",
    storageBucket: "cardflux-a19ef.appspot.com",
    messagingSenderId: "442078010632",
    appId: "1:442078010632:web:7e686140f94d4e1053a0bd"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }