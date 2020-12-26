import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyBV-_bfQ2QCkjGJqYxeAh9_CIz0sfezRaA",
    authDomain: "bizinissify-cea9d.firebaseapp.com",
    databaseURL: "https://bizinissify-cea9d.firebaseio.com",
    projectId: "bizinissify-cea9d",
    storageBucket: "bizinissify-cea9d.appspot.com",
    messagingSenderId: "823024032780",
    appId: "1:823024032780:web:c1a2eef793b585f4bc2229",
    measurementId: "G-RQPEC6JT3Z"
}

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUser() {
        return this.auth.currentUser ? {
            id: this.auth.currentUser.uid,
            name: this.auth.currentUser.displayName,
            email: this.auth.currentUser.email
        } : null;
    }

    delete() {
        if (this.auth.currentUser) this.auth.currentUser.delete();
    }
}

export default new Firebase()