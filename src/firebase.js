import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// import {auth} from "firebase";

//自分のコードを入れる
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  firebase.initializeApp(firebaseConfig);

const db =firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export{db,auth,storage};
