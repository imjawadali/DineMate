importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAbRFrpyUgDJN_f58hG79KRNMc1BFEDMao",
    authDomain: "dinemate.firebaseapp.com",
    projectId: "dinemate",
    storageBucket: "dinemate.appspot.com",
    messagingSenderId: "448571485330",
    appId: "1:448571485330:web:711ca4b1a7e371bfabca4b",
    measurementId: "G-NT45T88C5J"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    const { title, body } = payload.notification;
    const notificationTitle = title;
    const notificationOptions = {
        body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});