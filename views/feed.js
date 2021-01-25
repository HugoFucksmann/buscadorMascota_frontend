import React, { useState, useEffect } from 'react';
import { BASE_URL } from "@env";
import { FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import CardFeed from '../Components/card'
import LoadingView from './pagCarga';

const Feed = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
   
    fetch(`${BASE_URL}/mascotas`)
      .then((response) => response.json())
      .then(({ mascotas }) => {
        setData(mascotas.reverse());
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  
  const RenderItem = ({item}) => {
    return <CardFeed mascota={item} />
  };


  if (isLoading)
    return (
     <LoadingView />
    );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ededed" }}>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default Feed;