import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBxDSMcP1FKlRbF-wMe7kvuZtqwQ6Vd30c",
    authDomain: "takas0.firebaseapp.com",
    databaseURL: "https://takas0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "takas0",
    storageBucket: "takas0.appspot.com",
    messagingSenderId: "165300591842",
    appId: "1:165300591842:web:cbbb226dcc78acc0e412bb"
  };
  

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default app;