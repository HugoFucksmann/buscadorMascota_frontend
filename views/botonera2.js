import React, { useState } from "react";
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
  Alert
} from "react-native";
import { Card, Icon, Thumbnail, Button, Right, Left, Header, Title, Body, CardItem } from "native-base";
import { StatusBar } from "expo-status-bar";
import { editarMascota, eliminarMascota } from "../helpers/mascotaService";
import { mostrarFoto } from "../helpers/imageService";
import colores from "../Components/colorPalette";
import banner from "../assets/banner.png";
import EmptyCard from "../Components/EmptyCard";

const Botonera2 = ({ mascotas, usuario, handlerMascotas }) => {
  let dataM = [];
    if(mascotas){
      if (!Array.isArray(mascotas)) dataM.push(mascotas);
      else dataM = mascotas;
    }
  
  return (
    <>
      <StatusBar style="auto" />
      <HeaderUser usuario={usuario} />
      {dataM.length !== 0 ? (
        <MyPetCards miMascotas={mascotas} handlerMascotas={handlerMascotas} />
      ) : (
        <EmptyCard text={"no tienes mascotas perdidas"} />
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

const MyPetCards = ({ miMascotas, handlerMascotas }) => {
  const [render, setRender] = useState();
  let data = miMascotas
  async function handlerEliminar(mascota) {
  
    let result = await eliminarMascota(mascota._id);
    if(result)   handlerMascotas();
    else Alert('error al eliminar la mascota')
  }

  const RenderItem = ({ item }) => {
    return <CardPet mascota={item} handlerEliminar={handlerEliminar} />;
  };
  
  return (
    <ScrollView>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item) => item._id}
      />
    </ScrollView>
  );
};


const CardPet = ({ mascota, handlerEliminar }) => {
  const [foto] = useState(mostrarFoto(mascota.petPicture));

  const createTwoButtonAlert = () =>
    Alert.alert("Encontraste tu mascota ?", "My Alert Msg", [
      {
        text: "todavia no",
        style: "cancel",
      },
      {
        text: "si, ya la recupere",
        onPress: () => {
          handlerEliminar(mascota);
        },
      },
    ]);

  return (
    <Card style={styles.myPetCard}>
      <Image source={{ uri: foto }} style={styles.imagenPet} />
      <View flexDirection="row" style={styles.myPetContent}>
        <Button
          onPress={() => editarMascota(mas._id)}
          small
          rounded
          style={{ backgroundColor: colores.main, width: 100, marginRight: 10 }}
        >
          <Icon fontSize="22" type="Feather" name="edit" />
          <Text style={{ color: "#fff" }}>Editar</Text>
        </Button>
        <Button
          onPress={() => createTwoButtonAlert()}
          small
          rounded
          style={{
            backgroundColor: colores.main,
            marginRight: 10,
          }}
        >
          <Icon fontSize="22" type="Feather" name="check-circle" />
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  myPetCard: {
    height: 250,
    width: 280,
    marginLeft: 20,
    borderRadius: 20,
    borderColor: colores.main,
    marginTop: 30,
  },
  imagenPet: {
    width: null,
    overflow: "hidden",
    /*  borderTopRightRadius: 20,
    borderTopLeftRadius: 20, */
    borderRadius: 20,
    height: '80%'
  },
  myPetContent: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 100,
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
