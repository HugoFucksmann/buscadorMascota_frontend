import React, { Component } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Root, Button, Content, Footer, FooterTab, Icon  } from 'native-base';
import * as Font from "expo-font";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Auth from './helpers/auth'
import NavBar from './sharedComp/navBar'
import Feed from './views/feed'
import Login from './views/login'
import Formulario from './views/Formularios';
import FormMascota from './Components/form';

import perroNegro from './assets/fondos/perro_negro.jpg'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, selectedTab: "feed", };
    
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }
  
  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "feed":
        return <Feed />;
        break;
      case "formulario":
       return <FormMascota />;
        break;
      case "perfil":
        return <Login />;
        break;
      default:
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ImageBackground source={perroNegro} style={styles.image}>
            <Text style={styles.text}>BusCan</Text>
            <Text />
            <ActivityIndicator size="large" color="#fff" />
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <Root>
          <SafeAreaView style={{ flex: 6 }}>
            {this.renderSelectedTab()}
          </SafeAreaView>
          <Footer>
            <FooterTab>
              <Button
                active={this.state.selectedTab === "formulario"}
                onPress={() => this.setState({ selectedTab: "formulario" })}
              >
                <Icon type="AntDesign" name="form" />
              </Button>
              <Button
                active={this.state.selectedTab === "feed"}
                onPress={() => this.setState({ selectedTab: "feed" })}
              >
                <Icon type="FontAwesome5" name="dog" />
              </Button>
              <Button
                active={this.state.selectedTab === "perfil"}
                onPress={() => this.setState({ selectedTab: "perfil" })}
              >
                <Icon type="FontAwesome" name="angellist" />
              </Button>
            </FooterTab>
          </Footer>
        </Root>
      );
    }
  }
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

/*   async function myLocation() {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("acceso denegado a localizacion");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
    } catch (e) {
      console.log(e);
    }
  } */