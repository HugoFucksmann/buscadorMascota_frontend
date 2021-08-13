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

				<View style={styles.rowCard}>
					<Card style={styles.charCard}>
						<Text style={styles.letraT}>Sexo</Text>
						<Text style={styles.letraB}>{mascota.petSex}</Text>
					</Card>
					<Card style={styles.charCard}>
						<Text style={styles.letraT}>Tamaño</Text>
						<Text style={styles.letraB}>{mascota.petSize}</Text>
					</Card>
					<Card style={styles.charCard}>
						<Text style={styles.letraT}>Color</Text>
						<Text style={styles.letraB}>{mascota.petColor}</Text>
					</Card>
				</View>
				<Card style={styles.cardDescrip}>
					<Text style={styles.descriptionPet}>Descripción:</Text>

					<Text style={styles.textPet}>
						{mascota.petDescription.slice(0, 105)}
					</Text>
				</Card>
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
	letraT: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.4,
		color: colores.main,
		fontSize: 13,
	},
	letraB: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.6,
		color: colores.main,
		fontSize: 24,
	},
	market: {
		height: 30,
		width: 30,
		resizeMode: 'contain',
	},
	charCard: {
		height: 80,
		width: 110,
		elevation: 8,
		borderRadius: 6,
		marginLeft: 8,
		marginRight: 8,
		padding: 10,
		borderBottomWidth: 4,
		borderBottomColor: colores.main,
		alignItems: 'center',
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
		borderRadius: 6,
		marginTop: 20,
		shadowColor: '#000',
		backgroundColor: colores.main,

		elevation: 8,
	},
	mapContent: { height: '45%', width: null },
	textBotonMsj: { fontFamily: 'NunitoLight', letterSpacing: 3 },
	textPet: { color: colores.main, fontFamily: 'NunitoLight' },
	descriptionPet: {
		color: colores.main,
		fontFamily: 'NunitoLight',
	},
	rowCard: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
	cardContent: {
		borderTopRightRadius: 35,
		borderTopLeftRadius: 35,
		marginTop: -50,
		height: '100%',
		backgroundColor: colores.light,
		borderTopWidth: 6,
		borderTopColor: colores.main,
		padding: 25,
	},
	fotoMascota: {
		marginLeft: windowWidth / 2 - 105,
		marginTop: -105,
		height: 150,
		width: 150,
		borderRadius: 150 / 2,
		borderWidth: 2,
		borderColor: colores.main,
	},
	mascotaName: {
		color: colores.main,
		fontSize: 25,
		marginTop: 5,
		fontFamily: 'NunitoLight',
	},
	cardDescrip: {
		padding: 10,
		borderRadius: 6,
		width: '100%',
		alignSelf: 'center',
		maxHeight: 100,
		minHeight: 80,
		borderBottomWidth: 4,
		borderBottomColor: colores.main,
	},
});
