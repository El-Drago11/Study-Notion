import { initializeApp } from "firebase/app";
import { getMessaging,onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCXaytmIVBIH6qMub6CCMAphD93BCiPZVk",
  authDomain: "studynotion-4b060.firebaseapp.com",
  projectId: "studynotion-4b060",
  storageBucket: "studynotion-4b060.firebasestorage.app",
  messagingSenderId: "1078083003809",
  appId: "1:1078083003809:web:bc5bd2a3ce5477ecea57e0",
  measurementId: "G-PZLJTE0003"
};

export const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
