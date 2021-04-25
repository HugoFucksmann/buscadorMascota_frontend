import React, { useRef } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Animated,

} from "react-native";
import perroNegro from "../assets/fondos/introF.png";


export default function LoadingView() {

/*   const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, [fadeAnim]);
 */
  return (
    <View style={styles.container}>
      <ImageBackground source={perroNegro} style={styles.image}>
       
        <FadeInView
          style={{ width: 250, height: 50, backgroundColor: "blue" }}
        >
          <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            Fading in
          </Text>
        </FadeInView>
      </ImageBackground>
    </View>
  );
}

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0.4)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
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
