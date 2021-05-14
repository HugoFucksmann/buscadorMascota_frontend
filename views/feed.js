import React, { useContext, useState, useCallback } from 'react';
import { RefreshControl, Text, View, FlatList } from 'react-native';
import colores from '../Components/colorPalette';
import MapFeed from '../Components/mapFeed';
import CardFeed from '../Components/card';
import { MascotaContext } from '../context/mascotasContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmptyCard from '../Components/EmptyCard';

const Tab2 = createBottomTabNavigator();

const Feed = () => {
	return (
		<Tab2.Navigator
			tabBarOptions={{
				activeTintColor: colores.main,
				tabStyle: { height: 35 },
				style: { height: 35 },
				indicatorStyle: {
					backgroundColor: 'red',
				},
				labelStyle: {
					fontFamily: 'NunitoLight',
					fontSize: 14,
					letterSpacing: 1.4,
					marginBottom: 7,
				},
			}}

			//screenOptions={}
		>
			<Tab2.Screen name='tarjFeed' component={FeedTarj} />
			<Tab2.Screen name='mapFeed' component={MapFeed} />
		</Tab2.Navigator>
	);
};

const FeedTarj = () => {
	const { mascotas, handlerMascotasGet } = useContext(MascotaContext);
	const [refreshing, setRefreshing] = useState(false);

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const onRefresh = useCallback(async () => {
		setRefreshing(true);

		await handlerMascotasGet();

		wait(300).then(() => setRefreshing(false));
	}, []);

	const renderItem = ({ item }) => {
		return <CardFeed mascota={item} />;
	};

	if (mascotas === false)
		return <EmptyCard text={'no hay mascotas perdidas'} />;
	return (
		<FlatList
			//
			bounces={false}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					colors={['green']}
				/>
			}
			scrollToOverflowEnabled={true}
			windowSize={3}
			initialNumToRender={8}
			maxToRenderPerBatch={8}
			data={mascotas}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
		/>
	);
};

export default Feed;
