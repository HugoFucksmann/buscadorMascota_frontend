import React, { useState } from 'react';
import { FlatList, SafeAreaView } from "react-native";
import CardFeed from '../Components/card';
import InfoPerro from '../Components/InfoPerro';
import Chat from './chat';

const Feed = ({mascotas, usuario}) => {
  
  const [mascota, setMascota] = useState(false);
  const [render, setRender] = useState('tarjetas');

  const RenderItem = ({item}) => {
    return (
      <CardFeed
        mascota={item}
        usuario={usuario}
        handlerRender={handlerRender}
      />
    );
  };

  function handlerRender(mascota, render) {
    if (mascota) setMascota(mascota);
    setRender(render);
  }
  
  function renderFeed(){
     switch (render) {
       case "tarjetas":
         return <FlatList data={mascotas} renderItem={RenderItem} keyExtractor={(item) => item._id} />
         break;

       case "info":
         return <InfoPerro mascota={mascota} usuario={usuario} handlerRender={handlerRender} />;
         break;

       case "chat":
         return <Chat mascotaId={mascota._id} usuario={usuario} handlerRender={handlerRender} />;
         break;

       default:
     }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(242,246,239,255)" }}>
      
      {renderFeed()}
    </SafeAreaView>
  );
 
};



export default Feed;