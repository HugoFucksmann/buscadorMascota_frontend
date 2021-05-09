import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from './notificationConfig';
import { myLocation2 } from './getLocation';
import {
	AUTH2_BUSCAN,
	AUTH2_BUSCAN_PRODUCTION,
	AUTH2_MASCOTAS_IOS,
	AUTH2_BUSCAN_WEB,
	PROD_URL,
} from '@env';

export async function getUser() {
	let user = await AsyncStorage.getItem('user');

	if (!user) user = await usuarioRandom2();
	else {
		user = JSON.parse(user);

		const token = await registerForPushNotificationsAsync();

		if (token !== user.notification)
			user = await ActualizarNotificationToken(token, user);
	}
	user = await actualizarLocation2(user);

	return user;
}

export async function googleLogin(user) {
	try {
		const { type, idToken } = await Google.logInAsync({
			androidClientId: `${AUTH2_BUSCAN}`,
			androidStandaloneAppClientId: `${AUTH2_BUSCAN_PRODUCTION}`,
			iosClientId: `${AUTH2_MASCOTAS_IOS}`,
			clientId: `${AUTH2_BUSCAN_WEB}`,
		}).catch((err) => console.log(err));

		if (type === 'success') {
			let authh = await fetch(`${PROD_URL}/login/google`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: idToken,
					user,
				}),
			})
				.then((res) => res.json())
				.then(async (res) => {
					if (res.ok) {
						await AsyncStorage.setItem('token', JSON.stringify(res.token));
						return res.usuario;
					} else return false;
				})
				.catch((e) => {
					console.log(e);
					return false;
				});
			return authh;
		}
	} catch (e) {
		console.log(e);
	}
}

export async function isAuthenticated(user) {
	let authh = await fetch(`${PROD_URL}/login/renew`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: user._id,
		}),
	})
		.then((res) => res.json())
		.then(async (res) => {
			if (!res.ok) return false;
			await AsyncStorage.setItem('token', res.token);

			return true;
		})
		.catch((e) => {
			console.log('err 4 ', e);
			return false;
		});

	return authh;
}

export async function usuarioRandom2() {
	const notificationToken = await registerForPushNotificationsAsync();

	const id = Math.random().toString().slice(2, 7);
	user = {
		_id: id,
		google: false,
		name: 'usuario no registrado',
		notification: notificationToken,
		img: '',
	};
	await AsyncStorage.setItem('user', JSON.stringify(user));
	return user;
}

export async function actualizarLocation2(user) {
	const ubi = await myLocation2();
	let userLocation = { ...user, location: ubi };
	await AsyncStorage.setItem('user', JSON.stringify(userLocation));
	return userLocation;
}

async function ActualizarNotificationToken(newtoken, user) {
	let headerToken = await AsyncStorage.getItem('token');
	let newUser = user;
	let resp = await fetch(`${PROD_URL}/usuarios/notifications`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			token: headerToken,
		},
		body: JSON.stringify({
			uid: user._id,
			newtoken,
		}),
	})
		.then((res) => res.json())
		.catch((e) => {
			console.log('e al actualizar notifications ', e);
			return false;
		});
	if (resp.ok) newUser = resp.usuario;

	return newUser;
}
