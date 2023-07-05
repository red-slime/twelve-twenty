// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCo18CEj5cT9appA-qX2k8J8uaDK6_4FcU",
	authDomain: "twelve-6f477.firebaseapp.com",
	projectId: "twelve-6f477",
	storageBucket: "twelve-6f477.appspot.com",
	messagingSenderId: "856937975288",
	appId: "1:856937975288:web:7c2b21f5c7efce042eda0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, storage, firestore };
