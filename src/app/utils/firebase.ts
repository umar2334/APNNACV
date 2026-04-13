import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBGm-a4wORs7kVxE6npKpuvd7PQMa5gwGk',
  authDomain: 'apnacv-85683.firebaseapp.com',
  projectId: 'apnacv-85683',
  storageBucket: 'apnacv-85683.firebasestorage.app',
  messagingSenderId: '12174823242',
  appId: '1:12174823242:web:4ed63cac0628c156f53bb3',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
