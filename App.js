import 'react-native-gesture-handler';
import React, { Component, useContext } from 'react';
import { StyleSheet, LogBox, Alert, SafeAreaView } from 'react-native';
import { Icon, Root } from 'native-base';
import * as Font from 'expo-font';
import { isAuthenticated, getUser } from './helpers/auth';
import Feed from './views/feed';
import LoadingView from './views/pagCarga';
import FormMascota from './views/formulario';
import HeaderBuscan from './Components/headerBusCan';
import Login from './Components/login';
import { getMascotas2 } from './helpers/mascotaService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colores from './Components/colorPalette';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Botonera2 from './views/botonera2';
import MasoctaProvider, { MascotaContext } from './context/mascotasContext';
import Chat from './modules/chat';
import InfoPerro from './Components/InfoPerro';

const Tab = createBottomTabNavigator();
const ModalStack = createStackNavigator();

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

	render() {
		LogBox.ignoreLogs(['Remote debugger']);
		LogBox.ignoreLogs(['Setting a timer']);

		if (this.state.loading) {
			return <LoadingView />;
		}

		function MainContent() {
			const { isAuth } = useContext(MascotaContext);

			return (
				<>
					<HeaderBuscan />
					<Tab.Navigator
						initialRouteName='feed'
						detachInactiveScreens
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
								let iconName;
								let iconType;

								if (route.name === 'formulario') {
									iconName = 'plus';
									iconType = 'FontAwesome';
									color = focused ? colores.main : colores.mild;
								} else if (route.name === 'feed') {
									iconName = 'paw';
									iconType = 'FontAwesome5';
									color = focused ? colores.main : colores.mild;
								} else if (route.name === 'perfil') {
									iconName = 'user';
									iconType = 'FontAwesome';
									color = focused ? colores.main : colores.mild;
								}

								// You can return any component that you like here!
								return (
									<Icon
										type={iconType}
										name={iconName}
										style={{ color: color, fontSize: 25 }}
									/>
								);
							},
						})}
						tabBarOptions={{
							showLabel: false,
						}}
					>
						{isAuth === true ? (
							<Tab.Screen name='formulario' component={FormMascota} />
						) : (
							<Tab.Screen name='formulario' component={Login} />
						)}
						<Tab.Screen name='feed' component={Feed} />
						<Tab.Screen name='perfil' component={Botonera2} />
					</Tab.Navigator>
				</>
			);
		}

		return (
			<Root>
				<NavigationContainer>
					<MasoctaProvider
						user={this.state.user}
						mascotas={this.state.mascotas}
						isAuth={this.state.isAuth}
					>
						<SafeAreaView style={{ flex: 1 }}>
							<ModalStack.Navigator
								//mode='modal'
								initialRouteName='main'
								screenOptions={{
									headerShown: false,
								}}
							>
								<ModalStack.Screen name='main' component={MainContent} />
								<ModalStack.Screen name='chat' component={Chat} />
								<ModalStack.Screen name='infoM' component={InfoPerro} />
							</ModalStack.Navigator>
						</SafeAreaView>
					</MasoctaProvider>
				</NavigationContainer>
			</Root>
		);
	}
}

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
