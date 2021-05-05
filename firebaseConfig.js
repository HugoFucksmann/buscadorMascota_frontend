import * as firebase from 'firebase';
import 'firebase/firestore';

export default function firebaseConfig() {
	const firebaseConfig = {
		apiKey: 'AIzaSyAjGUDErzymYfXh8vYIqEmSsg3wzvqmiRg',
		authDomain: 'mascotasapp-f1946.firebaseapp.com',
		projectId: 'mascotasapp-f1946',
		storageBucket: 'mascotasapp-f1946.appspot.com',
		messagingSenderId: '679096468889',
		appId: '1:679096468889:web:7d2ca7a4c9148c54b9ff08',
	};

	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
	}

	const db = firebase.firestore();

	return db;
}
