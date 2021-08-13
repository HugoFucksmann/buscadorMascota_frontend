import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
	BackHandler,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseConfig from '../firebaseConfig';
import { PROD_URL3 } from '@env';
import { MascotaContext } from '../context/mascotasContext';
import { Button, Content, Icon, Input, Item, Spinner, View } from 'native-base';
import EmptyCard from '../Components/EmptyCard';
import fondo from '../assets/fondos/app_background.png';

export default function Chat({ route, navigation }) {
	const { usuario, handlerMyChats } = useContext(MascotaContext);
	let mascota = route.params;
	console.log(mascota._id);
	const chatsRef = firebaseConfig().collection(mascota._id);
	const [messages, setMessages] = useState([]);
	const [msj, setMsj] = useState('');

	const chatUser = {
		_id: usuario._id,
		name: usuario.name,
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
		let chatTokens = [];

		await messagess.map((m) => chatsRef.add(m));

		const uIdMascota = mascota.usuario;
		const chats = await chatsRef.get();
		chats.forEach((doc) => {
			chatTokens = [...chatTokens, doc.data().user.notification];
		});
		fetch(`${PROD_URL3}/chat`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ chatTokens, uIdMascota, mascota }),
		}).catch((e) => console.log(e));

		let userChat = await AsyncStorage.getItem('chats');
		if (userChat) {
			userChat = JSON.parse(userChat);
			userChat = [...userChat, mascota._id];

			userChat = userChat.filter((chat, index) => {
				return userChat.indexOf(chat) === index;
			});
			await AsyncStorage.setItem('chats', JSON.stringify(userChat));
			return handlerMyChats();
		} else {
			handlerMyChats();
			userChat = [mascota._id];
			await AsyncStorage.setItem('chats', JSON.stringify(userChat));
		}
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
								value={msj}
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
						onPress={() => {
							onSend({ text: msj });
							setMsj('');
						}}
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
			{Platform.OS === 'android' && <KeyboardAvoidingView behavior='padding' />}
		</ImageBackground>
	);
}
