import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	Image,
} from 'react-native';
import { Icon, View } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import Feed from '../views/feed';
import FormMascota from '../views/formulario';
import HeaderBuscan from '../Components/headerBusCan';
import Login from '../Components/login';
import colores from '../Components/colorPalette';
import Botonera2 from '../views/botonera2';
import AppIntroSlider from 'react-native-app-intro-slider';
import FeedAdop from '../views/feedAdop';
import  {
	MascotaContext,
} from '../context/mascotasContext';

const coloresFondoSlider = ['#7ecc78', '#59c3e3', '#e283fc'];
const Tab = createBottomTabNavigator();

const MainContent = ({ navigation }) => {
	const { isAuth, firstLaunch, handlerFirstLaunch } =
		useContext(MascotaContext);

	

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

	
	if (firstLaunch)
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
	
});


export default MainContent;