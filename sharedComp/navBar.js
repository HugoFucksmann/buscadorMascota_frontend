import React, { } from 'react'
import { StyleSheet, Text, SafeAreaView } from "react-native";
import {Header, Body, Title, Left, Right, Icon} from 'native-base'
import { useState } from 'react';

export default function NavBar() {
  
  
  return (
    <Header style={{ height: 50, backgroundColor: "white" }}>
      <Left />
      <Body >
        <Title style={{color: 'black', textAlign: 'center'}}>BusCan</Title>
      </Body>
      <Right>
        <Icon  fontSize="5" type="AntDesign" name="infocirlceo"></Icon>
        <Icon fontSize="5" type="AntDesign" name="user"></Icon>
      </Right>
    </Header>
  );
}