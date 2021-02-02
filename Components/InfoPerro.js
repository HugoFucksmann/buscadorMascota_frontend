import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet} from "react-native";
import { getMapLocation } from "../helpers/getLocation";
import {
  Button,
  Card,
  Text,
  CardItem,
  Icon,
  H3,
  Thumbnail,
} from "native-base";

import perro1 from "../assets/perros/perro1.jpg";
import { mostrarFoto } from "../helpers/imageService";
import Chat from "../views/chat";
import colores from '../Components/colorPalette';

export default function InfoPerro( {mascota} ) {
  const [activeChat, setActiveChat] = useState(false)
  const [ubi] = useState(getMapLocation(mascota.location));
  const [foto] = useState(mostrarFoto(mascota.petPicture));

  
  if(activeChat){

    return (
      <>
        <Chat mascotaId={mascota._id} />
      </>
    );
  }
    return (
      <View>
        <MapView style={{ height: 300, width: null }} initialRegion={ubi}>
          <Marker
            coordinate={{
              longitude: mascota.location.longitude[0],
              latitude: mascota.location.latitude[0],
            }}
          />
        </MapView>

        <Card
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginTop: -50,
          }}
        >
          <Thumbnail
            source={{uri: foto}}
            style={{
              marginLeft: 150,
              marginTop: -60,
              height: 120,
              width: 120,
              borderRadius: 120 / 2,
            }}
          />

          <View style={{flexDirection: "row", justifyContent:'center'}}>
              <Text style={{ color: colores.main, fontSize: 25, padding:15}} >
                {mascota.petName}
              </Text>
          </View>
          <View style={{ marginTop: 15, marginBottom: 25 }}>
            <CardItem header style={{ marginBottom: -15 }}>
              <Text style={{color:'grey'}}> Descripción</Text>
            </CardItem>
            <CardItem>
              <Text style={{color:'grey'}}>{mascota.petDescription}</Text>
            </CardItem>
          </View>
          <View style={{ flexDirection: "row", justifyContent:'center' }}>
            <Card style={styles.charCard} >
              <Text style={styles.cardText} >
                {mascota.petSex}
              </Text>
            </Card>
            <Card style={styles.charCard} >
              <Text style={styles.cardText} >
                {mascota.petSize}
              </Text>
            </Card>
            <Card style={styles.charCard} >
              <Text style={styles.cardText} >
                {mascota.petColor}
              </Text>
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
            <Button
              info
              block
              style={styles.mainButtons}
            >
              <Text>Compartir</Text>
              <Icon name="share" type="Entypo" />
            </Button>
          </View>
        </Card>
      </View>
    );

}


const styles = StyleSheet.create({
  charCard : {
    height: 40,
    width: 110,
    elevation: 10,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    shadowColor: 'rgba(255,255,255,255)',
    borderColor: 'rgba(255,255,255,255)',
  },
  cardText: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    letterSpacing: 1,
    color: colores.main
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
  }
});