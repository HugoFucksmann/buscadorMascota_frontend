import * as Location from 'expo-location';

export async function myLocation() {
	try {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('acceso denegado a localizacion');
			return {};
		}
		const location = await Location.getCurrentPositionAsync();
		const { latitude, longitude } = await location.coords;

		return {
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.0052,
			longitudeDelta: 0.0051,
		};
	} catch (e) {
		console.log(e);
	}
}

export async function myLocation2() {
	try {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('acceso denegado a localizacion');
			return {};
		}
		let location = await Location.getCurrentPositionAsync();
		let { latitude, longitude } = await location.coords;

		return {
			latitude: latitude,
			longitude: longitude,
		};
	} catch (e) {
		console.log(e);
	}
}

export function getMapLocation(mascoUbi, personUbi) {
	const latitude = 0.5 * (personUbi.latitude + mascoUbi.latitude);
	const longitude = 0.5 * (personUbi.longitude + mascoUbi.longitude);

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	function distKM(A, B) {
		const R = 6371;
		let aLat = parseFloat(A.latitude);
		let aLon = parseFloat(A.longitude);
		let bLat = parseFloat(B.latitude);
		let bLon = parseFloat(B.longitude);

		var dLat = 2 * R * Math.sin(deg2rad(aLat - bLat) / 2);
		var dLon = 2 * R * Math.sin(deg2rad(aLon - bLon) / 2);
		var dist = Math.sqrt(dLat ** 2 + dLon ** 2);

		return dist;
	}

	let dist = distKM(mascoUbi, personUbi);
	if (dist > 5) dist = 0.09;
	else if (dist > 3) dist = 0.0505;
	else if (dist > 1) dist = 0.0405;
	else dist = 0.0147;

	return {
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: dist,
		longitudeDelta: dist,
	};
}

export function generateInitialRegion(location) {
	return {
		...location,
		latitudeDelta: 0.04864195044303443,
		longitudeDelta: 0.040142817690068,
	};
}
