import React from 'react';
import { Text } from 'react-native';
import { Tabs, Tab, TabHeading, DefaultTabBar } from 'native-base';
import colores from '../Components/colorPalette';
import MapFeed from '../Components/mapFeed';
import FeedTarj from '../modules/feedTarj';

const Feed = () => {
	const renderTabBar = (props) => {
		props.tabStyle = Object.create(props.tabStyle);
		return <DefaultTabBar {...props} />;
	};

	return (
		<>
			<Tabs
				locked
				tabBarUnderlineStyle={{ backgroundColor: colores.main, height: 2 }}
				tabContainerStyle={{ height: 40 }}
				tabBarPosition='bottom'
				renderTabBar={renderTabBar}
			>
				<Tab
					heading={
						<TabHeading style={{ backgroundColor: '#ffffff' }}>
							<Text style={{ fontFamily: 'NunitoLight' }}>Feed</Text>
						</TabHeading>
					}
				>
					<FeedTarj />
				</Tab>
				<Tab
					heading={
						<TabHeading style={{ backgroundColor: '#ffffff' }}>
							<Text style={{ fontFamily: 'NunitoLight' }}>Mapa</Text>
						</TabHeading>
					}
				>
					<MapFeed />
				</Tab>
			</Tabs>
		</>
	);
};

export default Feed;
