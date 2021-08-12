import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCw5QoFMjPC4-py9H41KxxSprRXr2CVt04',
  authDomain: 'karadjovcheta-511ed.firebaseapp.com',
  projectId: 'karadjovcheta-511ed',
  storageBucket: 'karadjovcheta-511ed.appspot.com',
  messagingSenderId: '667863964629',
  appId: '1:667863964629:web:640c5b0bf9e5038f09fb5c',
  measurementId: 'G-GDBYZGFN65',
};
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
