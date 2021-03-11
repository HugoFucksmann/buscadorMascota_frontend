import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import { Card, Icon, Thumbnail, Button, Right, Left, Header, Title, Body, CardItem } from "native-base";
import { mostrarFoto } from "../helpers/imageService";
import colores from "../Components/colorPalette";
import { StatusBar } from "expo-status-bar";
import banner from "../assets/banner.png";

const Botonera2 = ({mascotas, usuario}) => {
 
  return (
    <>
      <StatusBar style="auto" />
      <HeaderUser usuario={usuario} />
      {mascotas ? (
        <MyPetCards miMascotas={mascotas} />
      ) : (
        <Text>No tienes mascotas perdidas</Text>
      )}
    </>
  );
};

const HeaderUser = ({usuario}) => {
  const [fotoPerfil] = useState(mostrarFoto(usuario.img));
  return (
    <View
      style={{
        height: 200,
        paddingTop: 40,
        backgroundColor: colores.main,
      }}
    >
      <View style={{ flexDirection: "row-reverse", height: 20 }}>
        <Button transparent>
          <Icon
            type="EvilIcons"
            name="gear"
            style={{ fontSize: 30, color: "black" }}
          />
        </Button>
      </View>
      <Thumbnail
        large
        style={{
          alignSelf: "center",
          borderWidth: 3,
          borderColor: "#f2f2f2",
        }}
        source={{ uri: fotoPerfil }}
      />
      <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 10 }}>
        {usuario.name}
      </Text>
    </View>
  );
}

const MyPetCards = ({miMascotas}) => {

  let data = [];
  if (!Array.isArray(miMascotas)) data.push(miMascotas)
  else data = miMascotas;
  
  const RenderItem = ({ item }) => {
    return <CardPet mascota={item} />;
  };

  return (
    <ScrollView >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item) => item._id}
      />
    </ScrollView>
  );
}

const CardPet = ({mascota}) => {
  
  const [foto] = useState(mostrarFoto(mascota.petPicture));
  return (
    <Card style={styles.myPetCard}>
      <Image source={{ uri: foto }} style={styles.imagenPet} />
      <View style={{padding: 15}} flexDirection="column">
        <Text>Nombre: {mascota.petName}</Text>
        <Text>color: {mascota.petColor}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  myPetCard: {
    height: 450,
    width: Dimensions.get("window").width - 80,
    marginLeft: 20,
    borderRadius: 20,
    borderColor: colores.main,
    marginTop: 30,
  },
  imagenPet: {
    height: "30%",
    width: null,
    overflow: "hidden",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  titles: {
    marginTop: 5,
    color: colores.main,
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  dogName: {
    color: colores.main,
    fontSize: 16,
    paddingLeft: 5,
    paddingTop: 2,
  },
  card: {
    width: Dimensions.get("window").width - 20,
    flexDirection: "row",
    backgroundColor: colores.light,
    marginBottom: 5,
  },
  picture: {
    margin: 5,
    height: 80,
    width: 80,
    borderRadius: 120 / 2,
  },
  fotoPerfil: {},
  textBox: {
    margin: 5,
    padding: 5,
    //width: Dimensions.get("window").width - 110,
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    flexDirection: "row",
  },
  cardF: {
    height: 300,
    width: Dimensions.get("window").width - 26,
    alignItems: "center",
    elevation: 4,
    borderRadius: 25,
    borderWidth: 2,
  },
});
 

export default Botonera2;
