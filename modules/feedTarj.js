import React, { useContext } from 'react'
import { MascotasContext } from '../context/mascotasContext';
import CardFeed from '../Components/card'
import { VirtualizedList } from 'react-native';

const FeedTarj = ({ handlerRender }) => {
  const [mascotas, , usuario] = useContext(MascotasContext);

  const RenderItem = ({ item }) => {
    return (
      <CardFeed
        mascota={item}
        usuario={usuario}
        handlerRender={handlerRender}
      />
    );
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