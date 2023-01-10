import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { documentId, getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY = "AIzaSyBeUupxsmi3MUSSgx2YB2VRoH7VZdpeYBI" ,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN = "aqualert-f4ac4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID = "aqualert-f4ac4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET = "aqualert-f4ac4.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID = "89793290410",
  appId: import.meta.env.VITE_FIREBASE_APP_ID = "1:89793290410:web:39f332c15a60ecd1e9f0d3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID = "G-E7PGXTRVN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const database = getDatabase(app);
// export const firestore = getFirestore(app);

// Initialize Firebase
export default app;

// async function createUser(email, password) {
//   createUserWithEmailAndPassword (auth, email, password)
//   .then(userCredential =>{
//     const user = userCredential.user;
//     console.log({user});
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error(`${errorMessage}`);
//   })
// }

// async function Register( {
//   firstName = document.getElementById('firstName').value
//   middleName = document.getElementById('middleName').value
//   lastName = document.getElementById('lastName').value
//   emailAd = document.getElementById('email').value
//   password = document.getElementById('password').value
// })

// function validate_email(email){
//   expression = /^[^@]+@\w+(\.\w+)+\w$/
//   if (expression.test(email) == true){
//     // Email is true
//     return true
//   }
// }