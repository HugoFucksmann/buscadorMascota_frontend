import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
	LogBox,
	SafeAreaView,
} from 'react-native';
import { Root} from 'native-base';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MasoctaProvider from './context/mascotasContext';
import Chat from './modules/chat';
import InfoPerro from './Components/InfoPerro';
import * as Notifications from 'expo-notifications';
import InfoAdop from './views/infoAdop';
import MainContent from './views/mainTabs';
const ModalStack = createStackNavigator();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true,
	}),
});
Notifications.addNotificationResponseReceivedListener(
	({ notification }) => {
		navigation.navigate(
			'chat',
			notification.request.content.data
		);
	}
);

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			NunitoLight: require('./assets/fonts/Nunito-Light.ttf'),
		});
	}

	render() {
		LogBox.ignoreLogs(['Remote debugger']);
		LogBox.ignoreLogs(['Setting a timer']);

		return (
			<Root>
				<NavigationContainer>
					<MasoctaProvider>
						<SafeAreaView style={{ flex: 1 }}>
							<ModalStack.Navigator
								mode='modal'
								initialRouteName='main'
								screenOptions={{
									headerShown: false,
								}}
							>
								<ModalStack.Screen
									name='main'
									component={MainContent}
								/>
								<ModalStack.Screen name='chat' component={Chat} />
								<ModalStack.Screen
									name='infoM'
									component={InfoPerro}
								/>
								<ModalStack.Screen
									name='infoAdop'
									component={InfoAdop}
								/>
							</ModalStack.Navigator>
						</SafeAreaView>
					</MasoctaProvider>
				</NavigationContainer>
			</Root>
		);
	}
}


