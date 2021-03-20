import React, { PureComponent } from 'react'
import { Card, CardItem, View } from 'native-base';
import { Dimensions, Text } from "react-native";
import colores from '../Components/colorPalette'

const EmptyCard = ({text}) => {

    return (
        <Card
          style={{
            alignSelf: "center",
            alignContent: "center",
            borderRadius: 5,
          }}
        >
          <CardItem style={{ borderRadius: 5 }}>
            <Text style={{ fontWeight: "bold", color: colores.main }}>
             {text}
            </Text>
          </CardItem>
        </Card>
    );
}

export default EmptyCard;