import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = { (Take #this Configuration from Firebase Database)
  apiKey: "--ADD Your API Key Here"
  authDomain
  projectId
  storageBucket
  messagingSenderId
  appId
  measurementId
};

export default firebase.initializeApp(firebaseConfig);
