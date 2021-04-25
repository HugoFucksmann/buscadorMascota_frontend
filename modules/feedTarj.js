import React, { useContext, useState } from 'react'
import CardFeed from '../Components/card'
import { VirtualizedList } from 'react-native';
import { mostrarFoto } from '../helpers/imageService';
import { toogleMascotaContext } from '../context/toogleContext';

const FeedTarj = () => {
  const { mascotas, handlerFeed } = useContext(toogleMascotaContext);
  
  const RenderItem = ({ item }) => {
    return (
      <CardFeed mascota={item} handlerFeed={handlerFeed}  />
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