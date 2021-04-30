import React, { useContext } from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { Header, Text, Thumbnail, View } from 'native-base';
import banner from '../assets/banner.png';
import colores from '../Components/colorPalette';
import { MascotaContext } from '../context/mascotasContext';

const HeaderBuscan = () => {
	const { renderTabs, renderFeed } = useContext(MascotaContext);

	//if (renderTabs === 'perfil') return <></>;
	return (
		<Header style={styles.header}>
			<ImageBackground source={banner} style={styles.headerBackground} />
			<StatusBar
				style='auto'
				backgroundColor='#fff'
				animated={true}
				barStyle='dark-content'
			/>
		</Header>
	);
};

export default HeaderBuscan;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#00000030',
	},
	button: {
		backgroundColor: 'white',
		borderRadius: 0,
	},
	footer: {
		backgroundColor: null,
		flexDirection: 'row',
		color: colores.main,
		borderTopWidth: 3,
		borderTopColor: colores.mild,
	},
	header: {
		height: 50,
		backgroundColor: 'white',
		borderBottomColor: colores.mild,
		borderBottomWidth: 2,
		paddingTop: 11,
		paddingBottom: 11,
		//marginTop: 25,
	},
	headerBackground: {
		flex: 0.8,
		resizeMode: 'cover',
		justifyContent: 'center',
		width: null,
	},
});
