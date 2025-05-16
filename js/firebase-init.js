// js/firebase-init.js
// — Copia aquí la configuración que salía en la consola Firebase (tu último screenshot) —
const firebaseConfig = {
  apiKey: "AIzaSyBWEXs6RIB_LJUdbPdYRGh2ARZmpHhupMo",
  authDomain: "multinversiones-38e13.firebaseapp.com",
  projectId: "multinversiones-38e13",
  storageBucket: "multinversiones-38e13.appspot.com",
  messagingSenderId: "380001917078",
  appId: "1:380001917078:web:b5eccc64bc77709bd2cab7",
  measurementId: "G-H4E31XHG1Y"
};

// Inicializa el SDK “compat”
firebase.initializeApp(firebaseConfig);

// Exporta las instancias para usarlas en otros scripts
const auth      = firebase.auth();
const db        = firebase.firestore();
const messaging = firebase.messaging();
