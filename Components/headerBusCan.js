import React, { useContext } from 'react'
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { Header, Text, Thumbnail, View } from 'native-base';
import banner from '../assets/banner.png';
import colores from '../Components/colorPalette';
import { toogleMascotaContext } from '../context/toogleContext';
import { mostrarFoto } from '../helpers/imageService';
import backImg from "../assets/fondos/user_background.png";


const HeaderBuscan = () => {
  const { usuario, renderTabs, renderFeed } = useContext(toogleMascotaContext);

    if(renderTabs === 'perfil' && renderFeed !== 'chat' ) return <HeaderUser  usuario={usuario} />
    return (
  
      <Header style={styles.header}>
        <ImageBackground source={banner} style={styles.headerBackground} />
        <StatusBar style="auto" backgroundColor="#fff" animated={true} barStyle="dark-content" />
      </Header>
   
    );
};


const HeaderUser = ({ usuario }) => {
  const fotoPerfil = mostrarFoto(usuario.img);
  return (
    <View
      style={{
        height: 200,
        paddingTop: 40,
        backgroundColor: colores.main,
      }}
    >
      <ImageBackground source={backImg} style={styles.image}>
        <View style={{ flexDirection: "row-reverse", height: 20 }}></View>
        <Thumbnail
          large
          style={{
            alignSelf: "center",
            borderWidth: 3,
            borderColor: "#f2f2f2",
          }}
          source={{ uri: fotoPerfil }}
        />
        <Text
          style={{
            alignSelf: "center",
            fontSize: 22,
            marginTop: 10,
            color: colores.mild,
            fontFamily: "NunitoLight",
          }}
        >
          {usuario.name}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default HeaderBuscan;


const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#00000030',
	},
	button: {
		backgroundColor: 'white',
		borderRadius: 0,
	},
	footer: {
		backgroundColor: null,
		flexDirection: 'row',
		color: colores.main,
		borderTopWidth: 3,
		borderTopColor: colores.mild,
	},
	header: {
		height: 50,
		backgroundColor: 'white',
		borderBottomColor: colores.mild,
		borderBottomWidth: 2,
		paddingTop: 11,
		paddingBottom: 11,
		//marginTop: 25,
	},
	headerBackground: {
		flex: 0.8,
		resizeMode: 'cover',
		justifyContent: 'center',
    width: null
	},
});