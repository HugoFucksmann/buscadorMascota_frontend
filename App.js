import 'react-native-gesture-handler';
import React, { Component, useContext, useEffect } from 'react';
import {
	Dimensions,
	LogBox,
	SafeAreaView,
	StyleSheet,
	Text,
	Image,
} from 'react-native';
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
import MasoctaProvider, {
	MascotaContext,
} from './context/mascotasContext';
import Chat from './modules/chat';
import InfoPerro from './Components/InfoPerro';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Notifications from 'expo-notifications';
import FeedAdop from './views/feedAdop';
import InfoAdop from './views/infoAdop';

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

const coloresFondoSlider = ['#7ecc78', '#59c3e3', '#e283fc'];

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
						<SafeAreaView style={{ flex: 1 }}>
							<ModalStack.Navigator
								mode='modal'
								initialRouteName='main'
								screenOptions={{
									headerShown: false,
								}}
							>
								<ModalStack.Screen
									name='main'
									component={MainContent}
								/>
								<ModalStack.Screen name='chat' component={Chat} />
								<ModalStack.Screen
									name='infoM'
									component={InfoPerro}
								/>
								<ModalStack.Screen
									name='infoAdop'
									component={InfoAdop}
								/>
							</ModalStack.Navigator>
						</SafeAreaView>
					</MasoctaProvider>
				</NavigationContainer>
			</Root>
		);
	}
}

const MainContent = ({ navigation }) => {
	const { isAuth, firstLaunch, handlerFirstLaunch } =
		useContext(MascotaContext);

	useEffect(() => {
		Notifications.addNotificationResponseReceivedListener(
			({ notification }) => {
				navigation.navigate(
					'chat',
					notification.request.content.data
				);
			}
		);
	}, []);

	const slides = [
		{
			key: 1,
			title: 'Adopciones Responsables',
			text: 'Description.\nSay something cool',
			image: '',
			backgroundColor: '#59b2ab',
		},
		{
			key: 2,
			title: 'Ten en cuenta',
			text: 'el proceso de adopcion no es inmediato, luego de que te contacte la institucion deberas continuar con el formularo de adopcion',
			image: '',
			backgroundColor: '#febe29',
		},
		{
			key: 3,
			title: 'Ante cualquier duda',
			text: 'Recuerda siempre ser educado y dale noma',
			image: '',
			backgroundColor: '#22bcb5',
		},
	];

	const _renderItem = ({ item, index }) => {
		return (
			<View
				style={[
					styles.sliderView,
					{ backgroundColor: coloresFondoSlider[index] },
				]}
			>
				<Text style={styles.titleSlider}>{item.title}</Text>
				<Image style={styles.sliderImg} source={item.image} />
				<Text style={styles.textSlider}>{item.text}</Text>
			</View>
		);
	};

	const renderItem = ({ item, index }) => {
		let wid = '32%';
		let hei = 120;

		if (index !== 0 && index % 9 === 0) {
			wid = '65%';
			//hei = 200;
		}
		if (index !== 2 && index % 9 === 2) {
			wid = '100%';
			hei = 200;
		}
		return <CardAdop mascotaAdop={item} wid={wid} hei={hei} />;
	};

	if (!firstLaunch)
		return (
			<AppIntroSlider
				renderItem={_renderItem}
				data={slides}
				showSkipButton
				skipLabel='saltar'
				doneLabel='vamos !'
				nextLabel='siguiente'
				onDone={() => handlerFirstLaunch()}
			/>
		);

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

const styles = StyleSheet.create({
	imagg: { flex: 1 },
	sliderView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: '15%',
		paddingBottom: '15%',
	},
	sliderImg: {
		height: 240,
		width: 240,
		borderRadius: 120,
	},
	titleSlider: {
		fontSize: 24,
	},
	textSlider: {
		fontSize: 20,
	},
	letraT: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.2,
		color: colores.main,
		fontSize: 15,
		textAlign: 'center',
	},
	letraB: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.6,
		color: colores.main,
		fontSize: 24,
	},
	letraA: {
		fontFamily: 'NunitoLight',
		fontSize: 16,
		letterSpacing: 1.4,
		color: colores.main,
		backgroundColor: 'rgba(255,255,255,0.6)',
		padding: 5,
		width: '100%',
		textAlign: 'center',
	},
	adoptrue: {
		position: 'absolute',
		top: 0,
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(23,20,40,0.5)',
		paddingTop: '25%',
		alignItems: 'center',
		alignContent: 'center',
	},
	viewFiltro: {
		height: '100%',
		width: '100%',
		padding: 30,
		position: 'absolute',
		top: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	cardFiltro: {
		borderRadius: 4,
	},
});
