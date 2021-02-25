import React, { } from 'react'
import {  ActivityIndicator,  ImageBackground,  View,  Text, StyleSheet, } from "react-native";

import perroNegro from "../assets/fondos/intro.png";
import colores from '../Components/colorPalette';

export default function LoadingView(){

    return (
<View style={styles.container}>
    <ImageBackground source={perroNegro} style={styles.image}>
      <Text />
      <ActivityIndicator style={styles.activity} size="large" color={colores.main} />
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
  activity: {
    paddingBottom: 500
  }
});