import React, { useState, createContext } from "react";

export const MascotasContext = createContext();

export const MascotasProvider = (props) => {
    const [mascotas, setMascotas] = useState(props.mascotas);
    const [handlerMascota, setHandlerMascota] = useState({mascota: false, estado: 'tarjetas' })
    return (
      <MascotasContext.Provider
        value={[mascotas, setMascotas, props.user, handlerMascota, setHandlerMascota]}
      >
        {props.children}
      </MascotasContext.Provider>
    );

}