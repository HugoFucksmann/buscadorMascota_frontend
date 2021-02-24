import React, { useState } from 'react'
import { StyleSheet, Image, Modal, Dimensions, TouchableOpacity  } from "react-native";
import { Card, CardItem, Right, Left, Button, Icon, Text, Title } from "native-base";
import InfoPerro from './InfoPerro';
import { mostrarFoto } from '../helpers/imageService';
import colores from '../Components/colorPalette';
import { tiempoTranscurrido } from '../helpers/getTimePass';

function CardFeed({mascota, usuario, handlerRender}) {
  const [foto] = useState(mostrarFoto(mascota.petPicture));

  return (
    <TouchableOpacity
      key={mascota._id}
      activeOpacity={1}
      onPress={() => handlerRender(mascota, "info")}
    >
      <Card style={styles.card}>
        <CardItem header style={{ height: 20 }}>
          <Title style={{ color: colores.main }}>{mascota.petName}</Title>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: foto }}
            style={{ height: 250, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Icon
              active
              name="date"
              type="Fontisto"
              style={{ color: colores.main }}
            />
            <Text style={{ color: "grey" }}>
              {tiempoTranscurrido(mascota.date)}
            </Text>
          </Left>
          <Right>
            <Button
              small
              style={{ backgroundColor: colores.mainFill }}
            >
              <Text style={{ color: "white" }}>+ Info</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    marginBottom: 5
  },
  contTarjeta: {
   backgroundColor: 'red'
  },
  button: {
    color: colores.main,
    textAlign: "center"
  },
  card: {
    marginBottom: 15, 
    padding: 0, 
    elevation: 6, 
    width: Dimensions.get('window').width-10, 
    borderRadius:5,
    backgroundColor: colores.light 
  }
});


export default CardFeed;