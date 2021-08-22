import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	ImageBackground,
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

import fondo1 from '../assets/fondos/fondocolor1.jpeg'
import fondo2 from '../assets/fondos/fondocolor2.jpeg'
import fondo3 from '../assets/fondos/fondocolor3.jpeg'
import fondo4 from '../assets/fondos/fondocolor4.jpeg'
import jorLogo from '../assets/jor/jorLogo.png'
import jorico from '../assets/jor/jorP.jpeg'
import buscanlog from '../assets/banner2.png'
const coloresFondoSlider = [fondo2, fondo3,  fondo3];
const Tab = createBottomTabNavigator();

const MainContent = ({ navigation }) => {
	const { isAuth, firstLaunch, handlerFirstLaunch } =
		useContext(MascotaContext);

	

	const slides = [
		{
			key: 1,
			title: 'BUSCAN',
			text: 'App desarrollada a partir de la iniciativa del la concejala Jorgelina Mudallel',
			image: buscanlog,
			jorlogo: jorLogo,
			backgroundColor: '#59b2ab',
		},
		{
			key: 2,
			title: 'Recuerda:',
			text: 'se educado al hablar con otros usuarios y no dudes en reportar una publicacion si crees que no es adecuada',
			image: '',
			backgroundColor: '#febe29',
		},
		
	];

	const _renderItem = ({ item, index }) => {

		if(index === 0) return <ImageBackground
		source={coloresFondoSlider[index]}
			style={[
				styles.sliderView,
				{ backgroundColor: coloresFondoSlider[index] },
			]}
		>
		
			
			<Image style={{
				height: 60,
				width: '80%'
			}} 
			source={item.image}
			 />
			<Text style={styles.textSlider}>{item.text}</Text>
		<Image style={{ height: 100, width: 260}} source={item.jorlogo} />
	
		</ImageBackground>

		return (
			<ImageBackground
			source={coloresFondoSlider[index]}
				style={[
					styles.sliderView,
					{ backgroundColor: coloresFondoSlider[index] },
				]}
			>
				<Text style={styles.titleSlider}>{item.title}</Text>
				<Image style={styles.sliderImg} source={item.image} />
				<Text style={styles.textSlider}>{item.text}</Text>
		
			</ImageBackground>
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
		
		padding: '12%'
	},
	sliderImg: {
		height: 240,
		width: 240,
		borderRadius: 120,
	},
	titleSlider: {
		fontSize: 26,
		letterSpacing: 4,
		textAlign: 'center',
		color: '#f2f2f2',
	},
	textSlider: {
		fontSize: 20,
		letterSpacing: 1.6,
		textAlign: 'center',
		color: '#f2f2f2',
	},
	
});


export default MainContent;