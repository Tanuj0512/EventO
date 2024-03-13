 import firebase from "firebase/compat/app";
import{ getAuth } from "firebase/auth/cordova";
import { getFirestore} from 'firebase/firestore';
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBQlhNnqAkS8BXKcQN-KT2Llcm4RUU_rIo",
  authDomain: "event-o-4e544.firebaseapp.com",
  projectId: "event-o-4e544",
  storageBucket: "event-o-4e544.appspot.com",
  messagingSenderId: "19089330589",
  appId: "1:19089330589:web:e97fc34b76d36d1bfe9f74",
  measurementId: "G-5YD15X5DW9"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);