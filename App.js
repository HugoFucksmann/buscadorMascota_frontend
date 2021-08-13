import 'react-native-gesture-handler';
import React, { Component, useContext, useEffect } from 'react';
import { Dimensions, LogBox, SafeAreaView } from 'react-native';
import { Icon, Root, View } from 'native-base';
import * as Font from 'expo-font';
import Feed from './views/feed';
import FormMascota from './views/formulario';
import HeaderBuscan from './Components/headerBusCan';
import Login from './Components/login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colores from './Components/colorPalette';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Botonera2 from './views/botonera2';
import MasoctaProvider, { MascotaContext } from './context/mascotasContext';
import Chat from './modules/chat';
import InfoPerro from './Components/InfoPerro';

import * as Notifications from 'expo-notifications';
import FeedAdop from './views/feedAdop';
import InfoAdop from './views/infoAdop';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const ModalStack = createStackNavigator();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true,
	}),
});
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class App extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			NunitoLight: require('./assets/fonts/Nunito-Light.ttf'),
		});
	}

	render() {
		LogBox.ignoreLogs(['Remote debugger']);
		LogBox.ignoreLogs(['Setting a timer']);

		return (
			<Root>
				<NavigationContainer>
					<MasoctaProvider>
						<SafeAreaView style={{ width: width, height: height }}>
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
								iconName = 'map-marker-alt';
								iconType = 'Fontisto';
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
								iconName = 'heart-plus';
								iconType = 'MaterialCommunityIcons';
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
