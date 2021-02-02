import React from 'react'
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Card, CardItem, Icon, H3, Thumbnail } from "native-base";
import samplePhoto from '../assets/perros/perro1.jpg';
import samplePhoto2 from '../assets/perros/perro2.jpg';
import colores from '../Components/colorPalette';

const Botonera = () => {
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
}

const styles = StyleSheet.create({
    titles: {
        marginTop: 5,
        color: colores.main,
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dogName:{
        color: colores.main,
        fontSize: 16,
        paddingLeft:5,
        paddingTop:2
    },
    card : {
        width:Dimensions.get('window').width-10,
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
        margin:5,
        padding:5,
        width:Dimensions.get('window').width-110,
        backgroundColor: 'white',
        borderRadius:10
    }
});


export default Botonera;