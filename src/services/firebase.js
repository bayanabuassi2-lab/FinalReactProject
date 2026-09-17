import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC32bz-W-F_IgFBicjbNi4PLQWVcInCQgM",
  authDomain: "doctors-df1f0.firebaseapp.com",
  projectId: "doctors-df1f0",
  storageBucket: "doctors-df1f0.firebasestorage.app",
  messagingSenderId: "912323803198",
  appId: "1:912323803198:web:9e04085ed11225c8bc796f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
};