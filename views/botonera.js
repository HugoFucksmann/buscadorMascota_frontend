import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Card, CardItem, Icon, H3, Thumbnail, Button } from "native-base";
import samplePhoto from "../assets/perros/perro1.jpg";
import samplePhoto2 from "../assets/perros/perro2.jpg";
import colores from "../Components/colorPalette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingView from "./pagCarga";
import { PROD_URL } from "@env";

import { connect } from "react-redux";
import { setFavoriteAnimal, watchPersonData } from "../redux/app-redux";
import { TextInput } from "react-native-gesture-handler";
import { Component } from "react";

const mapStateToProps = (state) => {
  return {
    favoriteAnimal: state.favoriteAnimal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteAnimal: (text) => dispatch(setFavoriteAnimal(text)),
    watchPersonData: () => dispatch(watchPersonData()),
  };
};

class Botonera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteAnimal: this.props.favoriteAnimal,
    };
    //this.props.watchPersonData();
  }

  handleState = () => {
    this.props.setFavoriteAnimal(this.state.favoriteAnimal);
    console.log(this.props);
  };

  render() {
    return (
      <View>
        <Text>{this.props.favoriteAnimal}</Text>

        <TextInput
          style={{ borderWidth: 1, width: 200, height: 40 }}
          value={this.state.favoriteAnimal}
          onChangeText={(text) => {
            this.setState({ favoriteAnimal: text });
          }}
        />
        <Button onPress={this.handleState}>
          <Text>change estate</Text>
        </Button>
      </View>
    );
  }
}

/** 
return (
     <View>
        <View style={styles.titles}>
         <Text style={styles.titles}> MIS ANUNCIOS </Text>
         </View>
         <Card style={styles.card} >
          <Thumbnail
            source={samplePhoto}
            style={styles.picture}
          />
            <View>
                <View style={styles.dogName}>
                <Text style={styles.dogName}>Nombredelperro</Text>
                </View>

                <View style={styles.textBox}>
                <Text>Aca iría la descripción del perro hasta lo que entre.</Text>
                </View>
            </View>
        </Card>

        <View style={styles.titles}>
         <Text style={styles.titles}> MIS MENSAJES </Text>
         </View>

        <Card style={styles.card} >
          <Thumbnail
            source={samplePhoto}
            style={styles.picture}
          />

          <View style={styles.textBox}>
              <Text>Estos serían los últimos mensajes del chat, diciendo dónde vieron al perro, etc.</Text>
          </View>
        </Card>

        <Card style={styles.card} >
          <Thumbnail
            source={samplePhoto2}
            style={styles.picture}
          />

          <View style={styles.textBox}>
              <Text>Estos serían los últimos mensajes del chat, diciendo dónde vieron al perro, etc.</Text>
          </View>
        </Card>
        
     </View>
    );
**/

const styles = StyleSheet.create({
  titles: {
    marginTop: 5,
    color: colores.main,
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  dogName: {
    color: colores.main,
    fontSize: 16,
    paddingLeft: 5,
    paddingTop: 2,
  },
  card: {
    width: Dimensions.get("window").width - 10,
    flexDirection: "row",
    backgroundColor: colores.light,
    marginBottom: 5,
  },
  picture: {
    margin: 5,
    height: 80,
    width: 80,
    borderRadius: 120 / 2,
  },
  textBox: {
    margin: 5,
    padding: 5,
    width: Dimensions.get("window").width - 110,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Botonera);
