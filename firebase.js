import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC40iOKA9A0qfAbgR7dU-nYnqleigc_dds",
  authDomain: "movix-7e84e.firebaseapp.com",
  databaseURL: "https://movix-7e84e.firebaseio.com",
  projectId: "movix-7e84e",
  storageBucket: "movix-7e84e.appspot.com",
  messagingSenderId: "410412309450",
  appId: "1:410412309450:web:b6e313c3025a701a914d33",
  measurementId: "G-DDEZDCS42W"
};
   
firebase.initializeApp(firebaseConfig);
firebase.analytics();
