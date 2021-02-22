import "react-native-gesture-handler";
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, Text, Image } from "react-native";
import { Root, Button, Footer, FooterTab, Icon, Header } from "native-base";
import * as Font from "expo-font";

import { googleLogin, isAuthenticated, usuarioRandom } from "./helpers/auth";
import Feed from './views/feed';
import LoadingView from './views/pagCarga'
import FormMascota from './views/formulario';
import Login from './Components/login'
import {getMascotas} from './helpers/mascotaService'
import banner from './assets/banner.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colores from './Components/colorPalette';
import { StatusBar } from 'expo-status-bar';
import Botonera2 from "./views/botonera2";

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: true, selectedTab: "feed" };
  }

  async componentDidMount() {
  
    let user = await AsyncStorage.getItem("user");
    let isAuth = false;
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });

    if (!user) await usuarioRandom();
    else if (JSON.parse(user).google)
    isAuth = await isAuthenticated(user);

    let mascotas = await getMascotas()
    
    this.setState({
      loading: false,
      isAuth: isAuth,
      user: JSON.parse(user),
      mascotas: mascotas,
    });
  }

  async googleAuth() {
    let isAuth = await googleLogin();
    if (isAuth) {
      let user = await AsyncStorage.getItem("user");
      this.setState({ isAuth: isAuth, user: user });
    }
  }

  renderTabs(){
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
                this.state.selectedTab == "feed" ? colores.main : colores.mild,
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
    )
  }

  async handlerMascotas(){
    let mascotas = await getMascotas()
    this.setState({ mascotas: mascotas })
    
  }

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "feed":
        return <Feed mascotas={this.state.mascotas} usuario={this.state.user} />;
        break;

      case "formulario":
        
        if (!this.state.isAuth) return <Login handlerPress={() => this.googleAuth()} />;
        return <FormMascota notification={this.state.user.notification} handlerMascotas={() => handlerMascotas()} />;
        break;

      case "perfil":
        return <Botonera2 mascotas={this.state.mascotas} usuario={this.state.user} />;
        break;

      default:
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingView />;
    } else {
      return (
            <Root>
              <StatusBar style="dark" backgroundColor="#fff" />
              <Header style={styles.header}>
                <ImageBackground
                  source={banner}
                  style={styles.headerBackground}
                ></ImageBackground>
              </Header>

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
    padding: 10,
    marginTop: 25,
  },
  headerBackground: {
    flex: 0.8,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
