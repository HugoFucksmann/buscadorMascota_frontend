import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMyChats } from '../helpers/getMyChats';
import colores from '../Components/colorPalette';
import { getFechaChat } from '../helpers/getTimePass';
import { useNavigation } from '@react-navigation/core';
import { MascotaContext } from '../context/mascotasContext';
import {
	Body,
	Content,
	Left,
	List,
	ListItem,
	Right,
	Spinner,
	Thumbnail,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
										<Thumbnail
											source={{
												uri: chat.user.petPicture,
											}}
											style={styles.fotochat}
										/>
									</Left>
									<Body>
										<Text style={styles.letraApp}>
											{chat.user.petName.slice(0, 11).toUpperCase()}
										</Text>
										<Text style={styles.letraApp}>
											msj:&nbsp;
											{chat.text.length > 42
												? `${chat.text.slice(0, 40)}...`
												: chat.text}
										</Text>
									</Body>
									<Right>
										<Text style={styles.letraApp} note>
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

const styles = StyleSheet.create({
	letraApp: { fontFamily: 'NunitoLight' },

	fotochat: { borderWidth: 1, borderColor: colores.main },
});

export default MisChats;
