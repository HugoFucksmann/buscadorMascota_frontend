import { useNavigation } from "@react-navigation/core";
import { Button, Card, Item, Left, Picker, Right, Textarea, Icon, Label, Input } from "native-base";
import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import { editarMascota, eliminarMascota } from "../helpers/mascotaService";
import { Alert, Dimensions, Modal, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { MascotaContext } from "../context/mascotasContext";
import EmptyCard from "./EmptyCard";
import SwitchSelector from "react-native-switch-selector";
import colores from "../Components/colorPalette";

const MyPetCards = () => {
  const { misMascotas, handlerMascota } = useContext(MascotaContext);

  const RenderItem = ({ item }) => {
    return <CardPet mascota={item} handlerMascota={handlerMascota} />;
  };

  return (
    <FlatList
      ListEmptyComponent={<EmptyCard text="no tienes mascotas perdidas" />}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={misMascotas}
      renderItem={RenderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

const CardPet = ({ mascota, handlerMascota }) => {
  const [isModal, setIsModal] = useState(false);
  const navigation = useNavigation();
  const createTwoButtonAlert = () =>
    Alert.alert("Encontraste tu mascota ?", "si aceptas se eliminara el registro de tu mascota", [
      {
        text: "todavia no",
        style: "cancel",
      },
      {
        text: "si, ya la recupere",
        onPress: () => handlerEliminar(),
      },
    ]);

  async function handlerEliminar() {
    let result = await eliminarMascota(mascota._id);
    if (result) handlerMascota("eliminar", mascota);
  }

  return (
    <>
      <Card key={mascota._id} style={styles.myPetCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate("infoM", mascota)}
          style={styles.imageMascotaCardTouch}
        >
          <Image style={styles.imageMascotaCard} source={{ uri: mascota.petPicture }} />
        </TouchableOpacity>
        <View style={styles.cardTextView}>
          <Text style={styles.mascotaCardText}>Nombre: {mascota.petName.slice(0, 15)}</Text>
          <Text style={styles.mascotaCardText}>Sexo: {mascota.petSex}</Text>
          <Text style={styles.mascotaCardText}>Color: {mascota.petColor}</Text>
          <Text style={styles.mascotaCardText}>Tamaño: {mascota.petSize}</Text>
          <Text style={styles.mascotaCardText}>desc: {mascota.petDescription.slice(0, 18)}...</Text>

          <View flexDirection="row">
            <Button
              rounded
              small
              style={styles.botonChat}
              onPress={() => navigation.navigate("chat", mascota)}
            >
              <Icon type="Entypo" name="chat" style={styles.colorIcon} />
            </Button>
            <Button onPress={() => setIsModal(true)} small rounded style={styles.botonEdit}>
              <Icon style={styles.colorIcon} type="Feather" name="edit" />
            </Button>
            <Button
              onPress={() => createTwoButtonAlert()}
              small
              rounded
              style={styles.botonEliminar}
            >
              <Icon style={styles.colorIcon} type="Feather" name="check-circle" />
            </Button>
          </View>
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
        <ModalContent mascota={mascota} handlerMascota={handlerMascota} />
      </Modal>
    </>
  );
};

const ModalContent = ({ mascota, handlerMascota }) => {
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

  async function handlerEditar() {
    let result = await editarMascota(perro);

    if (result) return handlerMascota("editar", result);
  }

  return (
    <View style={styles.modalFondoAtenuado}>
      <View style={styles.modalContent}>
        <Card style={styles.itemForm}>
          <Item picker style={{ paddingLeft: 10 }}>
            <Input
              style={styles.letraApp}
              value={perro.petName}
              onChangeText={(nombre) => setPerro({ ...perro, petName: nombre })}
              placeholder="Nombre mascota"
              style={styles.letraApp}
            />
          </Item>
        </Card>

        <Card style={styles.itemForm}>
          <Item picker style={{ paddingLeft: 10 }}>
            <Left>
              <Text style={styles.letraApp}>Sexo:</Text>
            </Left>
            <Picker
              mode="dropdown"
              selectedValue={perro.petSex}
              onValueChange={(value) => setPerro({ ...perro, petSex: value })}
              itemTextStyle={styles.letraApp}
            >
              <Picker.Item label="macho" value="macho" />
              <Picker.Item label="hembra" value="hembra" />
            </Picker>
          </Item>
        </Card>

        <Card style={styles.itemForm}>
          <Item picker style={{ paddingLeft: 10 }}>
            <Left>
              <Text style={styles.letraApp}>Tamaño:</Text>
            </Left>

            <Picker
              mode="dropdown"
              selectedValue={perro.petSize}
              itemTextStyle={styles.letraApp}
              onValueChange={(value) => setPerro({ ...perro, petSize: value })}
            >
              <Picker.Item label="chico" value="chico" />
              <Picker.Item label="mediano" value="mediano" />
              <Picker.Item label="grande" value="grande" />
            </Picker>
          </Item>
        </Card>

        <Card style={styles.itemForm}>
          <Item picker style={{ paddingLeft: 10 }}>
            <Left>
              <Text style={{ fontFamily: "NunitoLight" }}>Color:</Text>
            </Left>
            <Right>
              <SwitchSelector
                textStyle={{ fontFamily: "NunitoLight" }}
                selectedTextStyle={{ fontFamily: "NunitoLight" }}
                initial={2}
                hasPadding
                borderWidth={0}
                options={switchOptions}
                onPress={(value) => setPerro({ ...perro, petColor: value })}
                style={styles.swSelector}
              />
            </Right>
          </Item>
        </Card>
        <Card style={styles.itemForm}>
          <Textarea
            rowSpan={3}
            bordered
            style={styles.textArea}
            placeholder="Descripción"
            value={perro.petDescription}
            onChangeText={(value) => setPerro({ ...perro, petDescription: value })}
          />
        </Card>

        <Button block style={styles.btnFinal} onPress={() => handlerEditar()}>
          <Label style={styles.btnFinalText}>Editar</Label>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  letraApp: { fontFamily: "NunitoLight" },
  colorIcon: { color: colores.main },
  swSelector: { width: 270, marginLeft: 20, padding: 5 },
  myPetCard: {
    height: 150,
    width: Dimensions.get("window").width - 50,
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 30,
    flexDirection: "row",
    borderRightWidth: 6,
    borderColor: colores.main,
  },

  botonEliminar: {
    backgroundColor: "#fff",
    elevation: 4,
    marginRight: 10,
    width: 51,
    height: 51,
    marginTop: 4,
  },
  imageMascotaCard: { borderRadius: 25, height: "100%" },
  imageMascotaCardTouch: {
    borderRadius: 25,
    height: "100%",
    width: 160,
    marginLeft: -10,
  },

  mascotaCardText: {
    color: "black",
    lineHeight: 22,
    fontFamily: "NunitoLight",
  },
  botonEdit: {
    backgroundColor: "#fff",
    elevation: 4,
    marginRight: 10,
    width: 51,
    height: 51,
    marginTop: 4,
  },
  modalContent: {
    backgroundColor: colores.light,
    padding: 15,
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  cardTextView: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  botonChat: {
    backgroundColor: "#fff",
    elevation: 4,
    marginRight: 10,
    width: 51,
    height: 51,
    marginTop: 4,
  },
  modalFondoAtenuado: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  itemForm: {
    marginBottom: 15,
    borderBottomColor: colores.main,
    borderBottomWidth: 3,
    borderRadius: 5,
  },
  btnFinal: {
    marginTop: 20,
    elevation: 10,
    backgroundColor: colores.main,
    borderRadius: 5,
  },
  textArea: {
    backgroundColor: "#fff",
    borderColor: "transparent",
    borderRadius: 5,
    fontFamily: "NunitoLight",
  },
  btnFinalText: {
    color: colores.light,
    fontSize: 20,
    fontFamily: "NunitoLight",
  },
});

export default MyPetCards;
