import { Card, CardItem, View } from "native-base";
import React, { memo, useContext, useState } from "react";
import { Image, Modal, Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import EmptyCard from "../Components/EmptyCard";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import colorPalette from "../Components/colorPalette";
import { MascotaContext } from "../context/mascotasContext";
import { getDistSantaFe } from "../helpers/getLocation";

const FeedAdop = () => {
  const { usuario, mascotasAdop } = useContext(MascotaContext);
  const [showRealApp, setshowRealApp] = useState(false);

  const slides = [
    {
      key: 1,
      title: "Title 1",
      text: "Description.\nSay something cool",
      image: require("../assets/patitasMosaico.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: 2,
      title: "Title 2",
      text: "Other cool stuff",
      image: require("../assets/patitasMosaico.png"),
      backgroundColor: "#febe29",
    },
    {
      key: 3,
      title: "Rocket guy",
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      image: require("../assets/patitasMosaico.png"),
      backgroundColor: "#22bcb5",
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
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

  if (!showRealApp)
    return (
      <AppIntroSlider renderItem={_renderItem} data={slides} onDone={() => setshowRealApp(true)} />
    );
  return (
    <>
      <FlatList
        ListEmptyComponent={<EmptyCard text={"no hay mascotas perdidas"} />}
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
      {getDistSantaFe(usuario) > 12 && (
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <Card style={{ borderRadius: 6 }}>
            <CardItem
              style={{
                borderRadius: 6,
                flexDirection: "column",
              }}
            >
              <Text style={{ fontFamily: "NunitoLight", fontSize: 22 }}>Proximamente</Text>
              <Text style={{ fontFamily: "NunitoLight", fontSize: 22 }}>
                Adopciones Responsables
              </Text>
            </CardItem>
          </Card>
        </View>
      )}
    </>
  );
};

const CardAdop = memo(({ mascotaAdop, wid, hei }) => {
  const navigation = useNavigation();
  return (
    <>
      <Card key={mascotaAdop.avatar_url} style={{ width: wid, height: hei, elevation: 3 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            height: "100%",
          }}
          onPress={() => navigation.navigate("infoAdop", mascotaAdop)}
        >
          <Image source={{ uri: mascotaAdop.petPicture }} style={{ flex: 1 }} />
        </TouchableOpacity>
      </Card>
    </>
  );
});

export default FeedAdop;
