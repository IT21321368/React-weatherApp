import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBdJPjS0f-DEHgvkHSZOibKIMImxM-UK_g",
    authDomain: "weatherap-7edf1.firebaseapp.com",
    projectId: "weatherap-7edf1",
    storageBucket: "weatherap-7edf1.appspot.com",
    messagingSenderId: "971224349286",
    appId: "1:971224349286:web:1042dcee9d12a0b829cba7",
    measurementId: "G-GVDF2FZJN9"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;
