import "react-native-gesture-handler";
import React, { useContext } from "react";
import { StyleSheet, Text, Image, ImageBackground } from "react-native";
import { Card, Icon, View } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../views/feed";
import FormMascota from "../views/formulario";
import HeaderBuscan from "../Components/headerBusCan";
import Login from "../Components/login";
import colores from "../Components/colorPalette";
import Botonera2 from "../views/botonera2";
import AppIntroSlider from "react-native-app-intro-slider";
import FeedAdop from "../views/feedAdop";
import { MascotaContext } from "../context/mascotasContext";
import jorLogo from "../assets/jor/jorLogo.png";
import fondoslider3 from "../assets/fondos/fondoslider3.jpeg";
import patitasMosaico from "../assets/fondos/patitasMosaico.png";
import buscanlog from "../assets/banner2.png";

const Tab = createBottomTabNavigator();

const MainContent = () => {
  const { isAuth, firstLaunch, handlerFirstLaunch } = useContext(MascotaContext);

  const slides = [
    {
      key: 1,
      title: "BUSCAN",
      text: "APP DESARROLLADA A PARTIR DE LA INICIATIVA DE LA CONCEJALA",
      text2: "JORGELINA MUDALLEL",
      image: buscanlog,
      jorlogo: jorLogo,
      background: patitasMosaico,
    },
    {
      key: 2,
      title: "RECUERDA:",
      text: "se educado al interactuar con otros usuarios y no dudes en reportar una publicacion si crees que el contenido no es adecuado",
      image: "",
      background: fondoslider3,
    },
  ];

  const _renderItem = ({ item, index }) => {
    if (index === 0)
      return (
        <ImageBackground resizeMode="repeat" source={item.background} style={{ flex: 1 }}>
          <View style={styles.sliderView}>
            <Image
              style={{
                height: 60,
                width: 280,
              }}
              source={item.image}
            />
            <View>
              <Text style={styles.textSlider}>{item.text}</Text>
              <Text style={styles.textSlider}>{item.text2}</Text>
            </View>

            <Card
              style={{
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Image style={{ height: 90, width: 230 }} source={item.jorlogo} />
            </Card>
          </View>
        </ImageBackground>
      );

    return (
      <ImageBackground resizeMode="repeat" source={item.background} style={{ flex: 1 }}>
        <View style={styles.sliderView}>
          <Card style={{ padding: 20, borderRadius: 10, backgroundColor: "rgba(255,255,255,.2)" }}>
            <Text style={styles.titleSlider}>{item.title}</Text>
            <Text></Text>
            <Text style={styles.textSlider2}>{item.text}</Text>
          </Card>
        </View>
      </ImageBackground>
    );
  };

  if (firstLaunch)
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        showSkipButton
        skipLabel="saltar"
        doneLabel="vamos !"
        nextLabel="siguiente"
        onDone={() => handlerFirstLaunch()}
      />
    );

  return (
    <>
      <HeaderBuscan />
      <Tab.Navigator
        initialRouteName="feed"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconType;

            switch (route.name) {
              case "formulario":
                iconName = "map-marker-alt";
                iconType = "Fontisto";
                color = focused ? colores.main : colores.mild;
                break;
              case "feed":
                iconName = "paw";
                iconType = "FontAwesome5";
                color = focused ? colores.main : colores.mild;
                break;
              case "perfil":
                iconName = "user";
                iconType = "FontAwesome";
                color = focused ? colores.main : colores.mild;
                break;
              case "adop":
                iconName = "heart-plus";
                iconType = "MaterialCommunityIcons";
                color = focused ? colores.main : colores.mild;
                break;

              default:
                iconName = "paw";
                iconType = "FontAwesome5";
                color = focused ? colores.main : colores.mild;
                break;
            }

            return <Icon type={iconType} name={iconName} style={{ color: color, fontSize: 25 }} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          style: { height: 42 },
        }}
      >
        {isAuth === true ? (
          <Tab.Screen name="formulario" component={FormMascota} />
        ) : (
          <Tab.Screen name="formulario" component={Login} />
        )}
        <Tab.Screen name="feed" component={Feed} />
        {isAuth === true ? (
          <Tab.Screen name="adop" component={FeedAdop} />
        ) : (
          <Tab.Screen name="adop" component={Login} />
        )}

        <Tab.Screen name="perfil" component={Botonera2} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  sliderView: {
    height: "100%",
    width: "100%",

    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",

    padding: 45,
  },
  sliderImg: {
    height: 240,
    width: 240,
    borderRadius: 120,
  },
  titleSlider: {
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: 4,
    textAlign: "center",
    color: "#f2f2f2",
  },
  textSlider: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 2,
    textAlign: "center",
    color: "#0f290b",
  },
  textSlider2: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 3,
    textAlign: "center",
    color: "#f2f2f2",
  },
});

export default MainContent;
