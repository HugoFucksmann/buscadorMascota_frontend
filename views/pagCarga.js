import React, { PureComponent } from 'react'
import {  ActivityIndicator,  ImageBackground,  View,  Text, StyleSheet, } from "react-native";

import perroNegro from "../assets/fondos/perro_negro.jpg";

export default function LoadingView(){

    return (
<View style={styles.container}>
    <ImageBackground source={perroNegro} style={styles.image}>
      <Text style={styles.text}>BusCan</Text>
      <Text />
      <ActivityIndicator size="large" color="#fff" />
    </ImageBackground>
  </View>
    )
  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#ffffff20",
  },
});