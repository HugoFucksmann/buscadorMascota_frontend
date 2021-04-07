import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  LogBox,
  Alert,
} from "react-native";
import { Root, Button, Footer, FooterTab, Icon, Header } from "native-base";
import * as Font from "expo-font";
import {
  googleLogin,
  isAuthenticated,
  usuarioRandom2,
  actualizarLocation2,
} from "./helpers/auth";
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
    let user = await AsyncStorage.getItem("user");
    let isAuth = false;

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      NunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
    });

    if (!user) user = await usuarioRandom2();
    else user = JSON.parse(user);

    if (user.google) isAuth = await isAuthenticated(user);

    user = await actualizarLocation2(user);

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
    let mascotas = await getMascotas(this.state.user);
    this.setState({ mascotas: mascotas, selectedTab: "perfil" });
    alert("se ha creado la mascota correctamente");
  }

  async handlerDeleteMascotas() {
    let mascotas = await getMascotas(this.state.user);
    this.setState({ mascotas: mascotas, selectedTab: "perfil" });
    alert("se ha eliminado la mascota");
  }
  async handlerEditMascotas() {
    let mascotas = await getMascotas(this.state.user);
    this.setState({ mascotas: mascotas, selectedTab: "perfil" });
    alert("mascota editada");
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

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "feed":
        return (
          <>
            <HeaderBuscan />
            <FadeInView style={{ height: "90%", width: "100%" }}>
              <Feed mascotas={this.state.mascotas} usuario={this.state.user} />
            </FadeInView>
          </>
        );
        break;

      case "formulario":
        if (!this.state.isAuth)
          return (
            <FadeInView style={{ height: "100%", width: "100%" }}>
              <Login handlerPress={() => this.googleAuth()} />
            </FadeInView>
          );
        return (
          <>
            <HeaderBuscan />
            <FadeInView style={{ height: "90%", width: "100%" }}>
              <FormMascota
                user={this.state.user}
                mascotas={getMyPets(this.state.mascotas, this.state.user._id)}
                handlerMascotas={() => this.handlerNewMascotas()}
              />
            </FadeInView>
          </>
        );
        break;

      case "perfil":
        return (
          <FadeInView style={{ height: "100%", width: "100%" }}>
            <Botonera2
              mascotas={this.state.mascotas}
              usuario={this.state.user}
              handlerDeleteMascotas={() => this.handlerDeleteMascotas()}
              handlerEditMascotas={() => this.handlerEditMascotas()}
            />
          </FadeInView>
        );

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
          <SafeAreaView style={{ flex: 1 }}>
            <FadeInView style={{ height: "100%", width: "100%" }}>
              {this.renderSelectedTab()}
            </FadeInView>
          </SafeAreaView>
          {this.renderTabs()}
        </Root>
      );
    }
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


