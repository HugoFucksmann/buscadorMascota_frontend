import React, { useContext, useEffect, useState } from 'react';
import {
	ScrollView,
	View,
	Text,
	Dimensions,
	StyleSheet,
	FlatList,
	ImageBackground,
	Modal,
	Image,
	Alert,
} from 'react-native';
import {
	Card,
	Icon,
	Thumbnail,
	Button,
	Right,
	Left,
	Body,
	Label,
	Item,
	Input,
	Textarea,
	Picker,
	Content,
	ListItem,
	List,
	Spinner,
} from 'native-base';

import { editarMascota, eliminarMascota } from '../helpers/mascotaService';
import colores from '../Components/colorPalette';
import backImg from '../assets/fondos/user_background.png';
import EmptyCard from '../Components/EmptyCard';

import fondo from '../assets/fondos/app_background.png';
import SwitchSelector from 'react-native-switch-selector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getMyChats } from '../helpers/getMyChats';

import { getFechaChat } from '../helpers/getTimePass';
import { MascotaContext } from '../context/mascotasContext';
import { useNavigation } from '@react-navigation/core';
import { mostrarFoto } from '../helpers/imageService';

const Botonera2 = () => {
	return (
		<>
			<HeaderUser />
			<ImageBackground resizeMode='repeat' source={fondo} style={styles.image}>
				<View style={{ height: '50%' }}>
					<MyPetCards />
				</View>
				<ScrollView>
					<MisChats />
				</ScrollView>
			</ImageBackground>
		</>
	);
};

const HeaderUser = () => {
	const { usuario } = useContext(MascotaContext);
	const fotoPerfil = mostrarFoto(usuario.img);
	return (
		<View
			style={{
				height: 160,
				paddingTop: 10,
				backgroundColor: colores.main,
			}}
		>
			<ImageBackground source={backImg} style={styles.image}>
				<Thumbnail
					large
					square
					style={{
						alignSelf: 'center',
						borderWidth: 4,
						borderColor: '#f2f2f2',
						borderRadius: 15,
					}}
					source={{ uri: fotoPerfil }}
				/>
				<Text
					style={{
						alignSelf: 'center',
						fontSize: 22,
						marginTop: 10,
						color: colores.mild,
						fontFamily: 'NunitoLight',
					}}
				>
					{usuario.name}
				</Text>
			</ImageBackground>
		</View>
	);
};

const MyPetCards = () => {
	const { misMascotas, handlerMascota } = useContext(MascotaContext);

	const RenderItem = ({ item }) => {
		return <CardPet mascota={item} handlerMascota={handlerMascota} />;
	};
	if (misMascotas.length === 0)
		return <EmptyCard text='no tienes mascotas perdidas' />;
	return (
		<>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={misMascotas}
				renderItem={RenderItem}
				keyExtractor={(item) => item._id}
			/>
			<ListItem style={{ marginRight: 20 }}>
				<Body>
					<Text
						style={{
							color: colores.main,
							textAlign: 'center',
							fontFamily: 'NunitoLight',
							marginLeft: 20,
						}}
					>
						CHATS
					</Text>
				</Body>
			</ListItem>
		</>
	);
};

