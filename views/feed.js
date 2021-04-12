import React, { useContext } from 'react';
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { Tabs, Tab, TabHeading, DefaultTabBar } from "native-base";
import InfoPerro from '../Components/InfoPerro';
import Chat from './chat';
import colores from '../Components/colorPalette';
import MapFeed from '../Components/mapFeed';
import FeedTarj from '../modules/feedTarj';
import { toogleMascotaContext } from '../context/toogleContext';

const Feed = () => {
  const { renderFeed } = useContext(toogleMascotaContext)
  
  function handlerRenderFeed(){ 
   
    switch (renderFeed) {
      case "tarjetas":
        return <TabsFeed  />                  
      break;

      case "info":
        return <InfoPerro  />;
      break;

      case "chat":
        return <Chat  />;
      break;

      default:
      break
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {handlerRenderFeed()}
    </SafeAreaView>
  );
 
};


const TabsFeed = () => {
  
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
            <Text style={{ fontFamily: "NunitoLight" }}>Feed</Text>
          </TabHeading>
        }
      >
        <FeedTarj  />
      </Tab>
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: "#ffffff" }}>
            <Text style={{ fontFamily: "NunitoLight" }}>Mapa</Text>
          </TabHeading>
        }
      >
        <MapFeed  />
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
 
