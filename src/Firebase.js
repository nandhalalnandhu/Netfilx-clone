import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAyGNwGtd9NXXztSdSR-UO0evG2XqqxSfM",
  authDomain: "netfilx-thrilok.firebaseapp.com",
  projectId: "netfilx-thrilok",
  storageBucket: "netfilx-thrilok.appspot.com",
  messagingSenderId: "356908214422",
  appId: "1:356908214422:web:fef01bdf428d43097a7ab7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);




const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};


const logout = () => {
  signOut(auth);
};
export { auth, db, login, signup, logout };
