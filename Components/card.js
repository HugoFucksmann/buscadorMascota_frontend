import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Modal, Dimensions } from "react-native";
import { Card, CardItem, Body, Right, Left, Thumbnail, Button, Icon, Text, Title } from "native-base";
import perro1 from '../assets/perros/perro1.jpg'
import InfoPerro from './InfoPerro';
import { mostrarFoto } from '../helpers/imageService';
import { FontDisplay } from 'expo-font';
import colores from '../Components/colorPalette';

function CardFeed({mascota}) {
  const [bool, setBool] = useState(false);
  const [foto, setFoto] = useState(mostrarFoto(mascota.petPicture));

  function tiempoTranscurrido(horaCero){
    let now = new Date();
    let tiempoPasado = now.getTime() - horaCero;
   var segs = 1000;
   var mins = segs * 60;
   var hours = mins * 60;
   var days = hours * 24;
   var months = days * 30.416666666666668;
   var years = months * 12;

   //calculo
   var anos = Math.floor(tiempoPasado / years);

   tiempoPasado = tiempoPasado - anos * years;
   var meses = Math.floor(tiempoPasado / months);

   tiempoPasado = tiempoPasado - meses * months;
   var dias = Math.floor(tiempoPasado / days);

   tiempoPasado = tiempoPasado - dias * days;
   var horas = Math.floor(tiempoPasado / hours);

   tiempoPasado = tiempoPasado - horas * hours;
   var minutos = Math.floor(tiempoPasado / mins);

   tiempoPasado = tiempoPasado - minutos * mins;
   var segundos = Math.floor(tiempoPasado / segs);

   if (minutos <= 60) return `perdido hace ${minutos} minutos`
   else if(horas < 72) return `perdido hace ${horas}hs`;
   else return `perdido hace ${dias} dias`;
   
  }

  function petInfo(mascota){
    setBool(true);
  }

  function renderModal(mascota) {
    setBool(true);
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={bool}
        presentationStyle="pageSheet"
      >
        <InfoPerro mascota={mascota} />
        <Button full small onPress={() => setBool(false)}>
          <Text>Volver</Text>
        </Button>
      </Modal>
    );
  }

  
  return (
    <>
      <Modal style={{height: '100%'}}
        animationType="slide"
        transparent={false}
        visible={bool}
        presentationStyle="pageSheet"
      >
        <InfoPerro mascota={mascota} />
        <Button full small info onPress={() => setBool(false)}
        style={{backgroundColor:colores.mainFill}}>
          <Text>Volver al feed</Text>
        </Button>
      </Modal>
      <Card style={styles.card}>
        <CardItem header style={{ height: 20 }}>
          <Title style={{ color: colores.main}}>{mascota.petName}</Title>
        </CardItem>
        <CardItem cardBody >
          <Image
            source={{uri: foto}}
            style={{ height: 250, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name="date" type="Fontisto" style={{color:colores.main}}/>
            <Text style={{color:'grey'}}>{tiempoTranscurrido(mascota.date)}</Text>
          </Left>
          <Right>
            <Button small style={{backgroundColor:colores.mainFill}}
              onPress={() => petInfo(mascota)}>
              <Text style={{color:'white'}} >+ Info</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    </>
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