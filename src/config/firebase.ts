// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvIgon7QxcDoN0-VDBxvArZqtTLoR1UMQ",
  authDomain: "english-learning-130e2.firebaseapp.com",
  projectId: "english-learning-130e2",
  storageBucket: "english-learning-130e2.appspot.com",
  messagingSenderId: "759157179381",
  appId: "1:759157179381:web:b0251dd3499a90f0f456bc"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);