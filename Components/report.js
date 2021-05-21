import { Card, Icon } from 'native-base';
import React, { PureComponent, useContext } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { MascotaContext } from '../context/mascotasContext';
import colorPalette from './colorPalette';

const Report = ({ mid }) => {
	const { handlerReport } = useContext(MascotaContext);
	const createTwoButtonAlert = () =>
		Alert.alert(
			'Deseas reportar esta publicacion ?',
			'si crees que el contenido no es apto reportalo',
			[
				{
					text: 'cancelar',
					style: 'cancel',
				},
				{
					text: 'si, reportar',
					onPress: () => handlerReport(mid),
				},
			]
		);

	return (
		<Icon
			onPress={() => createTwoButtonAlert()}
			type='Ionicons'
			name='notifications-circle-sharp'
			style={styles.iconReport}
		/>
	);
};
const cardWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
	iconReport: {
		color: colorPalette.main,
		fontSize: 24,
		backgroundColor: '#fff',
		paddingLeft: 1.5,
		borderRadius: 8,
		alignSelf: 'center',
		elevation: 3,
	},
});

export default Report;
