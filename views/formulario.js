import React, { useState, useEffect } from "react";
import { View,  Image,  Platform,  Text,  ScrollView,  StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import {  Picker,  Item,  Label,  Input,  Textarea,  Form,  Left,  Card,  Button,  H3,  Right, Body, CardItem } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwitchSelector from "react-native-switch-selector";
import noImagen from "../assets/default_plus.png";
import { myLocation } from "../helpers/getLocation";
import { crearMascota, actualizarArchivo } from "../helpers/mascotaService";
import LoadingView from "../views/pagCarga";
import colores from "../Components/colorPalette";
import { Dimensions } from "react-native";
import markerPet from '../assets/iconos/marker_paw.png'

const lightBackColor = "rgba(236,242,213,255)";
const strongMainColor = "rgba(78,120,81,255)";

const FormMascota = ({ user, handlerMascotas }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [ubi] = useState({
    ...user.location,
    latitudeDelta: 0.0052,
    longitudeDelta: 0.0051,
  });
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

  useEffect(() => {
    (async () => {

      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") alert("ups! :( , se necesita el permiso para que funcione ");
      }
      
      setLoading(false);
    })();
  }, []);
  
  async function uploadPerro() {
    const token = await AsyncStorage.getItem("token");
    let perroId = await crearMascota(perro, token, user.notification);

    if (!perroId) return alert("error al crear perro");

    await actualizarArchivo(file, perroId, token)
      .then((res) => {       
        if(!res) alert("Error al cargar la imagen del perro!");   
        handlerMascotas();  
      })
      .catch((e) => {
        console.log(e);
        alert("Error al cargar la imagen del perro!");
      });

      
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      setFile(result);
    }
  };

  const switchOptions = [
    {
      label: "Blanco",
      value: "blanco",
      activeColor: "#f5f5f5",
    },
    {
      label: "Negro",
      value: "negro",
      activeColor: "black",
    },
    { label: "Marrón", value: "marron", activeColor: "#6e2b0c" },
    {
      label: "Gris",
      value: "gris",
      activeColor: "grey",
    },
    { label: "Canela", value: "canela", activeColor: "#f0eddf" },
  ];

  if (isLoading) return <LoadingView />;


 

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <SwitchSelector
          style={styles.state}
          initial={0}
          onPress={(value) => setPerro({ ...perro, petState: value })}
          textColor={colores.mainFill}
          selectedColor={colores.light}
          buttonColor={colores.mainFill}
          hasPadding
          fontSize={15}
          borderRadius={20}
          borderWidth={0}
          options={[
            { label: "Se perdió mi mascota", value: "perdido" },
            { label: "Encontré animal perdido", value: "encontrado" },
          ]}
        />

        <Button
          block
          bordered={false}
          onPress={pickImage}
          info
          style={styles.buttonUnderImage}
        >
          {/* <Icon type="AntDesign" name="downcircleo" />  */}
          {image ? (
            <Image source={{ uri: image }} style={styles.imagen} />
          ) : (
            <Image source={noImagen} style={styles.imagen} />
          )}
        </Button>
        <Card style={styles.map}>
          <MapView
            style={styles.map}
            initialRegion={ubi}
            onPress={(e) =>
              setPerro({ ...perro, location: e.nativeEvent.coordinate })
            }
          >
            <Marker pinColor="#1c241b" coordinate={perro.location}>
              <Text style={{ height: 40 }}>
                <Image
                  source={markerPet}
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: "contain",
                  }}
                />
              </Text>
            </Marker>
          </MapView>
          <Card
            style={{
              alignSelf: "center",
              position: "relative",
              bottom: 50,
              borderRadius: 5,
              padding: 5,
            }}
          >
            <Text style={{ fontSize: 13, color: colores.main }}>
              Indica dónde se perdió (triple click)
            </Text>
          </Card>
        </Card>
        {perro.petState === "perdido" && (
          <Item style={[styles.itemForm, { borderBottomWidth: 2 }]}>
            <Input
              value={perro.petName}
              onChangeText={(nombre) => setPerro({ ...perro, petName: nombre })}
              placeholder="Nombre mascota"
            />
          </Item>
        )}
        
          <Item picker style={styles.itemForm}>
            <Left>
              <Text>Sexo:</Text>
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
              <Text>Tamaño:</Text>
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
          <Left>
            <Text>Color:</Text>
          </Left>
          <Right>
            <SwitchSelector
              initial={2}
              hasPadding
              borderWidth={0}
              options={switchOptions}
              onPress={(value) => setPerro({ ...perro, petColor: value })}
              style={styles.swSelector}
            />
          </Right>
        </Item>

          <Form>
            <Textarea
              rowSpan={3}
              bordered
              style={{ borderColor: colores.mild, borderWidth: 10  }}
              placeholder="Descripción"
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
          <Label style={{ color: colores.light, fontSize: 20 }}>CARGAR</Label>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  state: { marginTop: 20, marginBottom: 5 },
  itemForm: {
    marginBottom: 15,
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderColor: colores.mild,
    padding: 5,
  },
  imagen: {
    height: 200,
    width: Dimensions.get('window').width-40,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    marginTop: 15,
  },
  swSelector: { width: 270, marginLeft: 20 },
  btnFinal: {
    marginTop: 20,
    elevation: 10,
    backgroundColor: colores.mainFill,
    borderRadius: 5,
  },
  map: {
    height: 200,
    width: Dimensions.get('window').width-40,
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonUnderImage: {
    height: 200,
    width: Dimensions.get('window').width-40,
    shadowRadius: 0,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 0,
    marginBottom: 15,
    marginTop: 15,
    alignSelf: 'center',
  }
});

export default FormMascota;
