// Import the functions you need from the SDKs you need
import { initializeApp,getApps,FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore'
import {
    getAuth,
    Auth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOB6r1Bx1oTj2Yk6CEWS-FNvywb3Hnnkg",
    authDomain: "messaging-app-6b1fa.firebaseapp.com",
    projectId: "messaging-app-6b1fa",
    storageBucket: "messaging-app-6b1fa.appspot.com",
    messagingSenderId: "135347012267",
    appId: "1:135347012267:web:37eda3682be1a061b7adee"
};
let firebaseApp = FirebaseApp;
let firestore = getFirestore;

// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
if (typeof window !== "undefined" && !getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    firestore = getFirestore();
}




// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export { firebaseApp, auth, firestore,db };