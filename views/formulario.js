import React, { Component, useState, useEffect } from 'react'
import { Image, Platform, Text, ScrollView, StyleSheet } from "react-native";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import {
  Picker,
  Item,
  Label,
  Input,
  Textarea,
  Form,
  Left,
  Card,
  Button,
  Icon,
  H3,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwitchSelector from "react-native-switch-selector";

import noImagen from "../assets/default-image.png";

import myLocation from "../helpers/getLocation";
import actualizarArchivo from "../helpers/mascotaService";
import mascotaService from "../helpers/mascotaService";
import LoadingView from "../views/pagCarga";

export default class Formulario extends Component {
  constructor(props) {
    super(props)(async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await this.ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("ups! :( , se necesita el permiso para que funcione ");
        }
      }
    })();

    this.setState({ lolo: "aaa" });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setFile(result);
      /*  let formData = new FormData();
      formData.append("imgMascota", result); */
    }
  };

  render() {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [ubi, setUbi] = useState({});
    const [mark, setMark] = useState([{ latitude: 0, longitude: 0 }]);
    const [isLoading, setLoading] = useState(true);
    const [perro, setPerro] = useState({
      petName: "",
      petPicture: "",
      petSize: "chico",
      petSex: "macho",
      petDescription: "",
      petColor: "marron",
      petState: "perdido",
      recovered: false,
      location: {
        longitude: 0,
        latitude: 0,
      },
    });

    return (
      <ScrollView>
        <Card >
          <SwitchSelector
            style={styles.state}
            initial={0}
            onPress={(value) => setPerro({ ...perro, petState: value })}
            textColor={"#ff8254"}
            selectedColor={"black"}
            buttonColor={"#7f78ff"}
            hasPadding
            options={[
              { label: "Se perdio mi perro", value: "perdido" },
              { label: "Encontre un perro perdido", value: "encontrado" },
            ]}
          />
          {perro.petState === "perdido" && (
            <Item floatingLabel style={styles.itemForm}>
              <Label>nombre del perro</Label>
              <Input
                value={perro.petName}
                onChangeText={(nombre) =>
                  setPerro({ ...perro, petName: nombre })
                }
              />
            </Item>
          )}

          <Button block bordered info small onPress={pickImage}>
            <Icon type="AntDesign" name="downcircleo" />
            <Text>cargar imagen del perro</Text>
          </Button>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagen} />
          ) : (
            <Image source={noImagen} style={styles.imagen} />
          )}
          <H3
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 16,
            }}
          >
            Selecciona donde se perdio
          </H3>

          {/* <MapView style={styles.map} region={ubii}>
        <Marker coordinate={ubi} />
      </MapView> */}

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {mark.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              />
            ))}
            <MapView.Marker
              coordinate={{ latitude: 37.73538, longitude: -122.4324 }}
              title={"marker.title"}
              description={"desss"}
            />
          </MapView>

          <Item picker style={styles.itemForm}>
            <Left>
              <Text>Sexo</Text>
            </Left>
            <Picker
              mode="dropdown"
              selectedValue={perro.petSex}
              onValueChange={(value) => setPerro({ ...perro, petSex: value })}
            >
              <Picker.Item label="macho" value="macho" />
              <Picker.Item label="hembra" value="hembra" />
            </Picker>
          </Item>

          <Item picker style={styles.itemForm}>
            <Left>
              <Text>Tamaño</Text>
            </Left>

            <Picker
              mode="dropdown"
              selectedValue={perro.setSize}
              onValueChange={(value) => setPerro({ ...perro, petSize: value })}
            >
              <Picker.Item label="chico" value="chico" />
              <Picker.Item label="mediano" value="mediano" />
              <Picker.Item label="grande" value="grande" />
            </Picker>
          </Item>

          <Item picker style={styles.itemForm}>
            <Text>Color de pelo</Text>
            <SwitchSelector
              initial={2}
              hasPadding
              options={[
                {
                  label: "Blanco",
                  value: "blanco",
                  activeColor: "white",
                },
                {
                  label: "Negro",
                  value: "negro",
                  activeColor: "black",
                  textColor: "white",
                },
                {
                  label: "Marron",
                  value: "marron",
                  activeColor: "#6e2b0c",
                },
                {
                  label: "Gris",
                  value: "gris",
                  activeColor: "grey",
                },
                {
                  label: "Canela",
                  value: "canela",
                  activeColor: "#f0eddf",
                },
              ]}
              onPress={(value) => setPerro({ ...perro, petColor: value })}
              style={styles.swSelector}
            />
          </Item>

          <Form>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Descripcion"
              value={perro.petDescription}
              onChangeText={(value) =>
                setPerro({ ...perro, petDescription: value })
              }
            />
          </Form>

          <Button
            block
            info
            style={styles.btnFinal}
            onPress={() => uploadPerro()}
          >
            <Label>Cargar Perro al feed !</Label>
          </Button>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  state: { marginTop: 20, marginBottom: 5 },
  itemForm: {
    marginBottom: 15,
  },
  imagen: {
    height: 150,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    marginTop: 15,
  },
  swSelector: { width: 270, marginLeft: 20 },
  btnFinal: {
    marginTop: 20,
    elevation: 10,
  },
  map: {
    height: 150,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
  },
});