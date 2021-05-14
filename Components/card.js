import React, { memo } from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, CardItem, Right, Left, Button, Icon, Text } from 'native-base';
import colores from '../Components/colorPalette';
import { tiempoTranscurrido } from '../helpers/getTimePass';
import { useNavigation } from '@react-navigation/native';

function CardFeed({ mascota }) {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			key={mascota._id}
			onPress={() => navigation.navigate('infoM', mascota)}
		>
			<Card style={styles.card}>
				<CardItem cardBody>
					<Image source={{ uri: mascota.petPicture }} style={styles.imagePet} />
				</CardItem>
				<CardItem style={styles.headCard}>
					<Left>
						<Icon
							active
							name='map-marker-radius'
							type='MaterialCommunityIcons'
							style={styles.colorMain}
						/>
						<Text style={styles.textCard}>{mascota.dist}</Text>
					</Left>
					<Icon active name='date' type='Fontisto' style={styles.colorMain} />
					<Text style={styles.textCard}>
						{tiempoTranscurrido(mascota.date)}
					</Text>
					<Right>
						<Button
							small
							style={styles.button}
							onPress={() => navigation.navigate('chat', mascota)}
						>
							<Icon type='Entypo' name='chat' style={styles.colorMain} />
						</Button>
					</Right>
				</CardItem>
			</Card>
		</TouchableOpacity>
	);
}
const cardWidth = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
	colorMain: { color: colores.main },
	button: {
		color: colores.main,
		backgroundColor: '#fff',
	},
	card: {
		marginBottom: 10,
		alignSelf: 'center',
		width: cardWidth,
		backgroundColor: colores.mild,
		borderBottomColor: colores.main,
		borderBottomWidth: 3,
	},
	headCard: { height: 40 },
	imagePet: { height: 220, width: null, flex: 1 },
	textCard: { color: 'grey', fontFamily: 'NunitoLight' },
});

export default memo(CardFeed);
