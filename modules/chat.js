// @refresh reset
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { BackHandler, ImageBackground } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseConfig from '../firebaseConfig';
import { PROD_URL } from '@env';
import { MascotaContext } from '../context/mascotasContext';
import { Button, Content, Icon, Input, Item, Spinner, View } from 'native-base';
import EmptyCard from '../Components/EmptyCard';
import fondo from '../assets/fondos/app_background.png';

export default function Chat({ route, navigation }) {
	const { usuario, handlerFeed } = useContext(MascotaContext);
	let mascota = route.params;
	const chatsRef = firebaseConfig().collection(mascota._id);
	const [messages, setMessages] = useState([]);
	const [msj, setMsj] = useState('');

	const chatUser = {
		name: usuario.name,
		_id: usuario._id,
		img: usuario.img,
		notification: usuario.notification,
		petName: mascota.petName,
		petPicture: mascota.petPicture,
		petId: mascota._id,
	};

	useEffect(() => {
		const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
			const messagesFirestore = querySnapshot
				.docChanges()
				.filter(({ type }) => type === 'added')
				.map(({ doc }) => {
					const message = doc.data();
					return { ...message, createdAt: message.createdAt.toDate() };
				})
				.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

			appendMessages(messagesFirestore);
		});

		return () => {
			unsubscribe();
			backHandler.remove();
		};
	}, []);

	const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.navigate('main');
		return true;
	});

	const appendMessages = useCallback(
		(messages) => {
			setMessages((previousMessages) =>
				GiftedChat.append(previousMessages, messages)
			);
		},
		[messages]
	);

	async function handleSend(messagess) {
		await messagess.map((m) => chatsRef.add(m));
		let chatTokens = [];

		const uIdMascota = mascota.usuario;
		const chats = await chatsRef.get();
		chats.forEach((doc) => {
			chatTokens = [...chatTokens, doc.data().user.notification];
		});

		await fetch(`${PROD_URL}/chat`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ chatTokens, uIdMascota }),
		}).catch((e) => console.log(e));

		let userChat = await AsyncStorage.getItem('chats');
		//TODO: Mejorar ver ------
		if (userChat) {
			userChat = JSON.parse(userChat);
			userChat = [...userChat, mascota._id];
			userChat = userChat.filter((chat, index) => {
				return userChat.indexOf(chat) === index;
			});
			await AsyncStorage.setItem('chats', JSON.stringify(userChat));
		} else {
			userChat = [mascota._id];
			await AsyncStorage.setItem('chats', JSON.stringify(userChat));
		}
		//-----------------------
	}

	return (
		<ImageBackground
			resizeMode='repeat'
			source={fondo}
			style={{
				height: '100%',
				resizeMode: 'cover',
				justifyContent: 'center',
			}}
		>
			<GiftedChat
				placeholder='escribe aqui...'
				renderUsernameOnMessage
				isLoadingEarlier
				//renderAvatar={null}
				messages={messages}
				user={chatUser}
				isLoadingEarlier
				onSend={handleSend}
				scrollToBottom={true}
				renderLoading={() => <Spinner color='green' />}
				minInputToolbarHeight={80}
				messagesContainerStyle={{
					transform: [{ scaleY: messages.length !== 0 ? 1 : -1 }],
				}}
				renderChatEmpty={() => <EmptyCard text='no hay mensajes' />}
				renderInputToolbar={(props) => (
					<View
						style={{
							flexDirection: 'row',
							marginTop: 15,
						}}
					>
						{props.renderComposer()}
						{props.renderSend(props.onSend)}
					</View>
				)}
				renderComposer={() => (
					<Content
						style={{
							flexDirection: 'column',
							marginLeft: 5,
						}}
					>
						<Item
							rounded
							style={{
								width: '95%',
								height: 50,
							}}
						>
							<Input
								onChangeText={(text) => setMsj(text)}
								placeholder='escribir...'
								style={{
									backgroundColor: '#ebebeb',
									borderRadius: 25,
								}}
							/>
						</Item>
					</Content>
				)}
				renderSend={(onSend) => (
					<Button
						onPress={() => onSend({ text: msj })}
						icon
						rounded
						small
						disabled={msj === ''}
						style={{
							flexDirection: 'column',
							marginRight: 15,
							height: 50,
							backgroundColor: '#ebebeb',
							elevation: 4,
						}}
					>
						<Icon type='Feather' name='send' style={{ color: '#0ac92a' }} />
					</Button>
				)}
			/>
		</ImageBackground>
	);
}
