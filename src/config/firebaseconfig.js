import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCcpSr4boHa9pvsbVQGeFxmft3e3ZhyxXs",
  authDomain: "task-6079a.firebaseapp.com",
  projectId: "task-6079a",
  storageBucket: "task-6079a.appspot.com",
  messagingSenderId: "309941176187",
  appId: "1:309941176187:web:3da48c04bad6a3316e5fde"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase