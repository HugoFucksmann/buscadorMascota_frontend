import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";
import { getMapLocation, myLocation } from "../helpers/getLocation";
import {
  Button,
  Card,
  Text,
  CardItem,
  Icon,
  H3,
  Thumbnail,
} from "native-base";
import { mostrarFoto } from "../helpers/imageService";
import Chat from "../views/chat";
import colores from '../Components/colorPalette';
import LoadingView from "../views/pagCarga";



export default function InfoPerro( {mascota, usuario} ) {
  const [activeChat, setActiveChat] = useState(false)
  const [petUbi] = useState(getMapLocation(mascota.location));
  const [miUbi, setMiUbi] = useState({latitude: 0, longitude: 0});
  const [foto] = useState(mostrarFoto(mascota.petPicture));  
  const [loading, setLoading] = useState(true)
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    let isMount = true
    if(isMount){
      (async () => {
        setMiUbi(await myLocation());
        setLoading(false)
      })();
    }
    return () => isMount = false
  },[])



  if(activeChat){
    return  <Chat mascotaId={mascota._id} usuario={usuario} />;
  }
    //MapVew > Marker fijate abajo 
    return (
      <View>
        {loading ? (
          <View style={{ height: 400, width: null }}>
            <LoadingView />
          </View>
        ) : (
          <MapView style={{ height: 400, width: null }} initialRegion={petUbi}>
            <Marker
              coordinate={{
                longitude: mascota.location.longitude[0],
                latitude: mascota.location.latitude[0],
              }}
              identifier="mkMascota"
            >
              {/* ------- aca perro -------- */}
             {/*  <Image
                source={require("../assets/")}
                style={{ height: 35, width: 35 }}
              /> */}
            </Marker>
            <Marker
              coordinate={{
                longitude: miUbi.longitude,
                latitude: miUbi.latitude,
              }}
              identifier="mkUsuario"
            >
              {/* ------- aca persona-------- */}
             {/*  <Image
                source={require("../assets/")}
                style={{ height: 35, width: 35 }}
              /> */}
            </Marker>
          </MapView>
        )}

        <Card
          style={{
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            marginTop: -40,
          }}
        >
          <Thumbnail
            source={{ uri: foto }}
            style={{
              marginLeft: windowWidth / 2 - 60,
              marginTop: -60,
              height: 120,
              width: 120,
              borderRadius: 120 / 2,
            }}
          />

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: colores.main, fontSize: 25, marginTop: 15 }}>
              {mascota.petName}
            </Text>
          </View>

          <View style={{ marginBottom: 15 }}>
            <CardItem header>
              <Text style={{ color: "grey" }}> Descripción</Text>
            </CardItem>
            <CardItem style={{ marginTop: -15 }}>
              <Text style={{ color: "grey" }}>{mascota.petDescription}</Text>
            </CardItem>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Card style={styles.charCard}>
              <Text style={styles.cardText}>{mascota.petSex}</Text>
            </Card>
            <Card style={styles.charCard}>
              <Text style={styles.cardText}>{mascota.petSize}</Text>
            </Card>
            <Card style={styles.charCard}>
              <Text style={styles.cardText}>{mascota.petColor}</Text>
            </Card>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Button
              info
              block
              onPress={() => setActiveChat(true)}
              style={styles.mainButtons}
            >
              <Text>Mensajes</Text>
              <Icon name="message1" type="AntDesign" />
            </Button>
            <Button info block style={styles.mainButtons}>
              <Text>Compartir</Text>
              <Icon name="share" type="Entypo" />
            </Button>
          </View>
        </Card>
      </View>
    );

}


const styles = StyleSheet.create({
  charCard: {
    height: 40,
    width: 110,
    elevation: 10,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    shadowColor: "rgba(255,255,255,255)",
    borderColor: "rgba(255,255,255,255)",
  },
  cardText: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    letterSpacing: 1,
    color: colores.main,
  },
  mainButtons: {
    borderRadius: 5,
    width: "40%",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: colores.mainFill,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});