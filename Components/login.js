import React from "react";
import {  View,  StyleSheet,  ImageBackground,  Image, Text } from "react-native";
import google from '../assets/iconos/google.png'
import loginPhrase from "../assets/login_phrase.png";
import loginBackground from "../assets/fondos/log_in_curi.png";
import { Button } from "native-base";

const Login = ({ handlerPress }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <ImageBackground source={loginBackground} style={styles.BackgroundImage}>
        <View style={styles.viewPrincipal}>
          <Image
            source={loginPhrase}
            style={{ resizeMode: "contain", width: 170 }}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Button
            large
            iconLeft
            style={{ padding: 25, backgroundColor: "#fff" }}
            onPress={() => handlerPress()}
          >
            <Image source={google} style={styles.googleImg} />
            <Text style={{ fontWeight: "bold", color: "grey" }}>
              Inicia sesion con Google
            </Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingBottom: 80,
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
});


export default Login;