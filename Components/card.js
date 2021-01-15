import React, { } from 'react'
import { View, StyleSheet, Image } from "react-native";
import { Card, CardItem, Body, Right, Left, Thumbnail, Button, Icon, Text, Title } from "native-base";
import perro1 from '../assets/perros/perro1.jpg'

function Cardd({mascotas}) {
  console.log(mascotas);
  return (
    <Card>
      <CardItem header >
        <Left />
        <Title style={{color: 'black'}}>{mascotas.petName}</Title>
        <Right />
      </CardItem>
      <CardItem cardBody>
        <Image source={perro1} style={{ height: 200, width: null, flex: 1 }} />
      </CardItem>
      <CardItem >
        <Left>
          <Icon active name="date" type="Fontisto" />
          <Text>{mascotas.date}</Text>
        </Left>
       
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    marginBottom: 5
  },
  contTarjeta: {
   backgroundColor: 'blue'
  },
});


export default Cardd;