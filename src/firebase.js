// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // ✅ Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDbdysfzKAI5RipGBmhalMwLyV_8Ewajq8",
//   authDomain: "verify-5a856.firebaseapp.com",
//   projectId: "verify-5a856",
//   storageBucket: "verify-5a856.appspot.com", // fixed typo
//   messagingSenderId: "651568175210",
//   appId: "1:651568175210:web:c5fa4559b9597363a0d213",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // ✅ Export this
// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeritgNphnN36lt3RBYBIeXEnYgC9ilr0",
  authDomain: "otpverify-3b3d1.firebaseapp.com",
  projectId: "otpverify-3b3d1",
  storageBucket: "otpverify-3b3d1.firebasestorage.app",
  messagingSenderId: "209512058468",
  appId: "1:209512058468:web:575e4f111f3e13ec4ad971",
  measurementId: "G-SHK66GT1E4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth };
export default firebase;
