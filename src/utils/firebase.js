
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { collection, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA1dJAsgnEdZRQRLJYfK1T0wqdXW5IWCn4",
    authDomain: "birthdayapp-14807.firebaseapp.com",
    databaseURL: "https://birthdayapp-14807-default-rtdb.firebaseio.com",
    projectId: "birthdayapp-14807",
    storageBucket: "birthdayapp-14807.firebasestorage.app",
    messagingSenderId: "258879657692",
    appId: "1:258879657692:web:211bcf929a6533d0394619",
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, db };



/**
 * Dos formas de realizar la conexion a firebase.

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA1dJAsgnEdZRQRLJYfK1T0wqdXW5IWCn4",
    authDomain: "birthdayapp-14807.firebaseapp.com",
    databaseURL: "https://birthdayapp-14807-default-rtdb.firebaseio.com",
    projectId: "birthdayapp-14807",
    storageBucket: "birthdayapp-14807.firebasestorage.app",
    messagingSenderId: "258879657692",
    appId: "1:258879657692:web:211bcf929a6533d0394619"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    initializeApp(firebaseConfig);
}
const auth = getAuth();

export {firebase, auth};*/