import { initializeApp } from "firebase/app";
import { 
  initializeAuth, 
  // @ts-ignore
  getReactNativePersistence,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Using the Web API Key or falling back. The Android API Key from google-services might trigger restrictions on Web SDK if explicitly restricted in Google Cloud.
// If it fails on Signup, you must replace this apiKey with the WEB api key from your Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyDVf-Dx9XX2P1iKRENFmsoEot6T_4OXZ6A",
  authDomain: "mitra-app-4a641.firebaseapp.com",
  projectId: "mitra-app-4a641",
  storageBucket: "mitra-app-4a641.firebasestorage.app",
  messagingSenderId: "361793567564",
  appId: "1:361793567564:android:cb0f04c648ab910536ade9"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: (getReactNativePersistence as any)(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { 
  auth, 
  db, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  onAuthStateChanged
};
