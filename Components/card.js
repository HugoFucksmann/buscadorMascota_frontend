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
      onPress={() => handlerRender(mascota, "info")}
    >
      <Card style={styles.card}>
        <CardItem cardBody>
          <Image
            source={{ uri: foto }}
            style={{ height: 230, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem style={styles.headCard}>
          {/*  <Title style={{ color: colores.main }}>{mascota.petName}</Title> */}
          <Left>
            <Icon
              active
              name="map-marker-radius"
              type="MaterialCommunityIcons"
              style={{ color: colores.main }}
            />
            <Text style={{ color: "grey" }}>{mascota.dist}</Text>
          </Left>
          {/* </CardItem>
        <CardItem style={styles.headCard}> */}
          <Icon
            active
            name="date"
            type="Fontisto"
            style={{ color: colores.main }}
          />
          <Text style={{ color: "grey" }}>
            {tiempoTranscurrido(mascota.date)}
          </Text>
          <Right>
            <Button
              small
              style={styles.button}
              onPress={() => handlerRender(mascota, "chat")}
            >
              <Icon type="Entypo" name="chat" style={{ color: colores.main }} />
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
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 10,
    alignSelf: 'center',
    padding: 0,
    width: Dimensions.get("window").width-20,
    backgroundColor: colores.mild,
    borderBottomColor: colores.main,
    borderBottomWidth: 3
  },
  headCard: { height: 40},
});


export default CardFeed;