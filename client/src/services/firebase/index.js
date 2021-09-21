import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAbRFrpyUgDJN_f58hG79KRNMc1BFEDMao",
    authDomain: "dinemate.firebaseapp.com",
    projectId: "dinemate",
    storageBucket: "dinemate.appspot.com",
    messagingSenderId: "448571485330",
    appId: "1:448571485330:web:711ca4b1a7e371bfabca4b",
    measurementId: "G-NT45T88C5J"
}

firebase.initializeApp(firebaseConfig)

export default firebase