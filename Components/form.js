import React, { useState, useEffect } from 'react'
import { Image, Platform, Text, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Picker,
  Item,
  Label,
  Input,
  Textarea,
  Form,
  Left,
  Right,
  Card,
  Button,
  Icon,
  Radio
} from "native-base";
import SwitchSelector from "react-native-switch-selector";
import noImagen from '../assets/default-image.png'
import colorBW from '../assets/iconos/colorBW.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormMascota = () => {
  const [token] = useState(AsyncStorage.getItem('token'))
  const [image, setImage] = useState(null);
  const [perro, setPerro] = useState({
    petName: "",
    petPicture: "",
    petSize: "",
    petSex: "",
    petDescription: "",
    petColor: "",
    petState: "",
    recovered: false,
    locationFound: {
      longitude: "",
      latitude: "",
    },
    locationLost: {
      longitude: "",
      latitude: "",
    },
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
    })();
  }, []);
    console.log(token['_W']);
  async function uploadPerro(){
    await fetch("http://192.168.0.102:3011/api/mascotas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token['_W']
      },
      body: JSON.stringify(perro)
    })
    .then( res => res.json())
    .then((res) => {
      console.log(res);
      alert("perro cargado con exito")}
    )
    .catch((e) => console.log(e));
  };
  console.log(perro);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
     /*  let formData = new FormData();
      formData.append("imgMascota", result); */
    }
     
  };
 
    return (
      <ScrollView>
        <Card style={{ padding: 15 }}>
          <SwitchSelector
            initial={0}
            onPress={(value) => setPerro({ ...perro, petState: value })}
            textColor={"#ff8254"} //'#7a44cf'
            selectedColor={"black"}
            buttonColor={"#7f78ff"}
            hasPadding
            options={[
              { label: "Se perdio mi perro", value: "perdido" },
              { label: "Encontre un perro perdido", value: "encontrado" },
            ]}
            style={{ marginTop: 20, marginBottom: 10 }}
          />

          <Item floatingLabel style={{ marginBottom: 15 }}>
            <Label>nombre del perro</Label>
            <Input
              value={perro.petName}
              onChangeText={(nombre) => setPerro({ ...perro, petName: nombre })}
            />
          </Item>
          <Button block bordered info onPress={pickImage}>
            <Icon type="AntDesign" name="downcircleo" />
            <Text>cargar imagen del perro</Text>
          </Button>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                height: 150,
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 25,
                marginTop: 15,
              }}
            />
          ) : (
            <Image
              source={noImagen}
              style={{
                height: 150,
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 25,
                marginTop: 15,
              }}
            />
          )}
          <Item picker style={{ marginBottom: 15 }}>
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

          <Item picker style={{ marginBottom: 15 }}>
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

          <Item picker style={{ marginBottom: 15 }}>
            <Text>Color de pelo</Text>
            <SwitchSelector
              initial={0}
              textColor={"#ff8254"} //'#7a44cf'
              selectedColor={"black"}
              buttonColor={"#7f78ff"}
              hasPadding
              options={[
                { label: "red", value: "red" },
                { label: "blue", value: "blue" },
                { label: "blue", value: "blue" },
                { label: "blue", value: "blue" },
                { label: "blue", value: "blue" },
                { label: "blue", value: "blue" },
                { label: "blue", value: "blue" },
                { label: "blue", value: "blue" },
              ]}
            />
          </Item>

          <Form>
            <Textarea rowSpan={3} bordered placeholder="Descripcion" />
          </Form>

          <Button
            block
            info
            style={{ marginTop: 20 }}
            onPress={() => uploadPerro()}
          >
            <Label>Cargar Perro al feed !</Label>
          </Button>
        </Card>
      </ScrollView>
    );
}




export default FormMascota;