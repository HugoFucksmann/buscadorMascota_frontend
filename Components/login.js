import React, { } from "react";
import {  View,  StyleSheet,  ImageBackground,  Image } from "react-native";
import { SocialIcon } from "react-native-elements";

import loginPhrase from "../assets/login_phrase.png";
import loginBackground from "../assets/fondos/log_in_curi.png";

const Login = ({ handlerPress }) => {

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <ImageBackground source={loginBackground} style={styles.image}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            source={loginPhrase}
            style={{ resizeMode: "contain", width: 170 }}
          ></Image>
        </View>
        <SocialIcon
          title={"Inicia sesión con Google"}
          button={true}
          type="google"
          iconSize={30}
          light
          onPress={() => handlerPress()}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingBottom: 80,
  },
});


export default Login;