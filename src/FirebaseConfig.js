import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


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
  const database = getDatabase(app);
  const auth = getAuth(app);

  export { app, database, auth };
