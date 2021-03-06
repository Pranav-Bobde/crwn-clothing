// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyCCoCd3SPRHPSkKwA8kgjjCWwaNy2-ei58",
    authDomain: "crwn-db-5291e.firebaseapp.com",
    projectId: "crwn-db-5291e",
    storageBucket: "crwn-db-5291e.appspot.com",
    messagingSenderId: "450328096752",
    appId: "1:450328096752:web:207baa65d3e757e3dbb735",
    measurementId: "G-JC5ELGH9DE"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error Creating User:', error);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;