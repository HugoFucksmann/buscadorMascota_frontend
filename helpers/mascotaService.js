import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from '../firebaseConfig';
import { primerosTreinta } from './getTimePass';
import { PROD_URL3 } from '@env';

async function actualizarArchivo(file, perroId, token) {
	try {
		let localUri = file.uri;
		let filename = localUri.split('/').pop();

		let match = /\.(\w+)$/.exec(filename);
		let type = match ? `image/${match[1]}` : `image`;

		const url = `${PROD_URL3}/upload/perdido/${perroId}`;
		let formData = new FormData();

		formData.append('imgMascota', { uri: localUri, name: filename, type });

		const resp = await fetch(url, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				token: token,
			},
			body: formData,
		}).catch((e) => console.log(e));

		const data = await resp.json();

		if (data.ok) {
			return data.mascota;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
}

function getMyPets(mascotas, uid) {
	let miMascotas;

	if (mascotas) {
		miMascotas = mascotas.filter((masco) => masco.usuario == uid);
	} else miMascotas = false;

	return miMascotas;
}

export function ordenarMascotas(mascotas, user) {
	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	function distKM(A, B) {
		const R = 6371;
		let aLat = parseFloat(A.location.latitude);
		let aLon = parseFloat(A.location.longitude);
		let bLat = parseFloat(B.location.latitude);
		let bLon = parseFloat(B.location.longitude);

		var dLat = 2 * R * Math.sin(deg2rad(aLat - bLat) / 2);
		var dLon = 2 * R * Math.sin(deg2rad(aLon - bLon) / 2);
		var dist = Math.sqrt(dLat ** 2 + dLon ** 2);

		return dist;
	}

	let mascotaLejos = mascotas.filter(
		(mascota) => distKM(mascota, user).toFixed(1) < 10
	);

	mascotaLejos.sort((a, b) => {
		let dist2a = distKM(user, a);
		let dist2b = distKM(user, b);

		return dist2a - dist2b;
	});

	mascotaLejos.sort((a, b) =>
		primerosTreinta(a.date) === primerosTreinta(b.date)
			? 0
			: primerosTreinta(a.date)
			? -1
			: 1
	);

	return mascotaLejos.map((mascota) => {
		let dist = distKM(mascota, user);

		if (dist < 1) {
			dist = dist * 1000;
			dist = Math.round(dist);
			dist = `${dist} mts`;
		} else {
			dist = dist.toFixed(1);
			dist = `${dist} km`;
		}

		return { ...mascota, dist: dist };
	});
}

async function getMascotas2(user) {
	return await fetch(`${PROD_URL3}/mascotas`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((response) => response.json())
		.then((res) => {
			if (res.ok) {
				let mascotasT = ordenarMascotas(res.mascotas, user);
				let mascotas = mascotasT.filter((masco) => masco.report.count < 2);
				return mascotas;
			} else return [];
		})
		.catch((error) => {
			console.error(error);
			return [];
		});
}

async function crearMascota(perro, token, notification, uid) {
	let newMascota = { ...perro, date: new Date().getTime() };

	const perroId = await fetch(`${PROD_URL3}/mascotas/crear`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			token: token,
		},
		body: JSON.stringify({ perro: newMascota, notification, uid }),
	})
		.then((res) => res.json())
		.then(({ mascota }) => mascota._id)
		.catch((e) => console.log('el errrorrr ', e));

	if (!perroId) return false;

	return perroId;
}

async function editarMascota(newMascota) {
	let { dist } = newMascota;

	const token = await AsyncStorage.getItem('token');
	const url = `${PROD_URL3}/mascotas/actualizar/${newMascota._id}`;
	const resp = await fetch(url, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			token,
		},
		body: JSON.stringify(newMascota),
	}).catch((e) => console.log(e));

	const data = await resp.json();
	let finalM = { ...data.mascota, dist };

	if (data.ok) return finalM;
	else return false;
}

async function eliminarMascota(idMascota) {
	let result;
	const token = await AsyncStorage.getItem('token');
	const url = `${PROD_URL3}/mascotas/${idMascota}`;
	const resp = await fetch(url, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
			token,
		},
	}).catch((e) => console.log(e));

	const data = await resp.json();

	if (data.ok) {
		clearCollection(idMascota);
		result = true;
	} else {
		result = false;
	}

	return result;
}

function clearCollection(path) {
	let ref = firebaseConfig().collection(path);

	ref.onSnapshot((snapshot) => {
		snapshot.docs.forEach((doc) => {
			ref.doc(doc.id).delete();
		});
	});
}

async function addReport(uid, mid) {
	const token = await AsyncStorage.getItem('token');
	const url = `${PROD_URL3}/mascotas/report`;
	const resp = await fetch(url, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			token,
		},
		body: JSON.stringify({ uid, mid }),
	}).catch((e) => console.log(e));

	const data = await resp.json();

	return data.msj;
}

async function getAdop() {
	return await fetch(`${PROD_URL3}/mascotasAdop`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.ok) return res.mascotasAdop;
			else return [];
		})
		.catch((e) => {
			console.log(e);
			return [];
		});
}

async function adoptar(mid, uid) {
	const token = await AsyncStorage.getItem('token');
	return await fetch(`${PROD_URL3}/mascotasAdop/adoptar/${mid}/${uid}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
			token: token,
		},
	})
		.then((res) => res.json())
		.catch((e) => {
			console.log(e);
			return { ok: false };
		});
}

module.exports = {
	actualizarArchivo,
	crearMascota,
	getMyPets,
	editarMascota,
	eliminarMascota,
	getMascotas2,
	addReport,
	getAdop,
	adoptar,
};
