import { Button, Card, CardItem, Icon, Text } from 'native-base';
import React, { useContext } from 'react';
import {
	BackHandler,
	StyleSheet,
	Image,
	View,
	Dimensions,
	Alert,
} from 'react-native';

import colores from '../Components/colorPalette';
import { MascotaContext } from '../context/mascotasContext';

const InfoAdop = ({ route, navigation }) => {
	const { handlerAdop, usuario } = useContext(MascotaContext);
	let { _id, petPicture, refugio, descripcion, estado, ...rest } = route.params;

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Importante',
			'Si estas seguro a de esta adopción notificaremos/a la institución para que se pongan en contacto, luego no podras realizar otra adopcion hasta concluir con la misma',
			[
				{
					text: 'todavia no',
					style: 'cancel',
				},
				{
					text: 'Si, quiero adoptar !!',
					onPress: () => handlerAdop(_id, usuario._id),
				},
			]
		);

	const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.navigate('main');
		return true;
	});
	return (
		<>
			<View style={styles.imgContent}>
				<Image source={{ uri: petPicture }} style={styles.imgPet} />
			</View>
			<Card style={styles.cardSup}>
				<Button
					info
					block
					onPress={() => createTwoButtonAlert()}
					style={styles.mainButtons}
				>
					<Text style={styles.textBotonMsj}> Adoptar !!</Text>
					<Icon name='heart-plus-outline' type='MaterialCommunityIcons' />
				</Button>
				<Card style={styles.cardContent}>
					{Object.keys(rest).map((key) => {
						return (
							<Card key={`${key}`} style={styles.cardCuatro}>
								<CardItem header style={styles.cuatroItem}>
									<Text style={styles.letraT}>{key}</Text>
									<Text style={styles.letraB}>{rest[key]}</Text>
								</CardItem>
							</Card>
						);
					})}
					<Card style={styles.cardDesc}>
						<CardItem style={styles.ItemDesc}>
							<Text style={styles.letraT}>Descripcion</Text>
							<Text style={styles.letraT}>{descripcion}</Text>
						</CardItem>
					</Card>
					<View style={{ width: '100%' }}>
						<Text style={styles.refugioText}>{refugio}</Text>
					</View>
				</Card>
			</Card>
		</>
	);
};

const styles = StyleSheet.create({
	letraT: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.4,
		color: colores.main,
		fontSize: 14,
	},
	letraB: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.6,
		color: colores.main,
		fontSize: 24,
	},
	refugioText: {
		alignSelf: 'center',
		marginTop: 15,
		fontFamily: 'NunitoLight',
		letterSpacing: 4,
		color: colores.main,
	},
	cardDesc: {
		borderRadius: 6,
		width: '100%',
		marginTop: 15,
		borderBottomWidth: 4,
		borderBottomColor: colores.main,
	},
	ItemDesc: {
		flexDirection: 'column',
		borderRadius: 6,
		height: 100,
	},
	cardCuatro: {
		width: '46%',
		borderRadius: 6,
		borderBottomWidth: 4,
		borderBottomColor: colores.main,
	},
	cuatroItem: {
		borderRadius: 6,

		flexDirection: 'column',
	},
	cardSup: {
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
		marginTop: -25,
		width: Dimensions.get('window').width + 2,
		marginLeft: -1,

		backgroundColor: colores.main,
		height: '100%',
	},
	cardContent: {
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
		width: Dimensions.get('window').width + 2,
		marginLeft: -1,
		height: '100%',
		padding: 25,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		backgroundColor: colores.light,
	},
	imgContent: { height: '40%', width: null },

	imgPet: {
		flex: 1,
	},
	textBotonMsj: {
		fontFamily: 'NunitoLight',
		letterSpacing: 3,
		color: '#fff',
	},
	mainButtons: {
		borderRadius: 5,
		marginLeft: 25,
		marginRight: 25,
		backgroundColor: colores.mainFill,
	},
});

export default InfoAdop;
