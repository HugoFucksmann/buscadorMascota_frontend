import React, { useMemo, useContext } from 'react';
import colores from '../Components/colorPalette';
import MapFeed from '../Components/mapFeed';
import CardFeed from '../Components/card';
import { MascotaContext } from '../context/mascotasContext';
import { FlatList } from 'react-native-gesture-handler';
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
	const { mascotas } = useContext(MascotaContext);

	const renderItem = ({ item }) => {
		return <CardFeed mascota={item} />;
	};

	const memorizedList = useMemo(() => renderItem);

	if (mascotas === false)
		return <EmptyCard text={'no hay mascotas perdidas'} />;
	return (
		<FlatList
			windowSize={3}
			initialNumToRender={8}
			maxToRenderPerBatch={8}
			data={mascotas}
			renderItem={memorizedList}
			keyExtractor={(item) => item._id}
		/>
	);
};

export default Feed;
