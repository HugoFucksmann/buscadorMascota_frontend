import React, { useContext, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
	View,
	StyleSheet,
	Dimensions,
	Modal,
	Image,
	BackHandler,
} from 'react-native';
import { getMapLocation } from '../helpers/getLocation';
import { Button, Card, Text, CardItem, Icon, Thumbnail } from 'native-base';
import { mostrarFoto } from '../helpers/imageService';
import colores from '../Components/colorPalette';
import LoadingView from '../views/pagCarga';
import markerPet from '../assets/iconos/marker_paw.png';
import markerMan from '../assets/iconos/marker_man.png';
import fondo from '../assets/fondos/form_background.png';
import { MascotaContext } from '../context/mascotasContext';
import { useNavigation } from '@react-navigation/core';

export default function InfoPerro({ route, navigation }) {
	let mascota = route.params;
	const { usuario } = useContext(MascotaContext);
	const [foto] = useState(mostrarFoto(mascota.petPicture));
	const windowWidth = Dimensions.get('window').width;

	function renderMapInfo() {
		return (
			<MapView
				region={getMapLocation(mascota.location, usuario.location)}
				style={{ height: '100%', width: null }}
			>
				<Marker
					coordinate={{
						longitude: mascota.location.longitude,
						latitude: mascota.location.latitude,
					}}
					identifier='mkMascota'
					title='mascota'
					pinColor='blue'
				>
					<Text style={{ height: 40 }}>
						<Image
							source={markerPet}
							style={{
								height: 30,
								width: 30,
								resizeMode: 'contain',
							}}
						/>
					</Text>
				</Marker>
				<Marker
					coordinate={{
						longitude: usuario.location.longitude,
						latitude: usuario.location.latitude,
					}}
					identifier='mkUsuario'
				>
					<Text style={{ height: 40 }}>
						<Image
							source={markerMan}
							style={{
								height: 30,
								width: 30,
								resizeMode: 'contain',
							}}
						/>
					</Text>
				</Marker>
			</MapView>
		);
	}

	const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.navigate('main');
		return true;
	});

	return (
		<>
			<View style={{ height: 430, width: null }}>{renderMapInfo()}</View>
			<View>
				<Card
					style={{
						borderTopRightRadius: 40,
						borderTopLeftRadius: 40,
						marginTop: -50,
						height: '100%',
						backgroundColor: colores.light,
						borderTopWidth: 6,
						borderTopColor: colores.main,
					}}
				>
					<Thumbnail
						source={{ uri: foto }}
						style={{
							marginLeft: windowWidth / 2 - 90,
							marginTop: -90,
							height: 180,
							width: 180,
							borderRadius: 180 / 2,
							borderWidth: 3,
							borderColor: '#f2f2f2',
						}}
					/>

					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text
							style={{
								color: colores.main,
								fontSize: 25,
								marginTop: 5,
								fontFamily: 'NunitoLight',
							}}
						>
							{mascota.petName.toUpperCase()}
						</Text>
					</View>
					<Card
						style={{
							marginBottom: 10,
							padding: 5,
							borderRadius: 15,
							width: '96%',
							alignSelf: 'center',
						}}
					>
						<CardItem>
							<Text style={{ color: colores.main, fontFamily: 'NunitoLight' }}>
								Descripción:
							</Text>
						</CardItem>
						<CardItem style={{ marginTop: -15 }}>
							<Text style={{ color: colores.main, fontFamily: 'NunitoLight' }}>
								{mascota.petDescription}
							</Text>
						</CardItem>
					</Card>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Card style={styles.charCard}>
							<Text style={styles.cardText}>{mascota.petSex}</Text>
						</Card>
						<Card style={styles.charCard}>
							<Text style={styles.cardText}>{mascota.petSize}</Text>
						</Card>
						<Card style={styles.charCard}>
							<Text style={styles.cardText}>{mascota.petColor}</Text>
						</Card>
					</View>

					<Button
						info
						block
						onPress={() => navigation.navigate('chat', mascota)}
						style={styles.mainButtons}
					>
						<Text style={{ fontFamily: 'NunitoLight', letterSpacing: 3 }}>
							Mensajes
						</Text>
						<Icon name='message1' type='AntDesign' />
					</Button>
				</Card>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	charCard: {
		height: 40,
		width: 110,
		elevation: 10,
		borderRadius: 5,
		marginLeft: 8,
		marginRight: 8,
		shadowColor: 'rgba(255,255,255,255)',
		borderColor: 'rgba(255,255,255,255)',
	},
	cardText: {
		textAlign: 'center',
		marginTop: 'auto',
		marginBottom: 'auto',
		letterSpacing: 1,
		color: colores.main,
		fontFamily: 'NunitoLight',
	},
	mainButtons: {
		borderRadius: 5,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 30,
		shadowColor: '#000',
		backgroundColor: colores.mainFill,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
	},
});
