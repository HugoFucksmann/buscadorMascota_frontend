import React, {} from 'react';
import { FlatList, SafeAreaView } from "react-native";
import CardFeed from '../Components/card';

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