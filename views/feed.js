import React, { useState } from 'react';
import { SafeAreaView, VirtualizedList, Text, StyleSheet } from "react-native";
import { Tabs, Tab, TabHeading, DefaultTabBar } from "native-base";
import CardFeed from '../Components/card';
import InfoPerro from '../Components/InfoPerro';
import Chat from './chat';
import colores from '../Components/colorPalette';
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

  const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
  };


  return (
    <Tabs
      locked
      tabBarUnderlineStyle={{ backgroundColor: colores.main, height: 2 }}
      tabContainerStyle={{ height: 40 }}
      tabBarPosition="bottom"
      renderTabBar={renderTabBar}
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
 
