import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROD_URL3 } from '@env';

async function editarUsuario(newUser) {
	const token = await AsyncStorage.getItem('token');
	const url = `${PROD_URL3}/usuarios/${newUser._id}`;
	const resp = await fetch(url, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			token,
		},
		body: JSON.stringify(newUser),
	}).catch((e) => console.log(e));

	const data = await resp.json();

	if (data.ok) return data.usuario;
	else return false;
}

module.exports = { editarUsuario };
