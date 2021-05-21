import 'react-native-gesture-handler';
import React, { Component, useContext, useEffect } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
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
import { Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import FeedAdop from './views/feedAdop';
import InfoAdop from './views/infoAdop';

const Tab = createBottomTabNavigator();
const ModalStack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true,
	}),
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
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
		let misMascotas = false;
		let mascotas = await getMascotas2(user);

		if (mascotas)
			misMascotas = mascotas.filter((masco) => masco.usuario == user._id);

		this.setState({
			isAuth: isAuth,
			user: user,
			mascotas: mascotas,
			misMascotas: misMascotas,
			loading: false,
		});
	}

	render() {
		LogBox.ignoreLogs(['Remote debugger']);
		LogBox.ignoreLogs(['Setting a timer']);
		if (this.state.loading) {
			return <LoadingView />;
		}

		return (
			<Root>
				<NavigationContainer>
					<MasoctaProvider
						user={this.state.user}
						mascotas={this.state.mascotas}
						isAuth={this.state.isAuth}
						misMascotas={this.state.misMascotas}
					>
						<SafeAreaView style={{ height: windowHeight, width: windowWidth }}>
							<ModalStack.Navigator
								mode='modal'
								initialRouteName='main'
								screenOptions={{
									headerShown: false,
								}}
							>
								<ModalStack.Screen name='main' component={MainContent} />
								<ModalStack.Screen name='chat' component={Chat} />
								<ModalStack.Screen name='infoM' component={InfoPerro} />
								<ModalStack.Screen name='infoAdop' component={InfoAdop} />
							</ModalStack.Navigator>
						</SafeAreaView>
					</MasoctaProvider>
				</NavigationContainer>
			</Root>
		);
	}
}

const MainContent = ({ navigation }) => {
	const { isAuth } = useContext(MascotaContext);

	useEffect(() => {
		Notifications.addNotificationResponseReceivedListener(
			({ notification }) => {
				navigation.navigate('chat', notification.request.content.data);
			}
		);
	}, []);

	return (
		<>
			<HeaderBuscan />
			<Tab.Navigator
				initialRouteName='feed'
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let iconType;

						switch (route.name) {
							case 'formulario':
								iconName = 'plus';
								iconType = 'FontAwesome';
								color = focused ? colores.main : colores.mild;
								break;
							case 'feed':
								iconName = 'paw';
								iconType = 'FontAwesome5';
								color = focused ? colores.main : colores.mild;
								break;
							case 'perfil':
								iconName = 'user';
								iconType = 'FontAwesome';
								color = focused ? colores.main : colores.mild;
								break;
							case 'adop':
								iconName = 'home';
								iconType = 'Ionicons';
								color = focused ? colores.main : colores.mild;
								break;

							default:
								iconName = 'paw';
								iconType = 'FontAwesome5';
								color = focused ? colores.main : colores.mild;
								break;
						}

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
					style: { height: 42 },
				}}
			>
				{isAuth === true ? (
					<Tab.Screen name='formulario' component={FormMascota} />
				) : (
					<Tab.Screen name='formulario' component={Login} />
				)}
				<Tab.Screen name='feed' component={Feed} />
				{isAuth === true ? (
					<Tab.Screen name='adop' component={FeedAdop} />
				) : (
					<Tab.Screen name='adop' component={Login} />
				)}

				<Tab.Screen name='perfil' component={Botonera2} />
			</Tab.Navigator>
		</>
	);
};
