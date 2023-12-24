import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBd-I5Kl4s21Ld9GSo4v9S1rQS38ZjGTTc",
  authDomain: "test-bbafb.firebaseapp.com",
  projectId: "test-bbafb",
  storageBucket: "test-bbafb.appspot.com",
  messagingSenderId: "653547979011",
  appId: "1:653547979011:web:a9311329e5fe569afea936"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
