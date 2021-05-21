import { Button, Card, CardItem, Grid, Icon, Text } from 'native-base';
import React from 'react';
import { BackHandler, StyleSheet, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colores from '../Components/colorPalette';

const InfoAdop = ({ route, navigation }) => {
	let mascotaAdop = route.params;
	const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.navigate('main');
		return true;
	});
	return (
		<>
			<View style={styles.imgContent}>
				<Image source={{ uri: mascotaAdop.avatar_url }} style={{ flex: 1 }} />
			</View>
			<Card style={styles.cardContent}>
				{Object.keys(mascotaAdop)
					.slice(0, 12)
					.map((key) => {
						return (
							<Card
								key={`${key}`}
								style={{
									width: '90%',
									alignSelf: 'center',

									borderWidth: 2,
									borderColor: colores.main,
									borderRadius: 5,
								}}
							>
								<CardItem style={{ borderRadius: 5 }}>
									<Text>{key}</Text>
								</CardItem>
							</Card>
						);
					})}

				<Button
					info
					block
					//onPress={() => handlerAdop()}
					style={styles.mainButtons}
				>
					<Text style={styles.textBotonMsj}> Adoptar !!</Text>
					<Icon name='heart-plus-outline' type='MaterialCommunityIcons' />
				</Button>
			</Card>
		</>
	);
};

const styles = StyleSheet.create({
	imgContent: { height: '45%', width: null },
	textBotonMsj: { fontFamily: 'NunitoLight', letterSpacing: 3, color: '#fff' },
	cardContent: {
		width: '100%',
		marginLeft: -2,
		borderTopRightRadius: 35,
		borderTopLeftRadius: 35,
		marginTop: -50,
		height: '100%',
		backgroundColor: colores.light,
		borderTopWidth: 6,
		borderTopColor: colores.main,
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

export default InfoAdop;
