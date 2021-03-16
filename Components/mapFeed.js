import React, { Component } from "react";
import colores from '../Components/colorPalette'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import markerPet from "../assets/iconos/marker_paw.png";
import MapView from "react-native-maps";
import { generateInitialRegion } from "../helpers/getLocation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mostrarFoto } from "../helpers/imageService";
import {  Card,  Icon,  Right, Header, Input, Item, Button, CardItem } from "native-base";
import { tiempoTranscurrido } from "../helpers/getTimePass";
import EmptyCard from "./EmptyCard";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 110;
const CARD_WIDTH = width-80;

export default class MapFeed extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.data = [];
    if(this.props.mascotas){
       if (!Array.isArray(this.props.mascotas))
         this.data.push(this.props.mascotas);
       else this.data = this.props.mascotas;

       this.iniReg = generateInitialRegion(this.data[0].location);
    }else{
      this.iniReg = generateInitialRegion(this.props.usuario.location);
    }
   
    
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      console.log('aca ', index, this.index);
      if (index >= this.data.length) {
        index = this.data.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
      
        if (this.index !== index) {
          this.index = index;
          const { location } = this.data[index];          
          this.map.animateToRegion(
            {
              ...location,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068 
            },
            350
          );
          
        }
      }, 30);
    });
  }

  render() {
    
    const interpolations = this.data.map((mascota, index) => {
      
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];
      
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    
    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => (this.map = map)}
          initialRegion={this.iniReg}
          style={styles.container}
        >
          {this.data.length !== 0 &&
            this.data.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };

              return (
                <MapView.Marker
                  key={`${index}${Date.now()}`}
                  coordinate={marker.location}
                >
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <Text style={{ height: 40 }}>
                      <Animated.Image
                        source={markerPet}
                        style={styles.markerImage}
                      />
                    </Text>
                  </Animated.View>
                </MapView.Marker>
              );
            })}
        </MapView>
        <SearchBar />
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 15}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.data.length !== 0 ? (
            this.data.map((mascota) => (
              <CardFeedMap
                mascota={mascota}
                key={mascota._id}
                handlerRender={this.props.handlerRender}
              />
            ))
          ) : (
            <EmptyCard text={"no hay perros perdidos"} />
          )}
        </Animated.ScrollView>
      </View>
    );
  }
}

const CardFeedMap = ({ mascota, handlerRender }) => {
  const foto = mostrarFoto(mascota.petPicture);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={mascota._id}
      onPress={() => {handlerRender(mascota, "info")}}
    >
      <Card style={styles.cardd}>
        <View style={{ flexDirection: "column", height: "100%", width: "40%" }}>
          <Image
            source={{ uri: foto }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        <View style={{ flexDirection: "column-reverse" }}>
          <View style={{ flexDirection: "row", padding: 12 }}>
            <Icon
              active
              name="date"
              type="Fontisto"
              style={{ color: colores.main, fontSize: 20, paddingRight: 5 }}
            />
            <Text style={{ color: "grey", fontSize: 13 }}>
              {tiempoTranscurrido(mascota.date)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingLeft: 12 }}>
            <Icon
              active
              name="map-marker-radius"
              type="MaterialCommunityIcons"
              style={{ color: colores.main, fontSize: 20, paddingRight: 5 }}
            />
            <Text style={{ color: "grey" }}>{mascota.dist}</Text>
          </View>

          <View style={{ flexDirection: "row", paddingLeft: 13 }}>
            <Text style={{ fontWeight: "bold", color: colores.main }}>
              {mascota.petName}
            </Text>
            <Right >
              <Icon
                type="Entypo"
                name="circle-with-plus"
                style={{ color: colores.main }}
              />
            </Right>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const SearchBar = () => {

  return (
    <View
      style={{
        position: "absolute",
        top: 20,
        width: Dimensions.get("window").width - 100,
        alignSelf: "center",
      }}
    >
      <Card style={{ borderRadius: 20}}>
        <CardItem style={{flexDirection: 'row', height: 40, borderRadius: 20}}>
          <Icon name="ios-search" />
          <Input placeholder="buscar" />
         
        </CardItem>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    //paddingVertical: 10,
    zIndex: 100,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  cardd: {
    flexDirection: "row",
    marginLeft: 15,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 15,
    borderRightWidth: 6,
    borderColor: colores.main,
  },
  card: {
    flexDirection: "row",
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 15,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    //overflow: "hidden",
    borderRadius: 15,
    borderRightWidth: 6,
    borderRightColor: colores.main,
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: 65,
  },
  /* marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  }, */
  ring: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colores.mainTenueUno,
    position: "absolute",
    bottom: 7,
    borderWidth: 2,
    borderColor: colores.main,
  },
  markerImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
