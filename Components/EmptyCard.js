import React, { PureComponent } from 'react'
import { Card, CardItem, View } from 'native-base';
import { Dimensions, Text } from "react-native";
import colores from '../Components/colorPalette'

const EmptyCard = ({text}) => {

    return (
      <View style={{ padding: 10 }}>
      <Card
        style={{
          alignSelf: "center",
          alignContent: "center",
          borderRadius: 5,
        }}
      >
        <CardItem style={{ borderRadius: 5 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: colores.main,
              fontFamily: "NunitoLight",
            }}
          >
            {text}
          </Text>
        </CardItem>
      </Card>
      </View>
    );
}

export default EmptyCard;