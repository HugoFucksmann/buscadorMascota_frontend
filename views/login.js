import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SocialIcon } from "react-native-elements";

import Auth from "../helpers/auth";
import perroGris from '../assets/fondos/log_in_curi.png';

class Login extends Component{

  constructor(props){
    super(props)
  }
  
  async googleAuth(){
    let isAuth = await Auth.googleLogin();
    this.setState({isAuth: isAuth})
    console.log(this.state);
  }

  render(){

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "blue",
        }}
      >
        <ImageBackground source={perroGris} style={styles.image}>
          <Text style={styles.text}>LOGIN</Text>
          <SocialIcon
            title={"Inicia sesion con Google"}
            button={true}
            type="google"
            iconSize={30}
            light
            onPress={() => this.googleAuth()}
          />
        </ImageBackground>
      </View>
    );
  }
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

export default Login;

