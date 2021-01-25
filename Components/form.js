import React, { useState, useEffect } from 'react'
import { Image, Platform, Text, ScrollView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import {  Picker,  Item,  Label,  Input,  Textarea,  Form,  Left,  Card,  Button,  Icon,  H3 } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from "react-native-switch-selector";

import noImagen from '../assets/default-image.png'

import {myLocation} from '../helpers/getLocation'
import {crearMascota, actualizarArchivo} from '../helpers/mascotaService';
import LoadingView from '../views/pagCarga';

const FormMascota = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileee, setUFILE] = useState(null);
  const [ubi, setUbi] = useState({
    latitude: -31.6093586,
    longitude: -60.6991563,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
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
    }
  });
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("ups! :( , se necesita el permiso para que funcione ");
        }
      }
      setUbi(await myLocation());
      setLoading(false);
    })();
    
  },[]);
  
  async function uploadPerro(){
    const token = await AsyncStorage.getItem("token");
  
    let perroId = await crearMascota(perro, token, file)
    
    if(!perro) return alert('error al crear perro')
    
    await actualizarArchivo(file, perroId, token)
      .then((res) => alert('Listo! Notificando a los mas cercanos'))
      .catch((e) => console.log(e));

  };
  
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
      setUFILE({ uri: localUri, name: filename, type });
      setFile(result);
    }
     
  };

if(isLoading) return <LoadingView />;
return (
  <ScrollView>
    <Card style={{ padding: 20 }}>
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
            onChangeText={(nombre) => setPerro({ ...perro, petName: nombre })}
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
      <H3 style={{ marginLeft: "auto", marginRight: "auto", fontSize: 16 }}>
        Selecciona donde se perdio
      </H3>

      <MapView
        style={styles.map}
        initialRegion={ubi}
        onPress={(e) => setPerro({...perro, location: e.nativeEvent.coordinate } )}
      >
        <Marker coordinate={perro.location} />
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
            { label: "Marron", value: "marron", activeColor: "#6e2b0c" },
            {
              label: "Gris",
              value: "gris",
              activeColor: "grey",
            },
            { label: "Canela", value: "canela", activeColor: "#f0eddf" },
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

      <Button block info style={styles.btnFinal} onPress={() => uploadPerro()}>
        <Label>Cargar Perro al feed !</Label>
      </Button>
    </Card>
  </ScrollView>
);
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
    marginBottom: 15
  },
});



export default FormMascota;