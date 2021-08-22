import { Body, Card, CardItem, View } from 'native-base';
import React, { memo, useContext, useState } from 'react';
import { Image, Modal, StyleSheet, Text } from 'react-native';
import {
	FlatList,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import EmptyCard from '../Components/EmptyCard';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import colores from '../Components/colorPalette';
import { MascotaContext } from '../context/mascotasContext';
import { getDistSantaFe } from '../helpers/getLocation';
import colorPalette from '../Components/colorPalette';
import buscanlogo from '../assets/iconos/appLogo.png';
import bellring from '../assets/bellring.png';

const coloresFondoSlider = ['#7ecc78', '#59c3e3', '#e283fc'];

const FeedAdop = () => {
	const { usuario, mascotasAdop, handlerSliderAdop, slideradop } = useContext(MascotaContext);

	console.log(slideradop);
	const slides = [
		{
			key: 1,
			title: 'Adopciones Responsables',
			text: 'Description.\nSay something cool',
			image: bellring,
			backgroundColor: '#59b2ab',
		},
		{
			key: 2,
			title: 'Ten en cuenta',
			text: 'el proceso de adopcion no es inmediato, luego de que te contacte la institucion deberas continuar con el formularo de adopcion',
			image: '',
			backgroundColor: '#febe29',
		},
		{
			key: 3,
			title: 'Ante cualquier duda',
			text: 'Recuerda siempre ser educado y dale noma',
			image: '',
			backgroundColor: '#22bcb5',
		},
	];

	const _renderItem = ({ item, index }) => {
		return (
			<View
				style={[
					styles.sliderView,
					{ backgroundColor: coloresFondoSlider[index] },
				]}
			>
				<Text style={styles.titleSlider}>{item.title}</Text>
				<Image style={styles.sliderImg} source={item.image} />
				<Text style={styles.textSlider}>{item.text}</Text>
			</View>
		);
	};

	const renderItem = ({ item, index }) => {
		let wid = '32%';
		let hei = 120;

		if (index !== 0 && index % 9 === 0) {
			wid = '65%';
			//hei = 200;
		}
		if (index !== 2 && index % 9 === 2) {
			wid = '100%';
			hei = 200;
		}
		return <CardAdop mascotaAdop={item} wid={wid} hei={hei} />;
	};

	if (slideradop)
		return (
			<AppIntroSlider
				renderItem={_renderItem}
				data={slides}
				showSkipButton
				skipLabel='saltar'
				doneLabel='vamos !'
				nextLabel='siguiente'
				onDone={() => handlerSliderAdop()}
			/>
		);

	return (
		<>
			<FlatList
				ListHeaderComponent={() => <HeaderCardFeedAdop />}
				ListEmptyComponent={
					<EmptyCard text={'no hay mascotas en adopcion'} />
				}
				numColumns={3}
				columnWrapperStyle={{ flexWrap: 'wrap' }}
				contentContainerStyle={{ margin: '1%' }}
				bounces={false}
				scrollToOverflowEnabled={true}
				windowSize={6}
				initialNumToRender={20}
				maxToRenderPerBatch={9}
				data={mascotasAdop}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
			{usuario.adopAuth && (
				<View style={styles.viewFiltro}>
					<Card style={styles.cardFiltro}>
						<CardItem
							style={{
								borderRadius: 6,
							}}
						>
							<Text style={styles.letraA}>
								En breve te enviaran un email desde la institucion,
								estate atento
							</Text>
						</CardItem>
					</Card>
				</View>
			)}
			{getDistSantaFe(usuario) > 13 && (
				<View style={styles.viewFiltro}>
					<Card style={styles.cardFiltro}>
						<CardItem
							style={{
								borderRadius: 6,
							}}
						>
							<Text style={styles.letraA}>
								Lo sentimos, no hay refugios ni rescatistas en tu zona
								aderidos a las adopciones de BusCan
							</Text>
						</CardItem>
					</Card>
				</View>
			)}
		</>
	);
};

const HeaderCardFeedAdop = () => {
	return (
		<Card
			style={{
				alignItems: 'center',
				borderRadius: 6,
				elevation: 8,
				padding: 10,
			}}
		>
			<CardItem>
				<Text style={styles.letraB}>Adopciones Responsables</Text>
			</CardItem>
			<CardItem>
				<Text style={styles.letraT}>
					Adoptar es un acto de amor pero también de responsabilidad,
					recuerda que
				</Text>
			</CardItem>
		</Card>
	);
};

const CardAdop = memo(({ mascotaAdop, wid, hei }) => {
	const navigation = useNavigation();

	return (
		<>
			<Card
				key={mascotaAdop.avatar_url}
				style={{ width: wid, height: hei, elevation: 3 }}
			>
				<TouchableOpacity
					style={{
						backgroundColor: colorPalette.main,
						height: '100%',
					}}
					onPress={() => navigation.navigate('infoAdop', mascotaAdop)}
				>
					<Image
						source={{ uri: mascotaAdop.petPicture }}
						style={styles.imagg}
					/>
				</TouchableOpacity>
				{!mascotaAdop.estado && (
					<View style={styles.adoptrue}>
						<Text style={styles.letraA}>en proceso de adopcion</Text>
					</View>
				)}
			</Card>
		</>
	);
});

const styles = StyleSheet.create({
	imagg: { flex: 1 },
	sliderView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: '15%',
		paddingBottom: '15%',
	},
	sliderImg: {
		height: 240,
		width: 240,
		borderRadius: 120,
	},
	titleSlider: {
		fontSize: 24,
	},
	textSlider: {
		fontSize: 20,
	},
	letraT: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.2,
		color: colores.main,
		fontSize: 15,
		textAlign: 'center',
	},
	letraB: {
		fontFamily: 'NunitoLight',
		letterSpacing: 1.6,
		color: colores.main,
		fontSize: 24,
	},
	letraA: {
		fontFamily: 'NunitoLight',
		fontSize: 16,
		letterSpacing: 1.4,
		color: colores.main,
		backgroundColor: 'rgba(255,255,255,0.6)',
		padding: 5,
		width: '100%',
		textAlign: 'center',
	},
	adoptrue: {
		position: 'absolute',
		top: 0,
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(23,20,40,0.5)',
		paddingTop: '25%',
		alignItems: 'center',
		alignContent: 'center',
	},
	viewFiltro: {
		height: '100%',
		width: '100%',
		padding: 30,
		position: 'absolute',
		top: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	cardFiltro: {
		borderRadius: 4,
	},
});

export default FeedAdop;
