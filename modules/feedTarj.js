import React, { useContext } from 'react';
import CardFeed from '../Components/card';
import { VirtualizedList } from 'react-native';
import { MascotaContext } from '../context/mascotasContext';

const FeedTarj = () => {
	const { mascotas, handlerFeed } = useContext(MascotaContext);

	const RenderItem = ({ item }) => {
		return <CardFeed mascota={item} handlerFeed={handlerFeed} />;
	};

	return (
		<VirtualizedList
			data={mascotas}
			renderItem={RenderItem}
			keyExtractor={(item) => item._id}
			getItemCount={(data) => data.length}
			initialNumToRender={4}
			getItem={(data, index) => data[index]}
		/>
	);
};

export default FeedTarj;
