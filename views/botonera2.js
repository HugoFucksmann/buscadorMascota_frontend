import React, { useState } from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
import { Card, Icon, Thumbnail, Button } from "native-base";
import { mostrarFoto } from "../helpers/imageService";
import colores from "../Components/colorPalette";

const Botonera2 = ({mascotas, usuario}) => {
  console.log(mascotas[5]);
  console.log('usuu');
  console.log(usuario);
  const [miMascota] = useState(mascotas.filter((masco) => masco.usuario == usuario._id))
  console.log('mi mascota  en boto ', miMascota);
  return (
    <ScrollView>
      <View style={styles.titles}>
        <Text style={styles.titles}> MIS MASCOTAS PERDIDAS </Text>
      </View>
      {miMascota && miMascota.map((mascota) => {
        const foto = mostrarFoto(mascota.petPicture)
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

                <Button dark transparent small style={{marginTop: 10}}>
                  <Icon type="AntDesign" name="delete" small rounded />
                </Button>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
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
