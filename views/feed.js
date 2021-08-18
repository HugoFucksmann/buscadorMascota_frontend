import React, { useContext, useState, useCallback } from 'react';
import { RefreshControl, Text, View, FlatList } from 'react-native';
import colores from '../Components/colorPalette';
import MapFeed from '../Components/mapFeed';
import CardFeed from '../Components/card';
import { MascotaContext } from '../context/mascotasContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmptyCard from '../Components/EmptyCard';
import { Icon } from 'native-base';

const Tab2 = createBottomTabNavigator();

const Feed = () => {
	return (
		<Tab2.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					let iconType;

					switch (route.name) {
						case 'tarjFeed':
							iconName = 'images';
							iconType = 'FontAwesome5';
							color = focused ? colores.main : colores.mild;
							act = focused ? 1 : 0;
							break;
						case 'mapFeed':
							iconName = 'map-marked-alt';
							iconType = 'FontAwesome5';
							color = focused ? colores.main : colores.mild;
							act = focused ? 1 : 0;
							break;

						default:
							iconName = 'dynamic-feed';
							iconType = 'MaterialIcons';
							color = focused ? colores.main : colores.mild;
							act = focused ? 1 : 0;
							break;
					}

					return (
						<Icon
							type={iconType}
							name={iconName}
							style={{
								color: color,
								fontSize: 22,
							}}
						/>
					);
				},
			})}
			tabBarOptions={{
				showLabel: false,
				style: { height: 34 },
			}}
			cust
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

	return (
		<FlatList
			ListEmptyComponent={
				<EmptyCard text={'no hay mascotas perdidas'} />
			}
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
