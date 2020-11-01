import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCmEqNNbzaCY-84a_oHSM6xrCyMH6tvHU4",
    authDomain: "productivity-app-vu.firebaseapp.com",
    databaseURL: "https://productivity-app-vu.firebaseio.com",
    projectId: "productivity-app-vu",
    storageBucket: "productivity-app-vu.appspot.com",
    messagingSenderId: "181627641663",
    appId: "1:181627641663:web:74c912ce96062fdd63fd8a",
    measurementId: "G-PVLRDNXHVB"
});

const db = firebaseConfig.firestore();

export default db;