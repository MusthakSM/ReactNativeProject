
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAsArglooC1YSoJO8-_KDygANnXrqD9GzU",
    authDomain: "react-native-app-fa41c.firebaseapp.com",
    projectId: "react-native-app-fa41c",
    storageBucket: "react-native-app-fa41c.appspot.com",
    messagingSenderId: "809290444399",
    appId: "1:809290444399:android:554244f012fa7b357ea79a",
}

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };