import React, { useState } from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
import { Card, Icon, Thumbnail, Button, Right, Left } from "native-base";
import { mostrarFoto } from "../helpers/imageService";
import colores from "../Components/colorPalette";

const Botonera2 = ({mascotas, usuario}) => {
  const [miMascota] = useState(mascotas.filter((masco) => masco.usuario == usuario._id))
   const [fotoPerfil] = useState(mostrarFoto(usuario.img));

  return (
    <>
      <View style={{ margin: 15 }}>
        <Card
          style={{
            height: 100,
            borderRadius: 25,
            elevation: 5,
            backgroundColor: "#ededed",
            padding: 15,
          }}
        >
          <View flexDirection="row">
            <Text style={{ fontSize: 20 }}>Hola </Text>
            <Left>
              <Text> {usuario.name} </Text>
            </Left>
            <Right>
              <Text>Iniciar sesion con otra cuenta</Text>
            </Right>
          </View>
          <View></View>
        </Card>
      </View>
      <ScrollView>
        <View style={styles.titles}>
          <Text style={styles.titles}> MIS MASCOTAS PERDIDAS </Text>
        </View>
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
          <Text>No tienes mascotas perdidas</Text>
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
  },
  dogName: {
    color: colores.main,
    fontSize: 16,
    paddingLeft: 5,
    paddingTop: 2,
  },
  card: {
    width: Dimensions.get("window").width - 10,
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
