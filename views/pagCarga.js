import { Button, Icon, Spinner } from 'native-base';
import React, { useEffect, useRef } from "react";
import {
  ImageBackground,
  View,
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
        
          <FadeInView
           
          />
        </ImageBackground>
      </View>
    );
} 

const FadeInView = (props) => {

  const fadeAnim = useRef(new Animated.Value(0.6)).current; // Initial value for opacity: 0
  const scaleAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1100,
        useNativeDriver: true,
      }),
      { iterations: 300 }
    ).start();
    

    Animated.loop(
      Animated.timing(scaleAnim, {
        toValue: 14,
        duration: 1100,
        useNativeDriver: true,
      }),
      { iterations: 300 }
    ).start();

  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
        borderRadius: 8,
        width: 16,
        height: 16,
        backgroundColor: "green",
        position: 'absolute',
        top:  Dimensions.get('window').height/3-10,
        left: Dimensions.get('window').width/2-10
      }}
    ></Animated.View>
  );
};

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