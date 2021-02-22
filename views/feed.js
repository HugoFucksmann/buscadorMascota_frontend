import React, { useState, useEffect } from 'react';
import { PROD_URL } from "@env";
import { FlatList, SafeAreaView } from "react-native";
import CardFeed from '../Components/card'
import LoadingView from './pagCarga';

const Feed = ({mascotas, usuario}) => {

  const RenderItem = ({item}) => {
    return <CardFeed mascota={item} usuario={usuario} />
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(242,246,239,255)' }}>
    <FlatList
        data={mascotas}
        renderItem={RenderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};




export default Feed;