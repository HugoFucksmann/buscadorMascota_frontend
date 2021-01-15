import React from "react";
import { Text, View } from "react-native";
import { Form, Tab, Tabs } from "native-base";
import FormMascota from "../Components/form";
import Feed from "./feed";
const Formulario = () => {

  return (
    <Tabs>
      <Tab heading="Carga perro perdido">
          <FormMascota />
      </Tab>
      <Tab heading="Carga perro encontrado">
        <Feed />
      </Tab>
    </Tabs>
  );
};

export default Formulario;
