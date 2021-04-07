import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View 
      style={{
        ...props.style,
        opacity: fadeAnim, 
      }}
      needsOffscreenAlphaCompositing
    >
      {props.children}
    </Animated.View>
  );
};
