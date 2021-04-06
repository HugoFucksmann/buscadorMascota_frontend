import { Button, Icon, Spinner } from 'native-base';
import React, { useRef } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import perroNegro from "../assets/fondos/introF.png";
import colores from '../Components/colorPalette';

export default function LoadingView(){
    return (
      <View style={styles.container}>
        <ImageBackground source={perroNegro} style={styles.image}>
          <ActivityIndicator  size="large" color={colores.main} />
       
        </ImageBackground>
      </View>
    );
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
});