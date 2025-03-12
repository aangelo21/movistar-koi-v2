import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAx-nYS3Qrj4xyyhs-q6cFYPkvbL0FvCDo",
  authDomain: "movistar-koi-v2-86d64.firebaseapp.com",
  databaseURL: "https://movistar-koi-v2-86d64-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movistar-koi-v2-86d64",
  storageBucket: "movistar-koi-v2-86d64.firebasestorage.app",
  messagingSenderId: "446849395689",
  appId: "1:446849395689:web:2ac7b0822b8f83069a7978"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);