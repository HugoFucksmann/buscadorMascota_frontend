import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, ImageBackground } from "react-native";
import { Header, Label, Left, Right, Title, Button, Icon, Content } from "native-base";
import { SocialIcon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Auth from "../helpers/auth";
import perroGris from '../assets/fondos/perro_gris.jpg'

function Login(){
  const [bool,setModal] = useState(true);

  return (
    <View>
      <Button onPress={() => setModal(true)}>
        <Text>Modalll</Text>
      </Button>
      <Modal
        animationType="slide"
        transparent={false}
        visible={bool}
        style={styles.centeredView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "blue",
          }}
        >
          <ImageBackground source={perroGris} style={styles.image}>
            
            <Text
              style={styles.text}
            >
              LOGIN
            </Text>
            <SocialIcon
              title={"Inicia sesion con Google"}
              button={true}
              type="google"
              iconSize={30}
              light
              onPress={() => Auth.googleLogin()}
            />
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#00000030",
  },
});

/* import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, ImageBackground } from "react-native";
import { Header, Label, Left, Right, Title, Button, Icon, Content } from "native-base";
import { SocialIcon } from "react-native-elements";
import googleLogin from "../helpers/auth";

import perroGris from '../assets/fondos/perro_gris.jpg'

function Login(){
  const [bool,setModal] = useState(false);

  return (
    <View>
      <Button onPress={() => setModal(true)}>
        <Text>Modalll</Text>
      </Button>
      <Modal
        animationType="slide"
        transparent={false}
        visible={bool}
        style={styles.centeredView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
          <ImageBackground source={perroGris} style={styles.image}>
            <Button onPress={() => setModal(false)}>
              <Text>Cerrar modal</Text>
            </Button>
            <Text style={styles.text}>
              LOGIN
            </Text>
            <SocialIcon
              title={"Inicia sesion con Google"}
              button={true}
              type="google"
              iconSize={30}
              light
              onPress={() => googleLogin().then(setModal(false))}
            />
          </ImageBackground>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#00000070",
  },
});



export default Login; */

export default Login;