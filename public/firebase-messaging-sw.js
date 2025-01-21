importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
const logoUrl = 'https://res.cloudinary.com/djkivlxss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1737476485/rzp_logo_gkzv4q.png';

firebase.initializeApp({
    apiKey: "AIzaSyCXaytmIVBIH6qMub6CCMAphD93BCiPZVk",
    authDomain: "studynotion-4b060.firebaseapp.com",
    projectId: "studynotion-4b060",
    storageBucket: "studynotion-4b060.firebasestorage.app",
    messagingSenderId: "1078083003809",
    appId: "1:1078083003809:web:bc5bd2a3ce5477ecea57e0",
    measurementId: "G-PZLJTE0003"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: logoUrl
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});