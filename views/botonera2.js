import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
import { Card, Icon, Thumbnail, Button, Right, Left, Header, Title, Body, Image } from "native-base";
import { mostrarFoto } from "../helpers/imageService";
import colores from "../Components/colorPalette";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import banner from "../assets/banner.png";

const Botonera2 = ({mascotas, usuario}) => {
 
  const [miMascota, setMiMascota] = useState(false);
   const [fotoPerfil] = useState(mostrarFoto(usuario.img));

  useEffect(() => {
   
    if (mascotas) setMiMascota(mascotas.filter((masco) => masco.usuario == usuario._id));
  },[])
   
  return (
    <>
      {/* <Header span >
        <Left >
          <Thumbnail small source={{ uri: fotoPerfil }} />
          <Text> {usuario.name} </Text>
        </Left>
        <Body>
          <Left></Left>
        </Body>

        <StatusBar style="auto" backgroundColor="#ffffff" />
      </Header> */}
      <View
        style={{
          height: 200,
          padding: 25,
          backgroundColor: "#c4d9c3",
        }}
      >
        <Thumbnail
          large
          style={{ alignSelf: "center" }}
          source={{ uri: fotoPerfil }}
        />
        <Text style={{ alignSelf: "center", fontSize: 24, marginTop: 10 }}> {usuario.name} </Text>
      </View>
      <ScrollView>
        <Text style={styles.titles}> MIS MASCOTAS PERDIDAS </Text>
        {miMascota ? (
          miMascota.map((mascota) => {
            const foto = mostrarFoto(mascota.petPicture);
            return (
              <Card style={styles.card} key={mascota._id}>
                <Thumbnail source={{ uri: foto }} style={styles.picture} />

                <View>
                  <View style={styles.dogName}>
                    <Text style={styles.dogName}>{mascota.petName}</Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.textBox}>
                      <Text>
                        ultimo mensaje recibido gdfs gsdfg dfgd fhfd hfdfhdf
                      </Text>
                    </View>

                    <Button dark transparent small style={{ marginTop: 10 }}>
                      <Icon type="AntDesign" name="delete" small rounded />
                    </Button>
                  </View>
                </View>
              </Card>
            );
          })
        ) : (
          <View style={styles.titles}>
            <Text> No tienes mascotas perdidas </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titles: {
    marginTop: 5,
    color: colores.main,
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: 'center'
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
  fotoPerfil: {
    
  },
  textBox: {
    margin: 5,
    padding: 5,
    //width: Dimensions.get("window").width - 110,
    backgroundColor: "white",
    borderRadius: 10,
    width: '70%',
    flexDirection: 'row'
  },
});

export default Botonera2;
