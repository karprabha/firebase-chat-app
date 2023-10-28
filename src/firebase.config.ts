import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCT02uWFRtvTiXpvb71XLc1xX5QIUFTPKE",
    authDomain: "fir-chat-example-fa75a.firebaseapp.com",
    projectId: "fir-chat-example-fa75a",
    storageBucket: "fir-chat-example-fa75a.appspot.com",
    messagingSenderId: "1041012770304",
    appId: "1:1041012770304:web:310ca45467361bb99abae5",
    measurementId: "G-R98P2134QM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleAuthProvider = new GoogleAuthProvider();
