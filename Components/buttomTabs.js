import { Button, Footer, FooterTab, Icon } from 'native-base';
import React, { PureComponent, useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { MascotaContext } from '../context/mascotasContext';
import colores from '../Components/colorPalette';
import { useNavigation, useRoute } from '@react-navigation/native';

const RenderButtomTabs = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [active, setActive] = useState('feed');
	const { isAuth } = useContext(MascotaContext);

	function handlerButton(render) {
		setActive(render);
		navigation.navigate(render);
	}

	function getActiveRouteName(route) {
		// Access the tab navigator's state using `route.state`
		const routeName = route.state
			? // Get the currently active route name in the tab navigator
			  route.state.routes[route.state.index].name
			: // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
			  // In our case, it's "Home" as that's the first screen inside the navigator
			  route.params?.screen || 'feed';

		return routeName;
	}

	return (
		<Footer style={styles.footer}>
			<FooterTab style={{ backgroundColor: colores.mild }}>
				<Button
					style={styles.button}
					active={getActiveRouteName(route) === 'formulario'}
					onPress={() => {
						if (isAuth) handlerButton('formulario');
						else handlerButton('login');
					}}
				>
					<Icon
						type='FontAwesome'
						name='plus'
						style={{
							color:
								getActiveRouteName(route) === 'formulario'
									? colores.main
									: colores.mild,
						}}
					/>
				</Button>
				<Button
					style={styles.button}
					active={getActiveRouteName(route) === 'feed'}
					onPress={() => handlerButton('feed')}
				>
					<Icon
						type='FontAwesome5'
						name='paw'
						style={{
							color:
								getActiveRouteName(route) == 'feed'
									? colores.main
									: colores.mild,
						}}
					/>
				</Button>
				<Button
					style={styles.button}
					active={getActiveRouteName(route) === 'perfil'}
					onPress={() => handlerButton('perfil')}
				>
					<Icon
						type='FontAwesome'
						name='user'
						style={{
							color:
								getActiveRouteName(route) == 'perfil'
									? colores.main
									: colores.mild,
						}}
					/>
				</Button>
			</FooterTab>
		</Footer>
	);
};

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
