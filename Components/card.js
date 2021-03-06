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
      <Card  style={styles.card}>
        <CardItem cardBody>
          <Image
            source={{ uri: foto }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem style={styles.headCard}>
          <Title style={{ color: colores.main }}>{mascota.petName}</Title>
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
              bordered
              style={styles.button}
              onPress={() => handlerRender(mascota, "info")}
            >
              <Text style={{ color: colores.main, fontWeight: "bold" }}>
                + Info
              </Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    color: colores.main,
    borderColor: colores.main
  },
  card: {
    marginBottom: 8,
    alignSelf: 'center',
    padding: 0,
    width: Dimensions.get("window").width-16,
    backgroundColor: colores.light,
    borderBottomColor: colores.main,
    borderBottomWidth: 4
  },
  headCard: { height: 30 },
});


export default CardFeed;