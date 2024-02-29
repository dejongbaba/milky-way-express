import { Auth, getAuth } from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCZD7BJP06D1-tJABF-0w-mk1wQn7goM-g",
    authDomain: "milky-way-77fbc.firebaseapp.com",
    projectId: "milky-way-77fbc",
    storageBucket: "milky-way-77fbc.appspot.com",
    messagingSenderId: "776782290821",
    appId: "1:776782290821:web:412bb8bc230b25ebf96eec",
    measurementId: "G-THC6M0LXWY"
};

 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
 export const auth = getAuth(app)
