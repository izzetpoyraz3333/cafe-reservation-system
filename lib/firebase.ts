// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAyr9EXEiHwX540rvPNwk21dv3fgNePLI",
  authDomain: "cafe-app-fe239.firebaseapp.com",
  projectId: "cafe-app-fe239",
  storageBucket: "cafe-app-fe239.firebasestorage.app",
  messagingSenderId: "934554446924",
  appId: "1:934554446924:web:22a0d4f2628773739098e9",
  measurementId: "G-13EVVLGDYQ"
};

// Next.js SSR (Server Side Rendering) uyumluluğu için kontrol
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth , db};
