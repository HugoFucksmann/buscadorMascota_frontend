import 'react-native-gesture-handler';
import React, { Component, useContext } from 'react';
import { StyleSheet, LogBox, Alert, SafeAreaView } from 'react-native';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import { googleLogin, isAuthenticated, getUser } from './helpers/auth';
import Feed from './views/feed';
import LoadingView from './views/pagCarga';
import FormMascota from './views/formulario';
import HeaderBuscan from './Components/headerBusCan';
import Login from './Components/login';
import { getMascotas2 } from './helpers/mascotaService';

import AsyncStorage from '@react-native-async-storage/async-storage';
import colores from './Components/colorPalette';

import Botonera2 from './views/botonera2';
import { FadeInView } from './AnimatedViews/fadeView';
import ToogleMasoctaProvider, {
	toogleMascotaContext,
} from './context/toogleContext';
import RenderButtomTabs from './Components/buttomTabs';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true, selectedTab: 'feed' };
	}

	async componentDidMount() {
		let isAuth = false;
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			NunitoLight: require('./assets/fonts/Nunito-Light.ttf'),
		});

		let user = await getUser();

		if (user.google) isAuth = await isAuthenticated(user);

		let mascotas = await getMascotas2(user);

		this.setState({
			isAuth: isAuth,
			user: user,
			mascotas: mascotas,
			loading: false,
		});
	}

	async googleAuth() {
		let user = await googleLogin(this.state.user);
		if (user) {
			await AsyncStorage.setItem('user', JSON.stringify(user));
			this.setState({ isAuth: true, user: user });
		} else {
			return Alert('Error al intentar loguearse');
		}
	}

	render() {
		LogBox.ignoreLogs(['Remote debugger']);
		LogBox.ignoreLogs(['Setting a timer']);

		if (this.state.loading) {
			return <LoadingView />;
		}
		return (
			<Root>
				<ToogleMasoctaProvider
					user={this.state.user}
					mascotas={this.state.mascotas}
				>
					<HeaderBuscan />
					<SafeAreaView style={{ flex: 1 }}>
						<FadeInView style={{ flex: 1 }}>
							<RenderTabs isAuth={this.state.isAuth} />
						</FadeInView>
					</SafeAreaView>
					<RenderButtomTabs />
				</ToogleMasoctaProvider>
			</Root>
		);
	}
}

const RenderTabs = ({ isAuth }) => {
	const { renderTabs } = useContext(toogleMascotaContext);

	switch (renderTabs) {
		case 'feed':
			return <Feed />;
			break;

		case 'formulario':
			if (!isAuth) return <Login handlerPress={() => this.googleAuth()} />;
			return (
				<>
					<FormMascota />
				</>
			);
			break;

		case 'perfil':
			return <Botonera2 />;

			break;

		default:
			break;
	}
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#00000030',
	},
	button: {
		backgroundColor: 'white',
		borderRadius: 0,
	},
	footer: {
		backgroundColor: null,
		flexDirection: 'row',
		color: colores.main,
		borderTopWidth: 3,
		borderTopColor: colores.mild,
	},
	header: {
		height: 50,
		backgroundColor: 'white',
		borderBottomColor: colores.mild,
		borderBottomWidth: 2,
		paddingTop: 11,
		paddingBottom: 11,
		marginTop: 25,
	},
	headerBackground: {
		flex: 0.8,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});
