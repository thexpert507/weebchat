import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyBfYuOGJyXr6sfVpty6SEM-j9tP9lxhFio',
	authDomain: 'weebchat-8048a.firebaseapp.com',
	projectId: 'weebchat-8048a',
	storageBucket: 'weebchat-8048a.appspot.com',
	messagingSenderId: '349377736604',
	appId: '1:349377736604:web:e21c657d2ab8fa7bba2259',
	measurementId: 'G-6N30T6H7DR'
};
const app = initializeApp(firebaseConfig);
export const fireapp = getFirestore(app);
