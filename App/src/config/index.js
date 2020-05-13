import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCAEtyUnIYmu3JIZJZIdrnoEI_Xal_FjXc",
    authDomain: "style-transfer-69e50.firebaseapp.com",
    databaseURL: "https://style-transfer-69e50.firebaseio.com",
    projectId: "style-transfer-69e50",
    storageBucket: "style-transfer-69e50.appspot.com",
    messagingSenderId: "1002165726777",
    appId: "1:1002165726777:web:1e85c0915d31f5fa4b27e8"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase