import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoIPQ9ad5FfTS6U0aJd4V387Q7kqxWMXM",
  authDomain: "movixdb.firebaseapp.com",
  databaseURL: "https://movixdb.firebaseio.com",
  projectId: "movixdb",
  storageBucket: "movixdb.appspot.com",
  messagingSenderId: "381677151963",
  appId: "1:381677151963:web:b54f35e305e4f978ed4efe",
  measurementId: "G-E31D51VWJL",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
