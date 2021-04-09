import React, { useState, createContext, useEffect } from "react";
import { set } from "react-native-reanimated";
import { isAuthenticated, getUser } from "../helpers/auth";
import { getMascotas2 } from "../helpers/mascotaService";
import LoadingView from "../views/pagCarga";

export const MascotasContext = createContext();

export const MascotasProvider = (props) => {
    const [mascotas, setMascotas] = useState(props.mascotas);
    const [mascota, setMascota] = useState(false)
    return (
      <MascotasContext.Provider
        value={[mascotas, setMascotas, props.user, mascota, setMascota]}
      >
        {props.children}
      </MascotasContext.Provider>
    );

}