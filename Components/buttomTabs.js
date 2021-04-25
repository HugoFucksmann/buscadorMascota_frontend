import { Button, Footer, FooterTab, Icon } from 'native-base';
import React, { PureComponent, useContext } from 'react'
import { StyleSheet } from 'react-native';
import { toogleMascotaContext } from '../context/toogleContext';
import colores from '../Components/colorPalette';

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

const styles = StyleSheet.create({
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
		marginTop: 25,
	},
	headerBackground: {
		flex: 0.8,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});

export default RenderButtomTabs;