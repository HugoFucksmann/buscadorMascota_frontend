import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
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

export default function InfoPerro( {mascota} ) {
  const [activeChat, setActiveChat] = useState(false)
  const [ubi] = useState(getMapLocation(mascota.location));
  const [foto] = useState(mostrarFoto(mascota.petPicture));

  
  if(activeChat){

    return (
      <>
        <Chat mascotaId={mascota._id} />
        <Button small block info onPress={() => setActiveChat(false)}>
          <Text>Retroceder</Text>
        </Button>
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

          <View style={{ flexDirection: "row" }}>
            <Button
              info
              block
              onPress={() => setActiveChat(true)}
              style={{
                borderRadius: 10,
                width: "40%",
                margin: "5%",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
              }}
            >
              <Text>Mensajes</Text>
              <Icon name="message1" type="AntDesign" />
            </Button>
            <Button
              info
              block
              style={{
                borderRadius: 10,
                width: "40%",
                margin: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <Text>Compartir</Text>
              <Icon name="share" type="Entypo" />
            </Button>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Card
              style={{
                height: 60,
                width: 80,
                elevation: 10,
                borderRadius: 15,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                  letterSpacing: 1.5,
                }}
              >
                {mascota.petName}
              </Text>
            </Card>
            <Card
              style={{
                height: 60,
                width: 80,
                elevation: 10,
                borderRadius: 15,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                  letterSpacing: 1.5,
                }}
              >
                {mascota.petSex}
              </Text>
            </Card>
            <Card
              style={{
                height: 60,
                width: 80,
                elevation: 10,
                borderRadius: 15,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                  letterSpacing: 1.5,
                }}
              >
                {mascota.petSize}
              </Text>
            </Card>
            <Card
              style={{
                height: 60,
                width: 80,
                elevation: 10,
                borderRadius: 15,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                  letterSpacing: 1.5,
                }}
              >
                {mascota.petColor}
              </Text>
            </Card>
          </View>
          <View style={{ marginTop: 15, marginBottom: 25 }}>
            <CardItem header style={{ marginBottom: -15 }}>
              <H3>Descripcion</H3>
            </CardItem>
            <CardItem>
              <Text>{mascota.petDescription}</Text>
            </CardItem>
          </View>
        </Card>
      </View>
    );

}
