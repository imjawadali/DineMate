import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
    apiKey: "AIzaSyAbRFrpyUgDJN_f58hG79KRNMc1BFEDMao",
    authDomain: "dinemate.firebaseapp.com",
    projectId: "dinemate",
    storageBucket: "dinemate.appspot.com",
    messagingSenderId: "448571485330",
    appId: "1:448571485330:web:711ca4b1a7e371bfabca4b",
    measurementId: "G-NT45T88C5J"
}

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

export { messaging, firebase }