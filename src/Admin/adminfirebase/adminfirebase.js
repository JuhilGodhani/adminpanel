import { initializeApp } from "firebase/app";
// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrQV0lRYNUaa3dxF5mT8psKO6t_jRUvrE",
  authDomain: "car-rent-website-admin-panel.firebaseapp.com",
  databaseURL:
    "https://car-rent-website-admin-panel-default-rtdb.firebaseio.com",
  projectId: "car-rent-website-admin-panel",
  storageBucket: "car-rent-website-admin-panel.appspot.com",
  messagingSenderId: "41731145537",
  appId: "1:41731145537:web:972694fb031a67a2c0ebc0",
  measurementId: "G-LJBB8097J9",
};

const Firebase = firebase.initializeApp(
  firebaseConfig,
  firebaseConfig.projectId
);
export default Firebase;

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const adminauth = getAuth(Firebase);
const admindb = getFirestore(Firebase);
const admindbs = getDatabase(Firebase);

export { adminauth, admindb, admindbs };
