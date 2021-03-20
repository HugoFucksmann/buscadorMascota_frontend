import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  ImageBackground,
  Modal,
  Image,
  Alert,
} from "react-native";
import {
  Card,
  Icon,
  Thumbnail,
  Button,
  Right,
  Left,
  Header,
  Title,
  Body,
  CardItem,
  Label,
  Form,
  Item,
  Input,
  Textarea,
  Picker,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { editarMascota, eliminarMascota } from "../helpers/mascotaService";
import { mostrarFoto } from "../helpers/imageService";
import colores from "../Components/colorPalette";
import banner from "../assets/banner.png";
import EmptyCard from "../Components/EmptyCard";
import backImg from "../assets/fondos/user_background.png";
import fondo from "../assets/fondos/app_background.png";
import SwitchSelector from "react-native-switch-selector";



const Botonera2 = ({ mascotas, usuario, handlerMascotas }) => {
  let dataM = [];
  if (mascotas) {
    if (!Array.isArray(mascotas)) dataM.push(mascotas);
    else dataM = mascotas;
  }

  let chat = [
    {
      petPicture: "fasfasfasfasfa",
    },
    {
      petPicture: "fasfasfasfasfa",
    },
    {
      petPicture: "fasfasfasfasfa",
    },
    {
      petPicture: "fasfasfasfasfa",
    },
  ];

  return (
    <>
      <StatusBar style="auto" />
      <HeaderUser usuario={usuario} />
      <ImageBackground source={fondo} style={styles.image} resizeMode="repeat">
        <View style={{ height: "60%" }}>
          {dataM.length !== 0 ? (
            <MyPetCards
              miMascotas={mascotas}
              handlerMascotas={handlerMascotas}
            />
          ) : (
            <EmptyCard text={"no tienes mascotas perdidas"} />
          )}
        </View>

        <ScrollView style={{ padding: 10 }}>
          <View style={{borderBottomWidth: 1, borderBottomColor: colores.main, paddingBottom: 2}}>
            <Text style={{ alignSelf: "center", fontSize: 18 }}>Chats</Text>
          </View>

          {chat.map((mascota) => {
            let fotoM = mostrarFoto(mascota.petPicture);
            return (
              <Card>
                <CardItem>
                  <Thumbnail source={{ uri: fotoM }} />
                  <Right>
                    <Text>Chat del perro</Text>
                  </Right>
                </CardItem>
              </Card>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const HeaderUser = ({ usuario }) => {
  const [fotoPerfil] = useState(mostrarFoto(usuario.img));
  return (
    <View
      style={{
        height: 200,
        paddingTop: 40,
        backgroundColor: colores.main,
      }}
    >
      <ImageBackground source={backImg} style={styles.image}>
        <View style={{ flexDirection: "row-reverse", height: 20 }}>
          <Button transparent>
            <Icon
              type="EvilIcons"
              name="gear"
              style={{ fontSize: 30, color: colores.mild }}
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
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            marginTop: 10,
            color: colores.mild,
          }}
        >
          {usuario.name}
        </Text>
      </ImageBackground>
    </View>
  );
};

const MyPetCards = ({ miMascotas, handlerMascotas }) => {
  
  let data = miMascotas;
  async function handlerEliminar(mascota) {
    let result = await eliminarMascota(mascota._id);
    if (result) {
      handlerMascotas("perfil", "se elimino la mascota");
    }
  }

  const RenderItem = ({ item }) => {
    return <CardPet mascota={item} handlerEliminar={handlerEliminar} />;
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={RenderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

const CardPet = ({ mascota, handlerEliminar }) => {
  const [foto] = useState(mostrarFoto(mascota.petPicture));
  const [isModal, setIsModal] = useState(false);

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
    <>
      <Card style={styles.myPetCard}>
        <Image source={{ uri: foto }} style={styles.imagenPet} />
        <View flexDirection="row" style={styles.myPetContent}>
          <Button
            onPress={() => setIsModal(true)}
            small
            rounded
            style={{
              backgroundColor: colores.main,
              width: 100,
              marginRight: 10,
            }}
          >
            <Icon fontSize="22" type="Feather" name="edit" />
            <Text style={{ color: colores.mild }}>Editar</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModal}
        onRequestClose={() => {
          setIsModal(false);
        }}
      >
        <ModalContent mascota={mascota} />
      </Modal>
    </>
  );
};

const ModalContent = ({mascota}) => {
  const [perro, setPerro] = useState(mascota);
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
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{ marginBottom: 5, backgroundColor: colores.light, padding: 10 }}
      >
        {perro.petState === "perdido" && (
          <Item style={styles.itemForm}>
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
            style={styles.textArea}
            placeholder="Descripción"
            value={perro.petDescription}
            onChangeText={(value) =>
              setPerro({ ...perro, petDescription: value })
            }
          />
        </Form>

        <Button block style={styles.btnFinal}>
          <Label style={{ color: colores.light, fontSize: 20 }}>Editar</Label>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myPetCard: {
    height: 250,
    width: Dimensions.get("window").width - 40,
    marginLeft: 20,
    borderRadius: 10,
    borderColor: colores.main,
    marginTop: 30,
    borderWidth: 2,
    borderColor: colores.main,
  },
  btnFinal: {
    marginTop: 20,
    elevation: 10,
    backgroundColor: colores.mainFill,
    borderRadius: 5,
  },
  imagenPet: {
    width: null,
    overflow: "hidden",
    borderWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "80%",
  },
  myPetContent: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 100,
  },
  titles: {
    marginTop: 5,
    color: colores.light,
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
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  textArea: {
    backgroundColor: "#fff",
    borderColor: "transparent",
    borderRadius: 5,
  },
  swSelector: { width: 270, marginLeft: 20, padding: 5 },
  itemForm: {
    marginBottom: 15,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderColor: colores.mild,
    padding: 0,
    paddingLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});

export default Botonera2;
