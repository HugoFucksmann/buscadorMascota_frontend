import "react-native-gesture-handler";
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, LogBox, Image } from "react-native";
import { Root, Button, Footer, FooterTab, Icon, Header } from "native-base";
import * as Font from "expo-font";

import { googleLogin, isAuthenticated, usuarioRandom, actualizarLocation } from "./helpers/auth";
import Feed from './views/feed';
import LoadingView from './views/pagCarga'
import FormMascota from './views/formulario';
import Login from './Components/login'
import { getMascotas, getMyPets } from "./helpers/mascotaService";
import banner from './assets/banner.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colores from './Components/colorPalette';
import { StatusBar } from 'expo-status-bar';
import Botonera2 from "./views/botonera2";
import Screens from "./Components/mapFeed";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, selectedTab: "feed" };
  }

  async componentDidMount() {
    await AsyncStorage.removeItem('user');
    let user = await AsyncStorage.getItem("user");
    let isAuth = false;

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });

    if (!user) user = await usuarioRandom();
    else user = JSON.parse(user);

    if (user.google) isAuth = await isAuthenticated(user);

    user = await actualizarLocation(user);

    let mascotas = await getMascotas(user);
    
    this.setState({
      loading: false,
      isAuth: isAuth,
      user: user,
      mascotas: mascotas,
    });
  }

  async googleAuth() {
    let user = await googleLogin(this.state.user);
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(usuario));
      this.setState({ isAuth: true, user: user });
    }
  }

  renderTabs() {
    return (
      <Footer style={styles.footer}>
        <FooterTab style={{ backgroundColor: colores.mild }}>
          <Button
            style={styles.button}
            active={this.state.selectedTab === "formulario"}
            onPress={() => this.setState({ selectedTab: "formulario" })}
          >
            <Icon
              type="FontAwesome"
              name="plus"
              style={{
                color:
                  this.state.selectedTab == "formulario"
                    ? colores.main
                    : colores.mild,
              }}
            />
          </Button>
          <Button
            style={styles.button}
            active={this.state.selectedTab === "feed"}
            onPress={() => {
              this.setState({ selectedTab: "feed" });
            }}
          >
            <Icon
              type="FontAwesome5"
              name="paw"
              style={{
                color:
                  this.state.selectedTab == "feed"
                    ? colores.main
                    : colores.mild,
              }}
            />
          </Button>
          <Button
            style={styles.button}
            active={this.state.selectedTab === "perfil"}
            onPress={() => this.setState({ selectedTab: "perfil" })}
          >
            <Icon
              type="FontAwesome"
              name="user"
              style={{
                color:
                  this.state.selectedTab == "perfil"
                    ? colores.main
                    : colores.mild,
              }}
            />
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  async handlerMascotas() {
   
    let mascotas = await getMascotas(this.state.user);
    this.setState({ mascotas: mascotas, selectedTab: "feed" });
    alert('mascota cargada con exito')
  }

  renderHeader(){
    return (
      <Header style={styles.header}>
        <ImageBackground source={banner} style={styles.headerBackground} />
        <StatusBar style="auto" backgroundColor="#ffffff" />
      </Header>
    );
  }

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "feed":
        return (
          <>
           {this.renderHeader()}
            <Feed mascotas={this.state.mascotas} usuario={this.state.user} />
          </>
        );
        break;

      case "formulario":
        if (!this.state.isAuth) return <Login handlerPress={() => this.googleAuth()} />;
        return (
          <>
            {this.renderHeader()}
            <FormMascota
              user={this.state.user}
              handlerMascotas={() => this.handlerMascotas()}
            />
          </>
        );
        break;

      case "perfil":
        return <Botonera2
            mascotas={getMyPets(this.state.mascotas, this.state.user._id)}
            usuario={this.state.user}
            handlerMascotas={() => this.handlerMascotas()}
          /> 
      
        break;

      default:
    }
  }

  render() {
    LogBox.ignoreLogs(["Remote debugger"]);
    LogBox.ignoreLogs(["Setting a timer"]);
    if (this.state.loading) {
      return <LoadingView />;
    } else {
      return (
        <Root>
          {/* <Header style={styles.header}>
            <ImageBackground source={banner} style={styles.headerBackground} />
            <StatusBar style="auto" backgroundColor="#ffffff" />
          </Header> */}
          <SafeAreaView style={{ flex: 6 }}>
            {this.renderSelectedTab()}
          </SafeAreaView>
          {this.renderTabs()}
        </Root>
      );
    }
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#00000030",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 0,
  },
  footer: {
    backgroundColor: null,
    flexDirection: "row",
    color: colores.main,
    borderTopWidth: 3,
    borderTopColor: colores.mild,
  },
  header: {
    height: 50,
    backgroundColor: "white",
    borderBottomColor: colores.mild,
    borderBottomWidth: 2,
    paddingTop: 11,
    paddingBottom: 11,
    marginTop: 25
  },
  headerBackground: {
    flex: 0.8,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
