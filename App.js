import "react-native-gesture-handler";
import React, { Component, useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  LogBox,
  Alert,
} from "react-native";
import { Root, Button, Footer, FooterTab, Icon, Header } from "native-base";
import * as Font from "expo-font";
import { googleLogin, isAuthenticated, getUser } from "./helpers/auth";
import Feed from "./views/feed";
import LoadingView from "./views/pagCarga";
import FormMascota from "./views/formulario";
import Login from "./Components/login";
import { getMascotas, getMyPets, getMascotas2 } from "./helpers/mascotaService";
import banner from "./assets/banner.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colores from "./Components/colorPalette";
import { StatusBar } from "expo-status-bar";
import Botonera2 from "./views/botonera2";
import * as Notifications from "expo-notifications";
import { FadeInView } from "./AnimatedViews/fadeView";
import ToogleMasoctaProvider, { toogleMascotaContext } from "./context/toogleContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, selectedTab: "feed" };
  }

  async componentDidMount() {
    let isAuth = false;
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      NunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
    });

    let user = await getUser();

    if (user.google) isAuth = await isAuthenticated(user);

    let mascotas = await getMascotas2(user);

    this.setState({
      isAuth: isAuth,
      user: user,
      mascotas: mascotas,
      loading: false,
    });
  }

  async googleAuth() {
    let user = await googleLogin(this.state.user);
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      this.setState({ isAuth: true, user: user });
    } else {
      return Alert("Error al intentar loguearse");
    }
  }

  async handlerNewMascotas() {
    let mascotas = await getMascotas2(this.state.user);
    this.setState({ mascotas: mascotas, selectedTab: "perfil" });
    alert("se ha creado la mascota correctamente");
  }

  async handlerDeleteMascotas() {
    let mascotas = await getMascotas2(this.state.user);
    this.setState({ mascotas: mascotas, selectedTab: "perfil" });
    alert("se ha eliminado la mascota");
  }
  async handlerEditMascotas() {
    let mascotas = await getMascotas2(this.state.user);
    this.setState({ mascotas: mascotas, selectedTab: "perfil" });
    alert("mascota editada");
  }
  
  render() {
    
    LogBox.ignoreLogs(["Remote debugger"]);
    LogBox.ignoreLogs(["Setting a timer"]);

    if (this.state.loading) {
      return <LoadingView />;
    } else {
      return (
        <Root>
          <ToogleMasoctaProvider  user={this.state.user}   mascotas={this.state.mascotas}>
            <SafeAreaView style={{ flex: 1 }}>
            <RenderTabs isAuth={this.state.isAuth} />
            </SafeAreaView>
            <RenderButtomTabs />
          </ToogleMasoctaProvider>
        </Root>
      );
    }
  }
}

const RenderButtomTabs = () => {
  const {renderTabs, handlerTabs } = useContext(toogleMascotaContext)
  return (
    <Footer style={styles.footer}>
      <FooterTab style={{ backgroundColor: colores.mild }}>
        <Button
          style={styles.button}
          active={renderTabs === "formulario"}
          onPress={() => handlerTabs("formulario")}
        >
          <Icon
            type="FontAwesome"
            name="plus"
            style={{
              color:
              renderTabs === "formulario"
                  ? colores.main
                  : colores.mild,
            }}
          />
        </Button>
        <Button
          style={styles.button}
          active={renderTabs === "feed"}
          onPress={() => handlerTabs("feed")}
        >
          <Icon
            type="FontAwesome5"
            name="paw"
            style={{
              color:
                renderTabs == "feed"
                  ? colores.main
                  : colores.mild,
            }}
          />
        </Button>
        <Button
          style={styles.button}
          active={renderTabs === "perfil"}
          onPress={() => handlerTabs("perfil")}
        >
          <Icon
            type="FontAwesome"
            name="user"
            style={{
              color:
              renderTabs == "perfil"
                  ? colores.main
                  : colores.mild,
            }}
          />
        </Button>
      </FooterTab>
    </Footer>
  );

}

const RenderTabs = ({isAuth}) => {
  const {renderTabs} = useContext(toogleMascotaContext)
  
  switch (renderTabs) {
   
    case "feed":
      return (
        <>
          <HeaderBuscan />
          <FadeInView style={{ height: "90%", width: "100%" }}>
            <Feed  />
          </FadeInView>
        </>
      );
      break;

    case "formulario":
      if (!isAuth)
        return <Login handlerPress={() => this.googleAuth()} />;
      return (
        <>
          <HeaderBuscan />
         
          <FadeInView style={{ height: "90%", width: "100%" }}>
            <FormMascota />
          </FadeInView>
        </>
      );
      break;

    case "perfil":
      return (
        <FadeInView style={{ height: "100%", width: "100%" }}>
          <Botonera2 />
        </FadeInView>
      );

      break;

    default:
    break
  }
  
}

const HeaderBuscan = () => {
  return (
    <Header style={styles.header}>
      <ImageBackground source={banner} style={styles.headerBackground} />
      <StatusBar style="auto" backgroundColor="#ffffff" />
    </Header>
  );
};

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
    marginTop: 25,
  },
  headerBackground: {
    flex: 0.8,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
