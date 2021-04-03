import React, { useState } from 'react';
import { SafeAreaView, VirtualizedList, Text, StyleSheet, Image, Animated } from "react-native";
import { Tabs, Tab, TabHeading, Card } from "native-base";
import CardFeed from '../Components/card';
import InfoPerro from '../Components/InfoPerro';
import Chat from './chat';
import colores from '../Components/colorPalette';
import MapView, {Marker, Callout } from 'react-native-maps';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import markerPet from '../assets/iconos/marker_paw.png'
import { Dimensions } from 'react-native';
import Screens from '../Components/mapFeed'
import MapFeed from '../Components/mapFeed';

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
         return <TabsFeed usuario={usuario} mascotas={mascotas} handlerRender={handlerRender} />                  
         break;

       case "info":
         return <InfoPerro mascota={mascota} usuario={usuario} handlerRender={handlerRender} />;
         break;

       case "chat":
         return <Chat mascota={mascota} usuario={usuario} handlerRender={handlerRender} />;
         break;

       default:
     }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {renderFeed()}
    </SafeAreaView>
  );
 
};
// MapFeed

const TabsFeed = ({ usuario, mascotas, handlerRender }) => {

  const RenderItem = ({ item }) => {
    return (
      <CardFeed mascota={item} usuario={usuario} handlerRender={handlerRender} />
    );
  };


  return (
    <Tabs
      locked
      tabBarUnderlineStyle={{ backgroundColor: colores.main, height: 2 }}
      tabContainerStyle={{ height: 40 }}
      tabBarPosition="bottom"
    >
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: "#ffffff" }}>
            <Text>Feed</Text>
          </TabHeading>
        }
      >
        <VirtualizedList
          data={mascotas}
          renderItem={RenderItem}
          keyExtractor={(item) => item._id}
          getItemCount={(data) => data.length}
          initialNumToRender={4}
          getItem={(data, index) => data[index]}
        />
      </Tab>
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: "#ffffff" }}>
            <Text>Mapa</Text>
          </TabHeading>
        }
      >
        <MapFeed
          usuario={usuario}
          mascotas={mascotas}
          handlerRender={handlerRender}
        />
      </Tab>
    </Tabs>
  );
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
    width: 320,
    marginLeft: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
  },
  callout: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 55,
    height: 55,
    margin: 0,
    padding: 0,
    backgroundColor: "white",
  },
  imageWrapper: {
    marginTop: -23,
    paddingBottom: 23,
  },
});


export default Feed;
 
