import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// import { auth } from "../firebase/firebase";
import { adminauth } from "../adminfirebase/adminfirebase";

const adminAuthContext = createContext();

export function AdminAuthContextProvider({ children }) {
  const [admin, setAdmin] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(adminauth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(adminauth, email, password);
  }
  function logOut() {
    console.log();
    return signOut(adminauth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(adminauth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(adminauth, (currentuser) => {
      console.log("Auth", currentuser);
      setAdmin(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <adminAuthContext.Provider value={{ admin, logIn, signUp, googleSignIn }}>
      {children}
    </adminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(adminAuthContext);
}
