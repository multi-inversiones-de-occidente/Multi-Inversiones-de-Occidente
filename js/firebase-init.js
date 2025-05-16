// js/firebase-init.js

const firebaseConfig = {
  apiKey: "AIzaSyBWEXs6RIB_LJUdbPdYRGh2ARZmpHhupMo",
  authDomain: "multinversiones-38e13.firebaseapp.com",
  projectId: "multinversiones-38e13",
  storageBucket: "multinversiones-38e13.appspot.com",
  messagingSenderId: "380001917078",
  appId: "1:380001917078:web:b5eccc64bc77709bd2cab7",
  measurementId: "G-H4E31XHG1Y"
};

firebase.initializeApp(firebaseConfig);

window.auth      = firebase.auth();
window.db        = firebase.firestore();
window.messaging = firebase.messaging();
