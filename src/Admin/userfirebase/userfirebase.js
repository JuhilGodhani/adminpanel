import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCipzPqB2lQysQNT3RXu5ikXOACcRjHFWI",
  authDomain: "car-rent-website-7fa0c.firebaseapp.com",
  databaseURL: "https://car-rent-website-7fa0c-default-rtdb.firebaseio.com",
  projectId: "car-rent-website-7fa0c",
  storageBucket: "car-rent-website-7fa0c.appspot.com",
  messagingSenderId: "79705439124",
  appId: "1:79705439124:web:2ee55d90d144f010eded81",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const dbs = getDatabase(app);
const storage = getStorage(app);

export { auth, db, dbs, storage };
