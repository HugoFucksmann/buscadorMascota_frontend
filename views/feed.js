import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import Cardd from '../Components/card'

const Feed = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log('gg');
    fetch("http://192.168.0.102:3011/api/mascotas")
      .then((response) => response.json())
      .then(({ mascotas }) => {
        setData(mascotas);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  
  const RenderItem = ({item}) => {
    return <Cardd mascotas={item} />
  };


  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ marginTop: 100 }}
      />
    );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default Feed;