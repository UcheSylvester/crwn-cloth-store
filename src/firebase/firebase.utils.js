import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBwlveOmZOGPARbcr_v8lWPnKOdSpTfIwo",
  authDomain: "crwn-store-c1553.firebaseapp.com",
  databaseURL: "https://crwn-store-c1553.firebaseio.com",
  projectId: "crwn-store-c1553",
  storageBucket: "crwn-store-c1553.appspot.com",
  messagingSenderId: "334389655513",
  appId: "1:334389655513:web:489be124b998ce94d2cbc8",
  measurementId: "G-LSN64LE5Q3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(userAuth);

  if (!snapShot.exists) {
    const { displayName, email, photoURL, phoneNumber } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        phoneNumber,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
