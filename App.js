import React, { Component, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ImageBackground, Text } from "react-native";
import { Root, Button, Footer, FooterTab, Icon, Header } from "native-base";
import * as Font from "expo-font";
import { SocialIcon } from "react-native-elements";
import { googleLogin, isAuthenticated, usuarioRandom } from "./helpers/auth";
import Feed from './views/feed';
import LoadingView from './views/pagCarga'
import FormMascota from './Components/form';
import curiVerde from "./assets/fondos/curi_verde_01.png";
import banner from './assets/banner.png';
import Botonera from './views/botonera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colores from './Components/colorPalette';
import { StatusBar } from 'expo-status-bar';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: true, selectedTab: "feed" };
    //AsyncStorage.removeItem('user')
  }
  async componentDidMount() {
    
    const ac = new AbortController();
    let user = await AsyncStorage.getItem("user");
    let isAuth = false;
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    if (!user) {user = await usuarioRandom()}
    else if (JSON.parse(user).google) isAuth = await isAuthenticated(user).finally(() => ac.abort());
    //if (user && JSON.parse(user).google) isAuth = await isAuthenticated(user).finally(() => ac.abort());

    this.setState({ loading: false, isAuth: isAuth });
    
  }

  async googleAuth() {
    
    let isAuth = await googleLogin();
    if (isAuth) {
      this.setState({ isAuth: isAuth });
    };
  }
  
  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "feed":
        return <Feed />;
        break;
      case "formulario":
        if (this.state.isAuth) return <FormMascota />;
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: '#EEF4D7',
            }}
          >
            <ImageBackground source={curiVerde} style={styles.image}>
              <Text style={styles.text}>LOGIN</Text>
              <SocialIcon
                title={"Inicia sesión con Google"}
                button={true}
                type="google"
                iconSize={30}
                light
                onPress={() => this.googleAuth()}
              />
            </ImageBackground>
          </View>
        );
        break;
      case "perfil":
        return <Botonera />;
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
          <StatusBar style="dark" backgroundColor='#fff'/>
          <Header
          style={{
            height: 50 ,
            backgroundColor:'white',
            borderBottomColor:colores.mild,
            borderBottomWidth:2,
            padding: 10,
            marginTop: 25
            }} >
              <ImageBackground source={banner} style={{flex:0.8, resizeMode:'cover', justifyContent:'center'}}>
              </ImageBackground>
            </Header>
            <View>
           
          </View>
          <SafeAreaView style={{ flex: 6 }}>
            {this.renderSelectedTab()}
          </SafeAreaView>
          <Footer style={styles.footer}>    
          <FooterTab style={{backgroundColor:colores.mild}}>
              <Button  style={styles.button}
                active={this.state.selectedTab === "formulario"}
                onPress={() => this.setState({ selectedTab: "formulario" })}
              >
                <Icon type="FontAwesome" name="plus"
                style={{color: (this.state.selectedTab=="formulario")?colores.main:colores.mild}}
                />
               </Button>
              <Button style={styles.button}
                active={this.state.selectedTab === "feed"}
                onPress={() => {this.setState({ selectedTab: "feed" })}}
              >
                <Icon type="FontAwesome5" name="paw"
                style={{color: (this.state.selectedTab=="feed")?colores.main:colores.mild}}/>
              </Button>
              <Button style={styles.button}
                active={this.state.selectedTab === "perfil"}
                onPress={() => this.setState({ selectedTab: "perfil" })}
              >
                <Icon type="FontAwesome" name="user"
                style={{color: (this.state.selectedTab=="perfil")?colores.main:colores.mild}}/>
                
              </Button>
            </FooterTab>
          </Footer>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingBottom: 80
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
});
