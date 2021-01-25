import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, ImageBackground, Text } from "react-native";
import { Root, Button, Footer, FooterTab, Icon, Header } from "native-base";
import * as Font from "expo-font";
import { SocialIcon } from "react-native-elements";
import Auth from "./helpers/auth";
import Feed from './views/feed'
import LoadingView from './views/pagCarga'
import FormMascota from './Components/form';
import perroGris from "./assets/fondos/perro_gris.jpg";
import Botonera from './views/botonera';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, selectedTab: "feed" };
    //AsyncStorage.removeItem('user')
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    let isAuth = await Auth.isAuthenticated();
    this.setState({ loading: false, isAuth: isAuth });
  }

  async googleAuth() {
    let isAuth = await Auth.googleLogin();
    this.setState({ isAuth: isAuth });
    console.log(this.state);
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
          <Header style={{ height: 0 }} />
          <SafeAreaView style={{ flex: 6 }}>
            {this.renderSelectedTab()}
          </SafeAreaView>
          <Footer>
            <FooterTab style={{ backgroundColor: "#7da7dbde", height: 50 }}>
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