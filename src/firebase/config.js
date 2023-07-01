import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCDFDhw84KvouiWeT9Pz2Zu0Tmq_ajw0SY",
  authDomain: "my-olx-b0c8f.firebaseapp.com",
  projectId: "my-olx-b0c8f",
  storageBucket: "my-olx-b0c8f.appspot.com",
  messagingSenderId: "435580427298",
  appId: "1:435580427298:web:4f25256b1bf03eb39bbe7b",
  measurementId: "G-F3L3HCG2WB"
};

export default firebase.initializeApp(firebaseConfig);
