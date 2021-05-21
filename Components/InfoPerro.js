import React, { useContext, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions, Image, BackHandler } from 'react-native';
import { getMapLocation } from '../helpers/getLocation';
import { Button, Card, Text, Icon, Thumbnail } from 'native-base';
import { mostrarFoto } from '../helpers/imageService';
import colores from '../Components/colorPalette';
import markerPet from '../assets/iconos/marker_paw.png';
import markerMan from '../assets/iconos/marker_man.png';
import { MascotaContext } from '../context/mascotasContext';

export default function InfoPerro({ route, navigation }) {
	let mascota = route.params;
	const { usuario } = useContext(MascotaContext);
	const [foto] = useState(mostrarFoto(mascota.petPicture));

	const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.navigate('main');
		return true;
	});

	return (
		<>
			<MapView
				region={getMapLocation(mascota.location, usuario.location)}
				style={styles.mapContent}
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
						<Image source={markerPet} style={styles.market} />
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
						<Image source={markerMan} style={styles.market} />
					</Text>
				</Marker>
			</MapView>

			<Card style={styles.cardContent}>
				<Thumbnail source={{ uri: foto }} style={styles.fotoMascota} />
				<View style={styles.rowCard}>
					<Text style={styles.mascotaName}>
						{mascota.petName.toUpperCase()}
					</Text>
				</View>
				<Card style={styles.cardDescrip}>
					<Text style={styles.descriptionPet}>Descripción:</Text>

					<Text style={styles.textPet}>
						{mascota.petDescription.slice(0, 105)}
					</Text>
				</Card>
				<View style={styles.rowCard}>
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
					<Text style={styles.textBotonMsj}>Mensajes</Text>
					<Icon name='message1' type='AntDesign' />
				</Button>
			</Card>
		</>
	);
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	market: {
		height: 30,
		width: 30,
		resizeMode: 'contain',
	},
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
	mapView: { height: 430, width: null },
	mapContent: { height: '55%', width: null },
	textBotonMsj: { fontFamily: 'NunitoLight', letterSpacing: 3 },
	textPet: { color: colores.main, fontFamily: 'NunitoLight' },
	descriptionPet: {
		color: colores.main,
		fontFamily: 'NunitoLight',
	},
	rowCard: { flexDirection: 'row', justifyContent: 'center' },
	cardContent: {
		borderTopRightRadius: 35,
		borderTopLeftRadius: 35,
		marginTop: -50,
		height: '100%',
		backgroundColor: colores.light,
		borderTopWidth: 6,
		borderTopColor: colores.main,
	},
	fotoMascota: {
		marginLeft: windowWidth / 2 - 90,
		marginTop: -90,
		height: 180,
		width: 180,
		borderRadius: 180 / 2,
		borderWidth: 3,
		borderColor: '#f2f2f2',
	},
	mascotaName: {
		color: colores.main,
		fontSize: 25,
		marginTop: 5,
		fontFamily: 'NunitoLight',
	},
	cardDescrip: {
		marginBottom: 10,
		padding: 10,
		borderRadius: 15,
		width: '96%',
		alignSelf: 'center',
		maxHeight: 100,
	},
});
