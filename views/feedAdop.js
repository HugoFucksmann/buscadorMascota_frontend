import { Card, CardItem, View } from "native-base";
import React, { memo, useContext } from "react";
import { Image, StyleSheet, Text, ImageBackground } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import EmptyCard from "../Components/EmptyCard";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import colores from "../Components/colorPalette";
import { MascotaContext } from "../context/mascotasContext";
import { getDistSantaFe } from "../helpers/getLocation";
import colorPalette from "../Components/colorPalette";
import patitasMosaico from "../assets/fondos/patitasMosaico.png";

const FeedAdop = () => {
  const { usuario, mascotasAdop, handlerSliderAdop, slideradop } = useContext(MascotaContext);

  const slides = [
    {
      key: 1,
      title: "Adopciones Responsables",
      text: "Bienvenido !!, estas a punto de ingresar al sistema de adopciones responsables, los siguientes animalitos que se muestran pertenecen a distintas instituciones/refugios de la ciudad",
      image: "",
      background: patitasMosaico,
    },
    {
      key: 2,
      title: "Contacto",
      text: "en caso de querer realizar una adopcion, te pondremos en contacto con la institucion respectiva, ellos te enviaran un correo electronico para contactarse con tigo",
      image: "",
      background: patitasMosaico,
    },
    {
      key: 3,
      title: "Ten en cuenta",
      text: "el proceso de adopcion no es inmediato, luego de que te contacten, deberas continuar con el formularo de adopcion y los requisitos planteados por la institucion responsable, ahora si, ya estas listo !!",
      image: "",
      background: patitasMosaico,
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <ImageBackground resizeMode="repeat" source={item.background} style={{ flex: 1 }}>
        <View style={styles.sliderView}>
          <Text style={styles.titleSlider}>{item.title}</Text>
          <Card style={{ padding: 20, borderRadius: 10 }}>
            <Text style={styles.textSlider2}>{item.text}</Text>
          </Card>
        </View>
      </ImageBackground>
    );
  };

  const renderItem = ({ item, index }) => {
    let wid = "32%";
    let hei = 120;

    if (index !== 0 && index % 9 === 0) {
      wid = "65%";
      //hei = 200;
    }
    if (index !== 2 && index % 9 === 2) {
      wid = "100%";
      hei = 200;
    }
    return <CardAdop mascotaAdop={item} wid={wid} hei={hei} />;
  };

  if (slideradop)
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        showSkipButton
        skipLabel="saltar"
        doneLabel="vamos !"
        nextLabel="siguiente"
        onDone={() => handlerSliderAdop()}
      />
    );

  return (
    <>
      <FlatList
        ListHeaderComponent={() => <HeaderCardFeedAdop />}
        ListEmptyComponent={<EmptyCard text={"no hay mascotas en adopcion"} />}
        numColumns={3}
        columnWrapperStyle={{ flexWrap: "wrap" }}
        contentContainerStyle={{ margin: "1%" }}
        bounces={false}
        scrollToOverflowEnabled={true}
        windowSize={6}
        initialNumToRender={20}
        maxToRenderPerBatch={9}
        data={mascotasAdop}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      {usuario.adopAuth && (
        <View style={styles.viewFiltro}>
          <Card style={styles.cardFiltro}>
            <CardItem
              style={{
                borderRadius: 6,
              }}
            >
              <Text style={styles.letraA}>
                En breve te enviaran un email desde la institucion, estate atento
              </Text>
            </CardItem>
          </Card>
        </View>
      )}
      {getDistSantaFe(usuario) > 13 && (
        <View style={styles.viewFiltro}>
          <Card style={styles.cardFiltro}>
            <CardItem
              style={{
                borderRadius: 6,
              }}
            >
              <Text style={styles.letraA}>
                Lo sentimos, no hay refugios ni rescatistas en tu zona aderidos a las adopciones de
                BusCan
              </Text>
            </CardItem>
          </Card>
        </View>
      )}
    </>
  );
};

const HeaderCardFeedAdop = () => {
  return (
    <Card
      style={{
        alignItems: "center",
        borderRadius: 6,
        elevation: 8,
        padding: 10,
      }}
    >
      <CardItem>
        <Text style={styles.letraB}>Adopciones Responsables</Text>
      </CardItem>
      <CardItem>
        <Text style={styles.letraT}>
          Adoptar es un acto de amor pero también de responsabilidad, recuerda que
        </Text>
      </CardItem>
    </Card>
  );
};

const CardAdop = memo(({ mascotaAdop, wid, hei }) => {
  const navigation = useNavigation();

  return (
    <>
      <Card key={mascotaAdop.avatar_url} style={{ width: wid, height: hei, elevation: 3 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colorPalette.main,
            height: "100%",
          }}
          onPress={() => navigation.navigate("infoAdop", mascotaAdop)}
        >
          <Image source={{ uri: mascotaAdop.petPicture }} style={styles.imagg} />
        </TouchableOpacity>
        {!mascotaAdop.estado && (
          <View style={styles.adoptrue}>
            <Text style={styles.letraA}>en proceso de adopcion</Text>
          </View>
        )}
      </Card>
    </>
  );
});

const styles = StyleSheet.create({
  imagg: { flex: 1 },
  sliderView: {
    height: "100%",
    width: "100%",

    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 100,
    paddingRight: 40,
    paddingLeft: 40,
  },
  textSlider2: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 3,
    textAlign: "center",
    color: "#000",
  },
  titleSlider: {
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: 4,
    textAlign: "center",
    color: "#000",
  },

  letraT: {
    fontFamily: "NunitoLight",
    letterSpacing: 1.2,
    color: colores.main,
    fontSize: 15,
    textAlign: "center",
  },
  letraB: {
    fontFamily: "NunitoLight",
    letterSpacing: 1.6,
    color: colores.main,
    fontSize: 24,
  },
  letraA: {
    fontFamily: "NunitoLight",
    fontSize: 16,
    letterSpacing: 1.4,
    color: colores.main,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 5,
    width: "100%",
    textAlign: "center",
  },
  adoptrue: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(23,20,40,0.5)",
    paddingTop: "25%",
    alignItems: "center",
    alignContent: "center",
  },
  viewFiltro: {
    height: "100%",
    width: "100%",
    padding: 30,
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cardFiltro: {
    borderRadius: 4,
  },
});

export default FeedAdop;
