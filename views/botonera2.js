import React, { useContext } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	ImageBackground,
} from 'react-native';
import { Icon, Thumbnail, Button } from 'native-base';
import colores from '../Components/colorPalette';
import backImg from '../assets/fondos/user_background.png';
import fondo from '../assets/fondos/app_background.png';
import { MascotaContext } from '../context/mascotasContext';
import MyPetCards from '../Components/userPetCards';
import MisChats from '../Components/misChats';

const Botonera2 = () => {
	return (
		<>
			<HeaderUser />
			<ImageBackground resizeMode='repeat' source={fondo} style={styles.image}>
				<View style={styles.cardView}>
					<MyPetCards />
					<View style={styles.itemChat}/>
						
				
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

	return (
		<View style={styles.headerUContent}>
			<ImageBackground source={backImg} style={styles.image}>
				<Thumbnail
					large
					square
					style={styles.backgroundHeaderU}
					source={{ uri: usuario.img }}
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

const styles = StyleSheet.create({
	letraApp: { fontFamily: 'NunitoLight' },

	fotochat: { borderWidth: 1, borderColor: colores.main },
	backgroundHeaderU: {
		alignSelf: 'center',
		borderWidth: 4,
		borderColor: '#f2f2f2',
		borderRadius: 15,
	},
	headerUContent: {
		height: 160,
		paddingTop: 10,
		backgroundColor: colores.main,
	},

	btnFinal: {
		marginTop: 20,
		elevation: 8,
		backgroundColor: colores.mainFill,
		borderRadius: 5,
		fontFamily: 'NunitoLight',
	},
	btnFinalText: { color: colores.light, fontSize: 20 },
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
		paddingLeft: 10,
	},
	itemChat: {
		borderBottomColor: colores.main,
		borderBottomWidth: 1,
		marginRight: 10,
		marginLeft: 10,
	},
	itemTextChat: {
		alignSelf: 'center',
		letterSpacing: 1.9,
		paddingBottom: 2,
	},
	cardView: { height: '50%', justifyContent: 'space-between' },
});

export default Botonera2;
