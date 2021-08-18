import React, { Component, memo } from "react";
import colores from "../Components/colorPalette";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import markerPet from "../assets/iconos/marker_paw.png";
import MapView from "react-native-maps";
import { generateInitialRegion } from "../helpers/getLocation";
import { Card, Icon, Button } from "native-base";
import { tiempoTranscurrido } from "../helpers/getTimePass";
import EmptyCard from "./EmptyCard";
import { MascotaContext } from "../context/mascotasContext";
import { useNavigation } from "@react-navigation/native";
import Report from "./report";
const { width } = Dimensions.get("window");
const CARD_HEIGHT = 130;
const CARD_WIDTH = width - 95;

export default class MapFeed extends Component {
  static contextType = MascotaContext;
  constructor(props) {
    super(props);
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.data = [];
  }

  componentDidMount() {
    if (this.context.mascotas) {
      console.log("estaaa");
      this.animation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH); // animate 30% away from landing on the next item

        if (index >= this.context.mascotas.length) {
          index = this.context.mascotas.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }

        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          if (this.index !== index) {
            this.index = index;
            const { location } = this.context.mascotas[index];

            this.map.animateToRegion(
              {
                ...location,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
              },
              350
            );
          }
        }, 10);
      });
    }
  }

  renderItem = ({ item }) => <CardFeedMap mascota={item} />;

  render() {
    let iniReg = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0052,
      longitudeDelta: 0.0051,
    };
    let interpolations;
    let mascotas = this.context.mascotas;

    if (mascotas && mascotas.length > 0) {
      iniReg = generateInitialRegion(mascotas[0].location);
      interpolations = mascotas.map((mascota, index) => {
        const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 1.7, 1],
          extrapolate: "clamp",
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });
        return { scale, opacity };
      });
    }

    return (
      <View style={styles.container}>
        {mascotas && mascotas.length > 0 && (
          <MapView ref={(map) => (this.map = map)} initialRegion={iniReg} style={styles.container}>
            {mascotas.map((marker, index) => {
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
                <MapView.Marker key={`${index}${Date.now()}`} coordinate={marker.location}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <Text style={styles.textH}>
                      <Image source={markerPet} style={styles.markerImage} />
                    </Text>
                  </Animated.View>
                </MapView.Marker>
              );
            })}
          </MapView>
        )}

        <Animated.FlatList
          ListEmptyComponent={<EmptyCard text={"no hay mascotas perdidas"} />}
          windowSize={3}
          contentContainerStyle={styles.endPadding}
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
          horizontal
          data={mascotas}
          renderItem={this.renderItem}
          keyExtractor={(item) => item._id}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
        />
      </View>
    );
  }
}

const CardFeedMap = memo(({ mascota }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={mascota._id}
      onPress={() => navigation.navigate("infoM", mascota)}
    >
      <Card style={styles.cardd}>
        <View style={styles.floatView}>
          <Button small style={styles.button} onPress={() => navigation.navigate("chat", mascota)}>
            <Icon type="Entypo" name="chat" style={styles.colorMain} />
          </Button>
          <Report />
        </View>

        <View style={styles.imgCont}>
          <Image source={{ uri: mascota.petPicture }} style={styles.cardImage} resizeMode="cover" />
        </View>
        <View style={{ flexDirection: "column-reverse" }}>
          <View style={styles.rowView}>
            <Icon active name="date" type="Fontisto" style={styles.iconCard} />
            <Text style={styles.textCard}>{tiempoTranscurrido(mascota.date)}</Text>
          </View>

          <View style={styles.rowView}>
            <Icon
              active
              name="map-marker-radius"
              type="MaterialCommunityIcons"
              style={styles.iconCard}
            />
            <Text style={styles.textCard}>{mascota.dist}</Text>
          </View>

          <View style={styles.rowView}>
            <Text style={styles.petName}>{mascota.petName.slice(0, 11)}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  colorMain: { color: colores.main, fontSize: 18 },
  container: {
    flex: 1,
  },
  floatView: { position: "absolute", top: 4, right: 8, flexDirection: "row" },
  textH: { height: 40 },
  rowView: { flexDirection: "row", paddingLeft: 12, paddingBottom: 12 },
  imgCont: {
    flexDirection: "column",
    width: "50%",
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 3,
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
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
    borderRadius: 15,
    borderRightWidth: 6,
    borderColor: colores.main,
  },
  cardImage: {
    alignSelf: "center",
    width: "106%",
    height: "106%",
    borderRadius: 15,
    marginLeft: -10,
    marginTop: "-3%",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: 65,
  },
  ring: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colores.tenueOp,
    position: "absolute",
    bottom: 7,
    borderWidth: 1.5,
    borderColor: colores.main,
  },
  markerImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  button: {
    color: colores.main,
    backgroundColor: "#fff",
    marginRight: 20,
    height: 25,
  },
  iconCard: { color: colores.main, fontSize: 20, paddingRight: 5 },
  textCard: { color: colores.main, fontFamily: "NunitoLight", fontSize: 14 },
  petName: {
    color: colores.main,
    fontSize: 20,
    fontFamily: "NunitoLight",
    marginBottom: -6,
  },
});