const CardPet = ({ mascota, handlerMascota }) => {
	const [isModal, setIsModal] = useState(false);
	const navigation = useNavigation();
	const createTwoButtonAlert = () =>
		Alert.alert(
			'Encontraste tu mascota ?',
			'si aceptas se eliminara el registro de tu mascota',
			[
				{
					text: 'todavia no',
					style: 'cancel',
				},
				{
					text: 'si, ya la recupere',
					onPress: () => handlerEliminar(),
				},
			]
		);

	async function handlerEliminar() {
		let result = await eliminarMascota(mascota._id);
		if (result) handlerMascota('eliminar', mascota);
	}

	return (
		<>
			<Card
				key={mascota._id}
				style={[
					styles.myPetCard,
					{
						flexDirection: 'row',
						borderRightWidth: 6,
						borderColor: colores.main,
					},
				]}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate('infoM', mascota)}
					style={{
						borderRadius: 25,
						height: '100%',
						width: 160,
						marginLeft: -10,
					}}
				>
					<Image
						style={{ borderRadius: 25, height: '100%' }}
						source={{ uri: mascota.petPicture }}
					/>
				</TouchableOpacity>
				<View
					style={{
						paddingLeft: 10,
						paddingTop: 5,
					}}
				>
					<Text
						style={{
							color: 'black',
							lineHeight: 22,
							fontFamily: 'NunitoLight',
						}}
					>
						Nombre: {mascota.petName}
					</Text>
					<Text
						style={{
							color: '#000',
							lineHeight: 22,
							fontFamily: 'NunitoLight',
						}}
					>
						Sexo: {mascota.petSex}
					</Text>
					<Text
						style={{
							color: '#000',
							lineHeight: 22,
							fontFamily: 'NunitoLight',
						}}
					>
						Color: {mascota.petColor}
					</Text>
					<Text
						style={{
							color: '#000',
							lineHeight: 22,
							fontFamily: 'NunitoLight',
						}}
					>
						Tamaño: {mascota.petSize}
					</Text>
					<Text
						style={{
							color: '#000',
							lineHeight: 22,
							fontFamily: 'NunitoLight',
						}}
					>
						desc: {mascota.petDescription.slice(0, 18)}...
					</Text>

					<View flexDirection='row'>
						<Button
							rounded
							small
							style={{
								backgroundColor: '#fff',
								elevation: 4,
								marginRight: 10,
								width: 51,
								height: 51,
								marginTop: 4,
							}}
							onPress={() => navigation.navigate('chat', mascota)}
						>
							<Icon
								type='Entypo'
								name='chat'
								style={{
									color: colores.main,
								}}
							/>
						</Button>
						<Button
							onPress={() => setIsModal(true)}
							small
							rounded
							style={{
								backgroundColor: '#fff',
								elevation: 4,
								marginRight: 10,
								width: 51,
								height: 51,
								marginTop: 4,
							}}
						>
							<Icon
								style={{
									color: colores.main,
								}}
								type='Feather'
								name='edit'
							/>
						</Button>
						<Button
							onPress={() => createTwoButtonAlert()}
							small
							rounded
							style={{
								backgroundColor: '#fff',
								elevation: 4,
								marginRight: 10,
								width: 51,
								height: 51,
								marginTop: 4,
							}}
						>
							<Icon
								style={{
									color: colores.main,
								}}
								type='Feather'
								name='check-circle'
							/>
						</Button>
					</View>
				</View>
			</Card>
			<Modal
				animationType='slide'
				transparent={true}
				visible={isModal}
				onRequestClose={() => {
					setIsModal(false);
				}}
			>
				<ModalContent mascota={mascota} handlerMascota={handlerMascota} />
			</Modal>
		</>
	);
};

const MisChats = () => {
	const { mascotas } = useContext(MascotaContext);
	const navigation = useNavigation();
	const [chats, setChats] = useState(false);

	async function loadChats() {
		let resp = await getMyChats();
		setChats(resp);
	}

	function handlerChat(petId) {
		let [laMascota] = mascotas.filter((mascota) => mascota._id === petId);
		navigation.navigate('chat', laMascota);
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			await loadChats();
		});
		return unsubscribe;
	}, [navigation]);

	return (
		<Content>
			<List>
				{chats ? (
					chats.map((chat) => {
						let fecha = getFechaChat(chat.createdAt);

						return (
							<TouchableOpacity
								key={chat._id}
								onPress={() => handlerChat(chat.user.petId)}
								style={{ marginBottom: 8 }}
							>
								<ListItem avatar noBorder>
									<Left>
										<Thumbnail source={{ uri: chat.user.petPicture }} />
									</Left>
									<Body>
										<Text style={{ fontFamily: 'NunitoLight' }}>
											{chat.user.petName.toUpperCase()}
										</Text>
										<Text style={{ fontFamily: 'NunitoLight' }}>
											msj:&nbsp;
											{chat.text.length > 42
												? `${chat.text.slice(0, 40)}...`
												: chat.text}
										</Text>
									</Body>
									<Right>
										<Text style={{ fontFamily: 'NunitoLight' }} note>
											{fecha}
										</Text>
									</Right>
								</ListItem>
							</TouchableOpacity>
						);
					})
				) : (
					<View>
						<Spinner color='green' />
					</View>
				)}
			</List>
		</Content>
	);
};

const ModalContent = ({ mascota, handlerMascota }) => {
	const [perro, setPerro] = useState(mascota);

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

	async function handlerEditar() {
		let result = await editarMascota(perro);
		if (result) return handlerMascota('editar', result);
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'flex-end',
				backgroundColor: 'rgba(0,0,0,0.7)',
			}}
		>
			<View
				style={{
					backgroundColor: colores.light,
					padding: 15,
					paddingTop: 20,
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20,
				}}
			>
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
							onValueChange={(value) => setPerro({ ...perro, petSize: value })}
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

				<Button block style={styles.btnFinal} onPress={() => handlerEditar()}>
					<Label style={{ color: colores.light, fontSize: 20 }}>Editar</Label>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	myPetCard: {
		height: 150,
		width: Dimensions.get('window').width - 50,
		borderRadius: 25,
		marginLeft: 20,
		marginTop: 30,
	},
	btnFinal: {
		marginTop: 20,
		elevation: 8,
		backgroundColor: colores.mainFill,
		borderRadius: 5,
		fontFamily: 'NunitoLight',
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
	swSelector: { width: 270, marginLeft: 20, padding: 5 },
	itemForm: {
		marginBottom: 15,
		borderColor: colores.mild,
		paddingLeft: 10,
		backgroundColor: '#fff',
		borderRadius: 5,
	},
});

export default Botonera2;
