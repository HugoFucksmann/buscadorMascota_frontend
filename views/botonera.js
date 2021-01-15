import React, { } from 'react'
import { Text, View, Dimensions } from "react-native";
import { Button } from "react-native-paper";
const Botonera = () => {
   // const { width } = Dimensions.get("window");

    return (
     <View>
         <View>
            <Button onPress={() => alert('presss')}>cargar mascota</Button>
         </View>
         <View>

         </View>
         <View>
             
         </View>
     </View>
    );
}



export default Botonera