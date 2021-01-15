import React, { } from 'react'
import { StyleSheet, Text, SafeAreaView } from "react-native";
import {Header, Body, Title, Left, Right} from 'native-base'
import { useState } from 'react';

export default function NavBar() {
  
  
  return (
    <Header  >
      <Left />
      <Body>
        <Title>Buscador Mascotas</Title>
      </Body>
      
    </Header>
  );
}

/* const styles = StyleSheet.create({
  navBar: {
    flex: 0.1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //height: 100,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
}); */