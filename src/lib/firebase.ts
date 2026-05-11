// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2DZ6Y_JVgehII0jpJdb5HlVj9HIjmy-g",
  authDomain: "top5-6cdb8.firebaseapp.com",
  projectId: "top5-6cdb8",
  storageBucket: "top5-6cdb8.firebasestorage.app",
  messagingSenderId: "810637042422",
  appId: "1:810637042422:web:eeba173e1a486208a402d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth so you can use login later
export const auth = getAuth(app);
