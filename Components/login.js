import React, { useContext } from 'react';
import {
	View,
	StyleSheet,
	ImageBackground,
	Image,
	Text,
	Alert,
} from 'react-native';
import google from '../assets/iconos/google.png';
import loginPhrase from '../assets/login_phrase.png';
import loginBackground from '../assets/fondos/log_in_curi.png';
import { Button } from 'native-base';
import { actualizarLocation2, googleLogin } from '../helpers/auth';
import { MascotaContext } from '../context/mascotasContext';

const Login = () => {
	const { usuario, handlerAuth } = useContext(MascotaContext);

	async function googleAuth(usuario) {
		let user = await googleLogin(usuario);

		if (user) {
			user = await actualizarLocation2(user);
			handlerAuth(true, user);
		} else {
			return Alert.alert('Error al intentar loguearse');
		}
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'black',
			}}
		>
			<ImageBackground source={loginBackground} style={styles.BackgroundImage}>
				<View style={styles.viewPrincipal}>
					<Image source={loginPhrase} style={styles.loginImg} />
				</View>
				<View style={{ alignSelf: 'center' }}>
					<Button
						large
						iconLeft
						style={styles.googleBoton}
						onPress={() => googleAuth(usuario)}
					>
						<Image source={google} style={styles.googleImg} />
						<Text style={styles.googleText}>Inicia sesion con Google</Text>
					</Button>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	BackgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		paddingBottom: 60,
	},
	viewPrincipal: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
	},
	googleImg: {
		height: 28,
		width: 28,
		marginRight: 20,
		backgroundColor: '#fff',
	},
	loginImg: { resizeMode: 'contain', width: 170 },
	googleText: { fontWeight: 'bold', color: 'grey' },
	googleBoton: { padding: 25, backgroundColor: '#fff' },
});

export default Login;
