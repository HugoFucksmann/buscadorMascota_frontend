import React, { useState } from 'react';
import { SafeAreaView, VirtualizedList, Text, StyleSheet, WebView, Image, Animated } from "react-native";
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
         return <MapFeed usuario={usuario} mascotas={mascotas} handlerRender={handlerRender} />                  
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

/**
 * /*   <Tabs
              locked
             tabBarUnderlineStyle={{ backgroundColor: colores.main, height: 2 }}
             tabContainerStyle={{ height: 40 }}
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
              
                 <MapFeed usuario={usuario} mascotas={mascotas} />
             
             </Tab>
           </Tabs> 
           
           
           const MapaPerros = ({usuario, mascotas}) => {
    let data = [];
    if (!Array.isArray(mascotas)) data.push(mascotas);
    else data = mascotas;
  const [index, setIndex] = useState(0)
  const [render, setRender] = useState({
    ...data[0].location,
    latitudeDelta: 0.0271,
    longitudeDelta: 0.0272,
  });

  
  const RenderItem = ({ item }) => {
   
    return (
      <Card onto style={styles.cardMap}>
        <Text>Holaa</Text>
      </Card>
    );
  };

  const fixImage = (content) =>
    Platform.OS === "ios" ? (
      content
    ) : (
      <Text style={styles.imageWrapper}>content</Text>
    );



  return (
    <>
      <MapView style={styles.fullScreen} region={render}>
        {data.map((mascota) => (
          <Marker
            key={`${mascota._id}`}
            coordinate={mascota.location}
            tracksViewChanges={false}
          >
            <Text style={{ height: 40 }}>
              <Image
                source={markerPet}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: "contain",
                }}
              />
            </Text>
          </Marker>
        ))}
      </MapView>
       <ScrollView style={styles.ViewFlotante}>
        <FlatList
          horizontal
          data={data}
          renderItem={RenderItem}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>

    </>
  );
}
           */
 
