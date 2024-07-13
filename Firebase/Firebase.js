
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // e.g., "AIzaSyAsArglooC1YSoJO8-_KDygANnXrqD9GzU"
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // e.g., "react-native-app-fa41c.firebaseapp.com"
  projectId: "YOUR_PROJECT_ID", // e.g., "react-native-app-fa41c"
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // e.g., "react-native-app-fa41c.appspot.com"
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // e.g., "809290444399"
  appId: "YOUR_APP_ID", // e.g., "1:809290444399:android:554244f012fa7b357ea79a"
}


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };