import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_wR4XcDFo4VAlS2thcYLXWNtBmCPP0PU",
  authDomain: "appsosmp-94cf1.firebaseapp.com",
  projectId: "appsosmp-94cf1",
  storageBucket: "appsosmp-94cf1.firebasestorage.app",
  messagingSenderId: "965365340355",
  appId: "1:965365340355:web:ca0f3da4ae3b3073d72a76"
};

// Inicializa o app apenas se já não houver um inicializado
const app = initializeApp(firebaseConfig);

// Usa o getFirestore padrão que previne duplicações
export const db = getFirestore(app);