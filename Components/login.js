import React, { useContext } from "react";
import { View, StyleSheet, ImageBackground, Image, Text, Alert } from "react-native";
import google from "../assets/iconos/google.png";
import loginBackground from "../assets/fondos/log_in_curi.png";
import { Button } from "native-base";
import { actualizarLocation2, googleLogin } from "../helpers/auth";
import { MascotaContext } from "../context/mascotasContext";
import colorPalette from "./colorPalette";

const Login = () => {
  const { usuario, handlerAuth } = useContext(MascotaContext);

  async function googleAuth(usuario) {
    let user = await googleLogin(usuario);

    if (user) {
      user = await actualizarLocation2(user);
      handlerAuth(true, user);
    } else {
      return Alert.alert("Error al intentar loguearse");
    }
  }

  return (
    <ImageBackground source={loginBackground} style={styles.BackgroundImage}>
      <View style={styles.viewPrincipal}>
        <Text style={styles.txtLogin}>LOGIN</Text>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Button large iconLeft style={styles.googleBoton} onPress={() => googleAuth(usuario)}>
          <Image source={google} style={styles.googleImg} />
          <Text style={styles.googleText}>Inicia sesion con Google</Text>
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingBottom: 60,
  },
  viewPrincipal: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  googleImg: {
    height: 28,
    width: 28,
    marginRight: 20,
    backgroundColor: "#fff",
  },
  loginImg: { resizeMode: "contain", width: 170 },
  googleText: { fontWeight: "bold", color: "grey" },
  googleBoton: { padding: 25, backgroundColor: "#fff" },
  txtLogin: {
    color: colorPalette.mild,
    fontSize: 33,
    fontFamily: "NunitoLight",
    fontWeight: "bold",
    letterSpacing: 8,
  },
});

export default Login;
