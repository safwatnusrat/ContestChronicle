// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF1a96Lk4eG8M37Nshl_hJrrDca1pIqO0",
  authDomain: "skillsphere-67fa9.firebaseapp.com",
  projectId: "skillsphere-67fa9",
  storageBucket: "skillsphere-67fa9.firebasestorage.app",
  messagingSenderId: "379607848011",
  appId: "1:379607848011:web:576886ef128a56726269ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  export const db = getFirestore(app);