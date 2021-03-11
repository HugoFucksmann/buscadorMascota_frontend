import React, { useState } from 'react';
import { SafeAreaView, VirtualizedList, Text, StyleSheet } from "react-native";
import { Tabs, Tab, TabHeading, View, Card } from "native-base";
import CardFeed from '../Components/card';
import InfoPerro from '../Components/InfoPerro';
import Chat from './chat';
import colores from '../Components/colorPalette';
import { Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { FlatList } from 'react-native-gesture-handler';

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
         return (
           <Tabs
             tabBarPosition="bottom"
             tabBarUnderlineStyle={{ backgroundColor: colores.main, height: 2 }}
             tabContainerStyle={{ height: 40 }} >
             <Tab heading={
                <TabHeading style={{ backgroundColor: "#ffffff" }}>
                  <Text>Feed</Text>
                </TabHeading>
                }>

               <VirtualizedList
                 data={mascotas}
                 renderItem={RenderItem}
                 keyExtractor={(item) => item._id}
                 getItemCount={(data) => data.length}
                 initialNumToRender={4}
                 getItem={(data, index) => data[index]}
               />
               
             </Tab>
             <Tab heading={
                <TabHeading style={{ backgroundColor: "#ffffff" }}>
                  <Text>Mapa</Text>
                </TabHeading> 
                }>

               <MapaPerros usuario={usuario} mascotas={mascotas} />

             </Tab>
           </Tabs>
         );
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

const MapaPerros = ({usuario, mascotas}) => {
  const [index, setIndex] = useState(0)
  let ubi = {
    ...usuario.location,
    latitudeDelta: 0.0271,
    longitudeDelta: 0.0272
  }

  let data = [];
  if (!Array.isArray(mascotas)) data.push(mascotas);
  else data = mascotas;

  const RenderItem = ({ item }) => {
    return <CardFlotante mascota={item} index={index} />;
  };

  return (
    <>
      <MapView style={styles.fullScreen} region={ubi}>
        {data.map((mascota, index) => (
          <Marker
            pinColor="#1c241b"
            key={mascota._id}
            coordinate={mascota.location}
            onSelect={() => setIndex(index)}
          />
        ))}
      </MapView>
      <View style={styles.ViewFlotante}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={RenderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
}

const CardFlotante = ({ mascota, index }) => {
  return <Card style={styles.cardMap}>
    <Text>Holaa</Text>
  </Card>;
};

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
  ViewFlotante: {
    position: "absolute",
    bottom: 10,
    zIndex: 100,
  },
  cardMap: {
    height: 120,
    width: 300,
    marginLeft: 25
  },
});



export default Feed;