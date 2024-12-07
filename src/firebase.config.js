import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Ajout de deleteDoc et doc

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportation des objets et fonctions nécessaires
export { db, collection, getDocs, doc, deleteDoc }; // Exportation de deleteDoc et doc
