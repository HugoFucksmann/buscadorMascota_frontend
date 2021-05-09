import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Image,
	Platform,
	Text,
	ScrollView,
	StyleSheet,
	ImageBackground,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import {
	Picker,
	Item,
	Label,
	Input,
	Textarea,
	Form,
	Left,
	Card,
	Button,
	H3,
	Right,
	Body,
	CardItem,
	Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import noImagen from '../assets/default_plus.png';
import { myLocation } from '../helpers/getLocation';
import { crearMascota, actualizarArchivo } from '../helpers/mascotaService';
import LoadingView from '../views/pagCarga';
import colores from '../Components/colorPalette';
import { Dimensions } from 'react-native';
import markerPet from '../assets/iconos/marker_paw.png';
import fondo from '../assets/fondos/form_background.png';
import { MascotaContext } from '../context/mascotasContext';

const FormMascota = ({ navigation }) => {
	const { usuario, misMascotas, handlerMascota } = useContext(MascotaContext);
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [onPressLoading, setOnPressLoading] = useState(false);

	const [ubi] = useState({
		...usuario.location,
		latitudeDelta: 0.0052,
		longitudeDelta: 0.0051,
	});

	const [perro, setPerro] = useState({
		petName: '',
		petPicture: '',
		petSize: 'chico',
		petSex: 'macho',
		petDescription: '',
		petColor: 'marron',
		location: {
			longitude: 0,
			latitude: 0,
		},
	});

	function validateForm() {
		return (
			file !== null && perro.location.latitude !== 0 && perro.petName.length > 0
		);
	}

	function topCargas() {
		let disable;
		if (misMascotas.length >= 3) disable = true;
		else disable = false;

		return disable;
	}

	async function uploadPerro() {
		setOnPressLoading(true);
		const token = await AsyncStorage.getItem('token');

		let perroId = await crearMascota(perro, token, usuario.notification);

		if (!perroId) {
			setOnPressLoading(false);
			return alert('error al crear perro');
		} else {
			let mascota = await actualizarArchivo(file, perroId, token);
			if (!mascota) alert('Error al cargar la imagen del perro!');
			handlerMascota('crear', mascota);

			setOnPressLoading(false);
			return navigation.navigate('perfil');
		}
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.7,
		});
		if (!result.cancelled) {
			setImage(result.uri);
			let localUri = result.uri;
			let filename = localUri.split('/').pop();

			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;
			setFile(result);
		}
	};

	const switchOptions = [
		{
			label: 'Blanco',
			value: 'blanco',
			activeColor: '#f5f5f5',
		},
		{
			label: 'Negro',
			value: 'negro',
			activeColor: 'black',
		},
		{ label: 'Marrón', value: 'marron', activeColor: '#6e2b0c' },
		{
			label: 'Gris',
			value: 'gris',
			activeColor: 'grey',
		},
		{ label: 'Canela', value: 'canela', activeColor: '#f0eddf' },
	];

	return (
		<ImageBackground source={fondo} style={styles.image} resizeMode='repeat'>
			<ScrollView>
				<View style={{ padding: 20 }}>
					<Card style={{ borderRadius: 20 }}>
						<SwitchSelector
							initial={0}
							onPress={(value) => setPerro({ ...perro, petName: value })}
							textColor={colores.mainFill}
							selectedColor={colores.light}
							buttonColor={colores.mainFill}
							hasPadding
							fontSize={15}
							textStyle={{ fontFamily: 'NunitoLight' }}
							selectedTextStyle={{ fontFamily: 'NunitoLight' }}
							borderWidth={0}
							options={[
								{ label: 'Se perdió mi mascota', value: '' },
								{
									label: 'Encontré animal perdido',
									value: 'Perdido!!',
								},
							]}
						/>
					</Card>
					<Button
						block
						bordered={false}
						onPress={pickImage}
						info
						style={styles.buttonUnderImage}
					>
						{image ? (
							<Image source={{ uri: image }} style={styles.imagen} />
						) : (
							<Image source={noImagen} style={styles.imagen} />
						)}
					</Button>
					<Card style={styles.map}>
						<MapView
							style={styles.map}
							initialRegion={ubi}
							onPress={(e) =>
								setPerro({ ...perro, location: e.nativeEvent.coordinate })
							}
						>
							<Marker pinColor='#1c241b' coordinate={perro.location}>
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
						</MapView>
						<Card
							style={{
								alignSelf: 'center',
								position: 'relative',
								bottom: 50,
								borderRadius: 5,
								padding: 5,
							}}
						>
							<Text
								style={{
									fontSize: 13,
									color: colores.main,
									fontFamily: 'NunitoLight',
								}}
							>
								Indica dónde se perdió
							</Text>
						</Card>
					</Card>
					{perro.petName !== 'Perdido!!' && (
						<Card style={styles.itemForm}>
							<Item picker style={{ paddingLeft: 10 }}>
								<Input
									value={perro.petName}
									onChangeText={(nombre) =>
										setPerro({ ...perro, petName: nombre })
									}
									placeholder='Nombre mascota'
									style={{ fontFamily: 'NunitoLight' }}
								/>
							</Item>
						</Card>
					)}

					<Card style={styles.itemForm}>
						<Item picker style={{ paddingLeft: 10 }}>
							<Left>
								<Text style={{ fontFamily: 'NunitoLight' }}>Sexo:</Text>
							</Left>
							<Picker
								mode='dropdown'
								selectedValue={perro.petSex}
								onValueChange={(value) => setPerro({ ...perro, petSex: value })}
								itemTextStyle={{ fontFamily: 'NunitoLight' }}
							>
								<Picker.Item label='macho' value='macho' />
								<Picker.Item label='hembra' value='hembra' />
							</Picker>
						</Item>
					</Card>

					<Card style={styles.itemForm}>
						<Item picker style={{ paddingLeft: 10 }}>
							<Left>
								<Text style={{ fontFamily: 'NunitoLight' }}>Tamaño:</Text>
							</Left>

							<Picker
								mode='dropdown'
								selectedValue={perro.petSize}
								itemTextStyle={{ fontFamily: 'NunitoLight' }}
								onValueChange={(value) =>
									setPerro({ ...perro, petSize: value })
								}
							>
								<Picker.Item label='chico' value='chico' />
								<Picker.Item label='mediano' value='mediano' />
								<Picker.Item label='grande' value='grande' />
							</Picker>
						</Item>
					</Card>

					<Card style={styles.itemForm}>
						<Item picker style={{ paddingLeft: 10 }}>
							<Left>
								<Text style={{ fontFamily: 'NunitoLight' }}>Color:</Text>
							</Left>
							<Right>
								<SwitchSelector
									textStyle={{ fontFamily: 'NunitoLight' }}
									selectedTextStyle={{ fontFamily: 'NunitoLight' }}
									initial={2}
									hasPadding
									borderWidth={0}
									options={switchOptions}
									onPress={(value) => setPerro({ ...perro, petColor: value })}
									style={styles.swSelector}
								/>
							</Right>
						</Item>
					</Card>

					<Card style={styles.itemForm}>
						<Textarea
							rowSpan={3}
							bordered
							style={styles.textArea}
							placeholder='Descripción'
							value={perro.petDescription}
							onChangeText={(value) =>
								setPerro({ ...perro, petDescription: value })
							}
						/>
					</Card>
					<Button
						block
						info
						style={[
							styles.btnFinal,
							{
								backgroundColor:
									!validateForm() ||
									topCargas() == true ||
									onPressLoading == true
										? 'grey'
										: colores.mainFill,
							},
						]}
						onPress={async () => await uploadPerro()}
						disabled={!validateForm() || topCargas() || onPressLoading}
					>
						{onPressLoading ? (
							<Spinner color='green' />
						) : (
							<Label
								style={{
									color: colores.light,
									fontSize: 20,
									fontFamily: 'NunitoLight',
								}}
							>
								{topCargas() === true ? 'maximo de carga alcanzado' : 'CARGAR'}
							</Label>
						)}
					</Button>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	state: { marginTop: 20, marginBottom: 5 },
	itemForm: {
		marginBottom: 15,
		borderBottomColor: colores.main,
		borderBottomWidth: 3,
		borderRadius: 5,
	},
	imagen: {
		height: 200,
		width: Dimensions.get('window').width - 40,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 15,
		marginTop: 15,
	},
	swSelector: { width: 270, marginLeft: 20, padding: 5 },
	btnFinal: {
		marginTop: 20,
		elevation: 10,
		backgroundColor: colores.mainFill,
		borderRadius: 5,
	},
	map: {
		height: 200,
		width: Dimensions.get('window').width - 40,
		alignSelf: 'center',
		marginBottom: 15,
	},
	buttonUnderImage: {
		height: 200,
		width: Dimensions.get('window').width - 40,
		shadowRadius: 0,
		backgroundColor: 'rgba(0,0,0,0)',
		padding: 0,
		marginBottom: 15,
		marginTop: 15,
		alignSelf: 'center',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	textArea: {
		backgroundColor: '#fff',
		borderColor: 'transparent',
		borderRadius: 5,
		fontFamily: 'NunitoLight',
	},
});

export default FormMascota;
