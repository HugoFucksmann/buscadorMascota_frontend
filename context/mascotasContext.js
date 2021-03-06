import React, { createContext, Component } from "react";
import { Alert } from "react-native";
import { getUser, isAuthenticated } from "../helpers/auth";
import { getMascotas2, addReport, getAdop, getMyPets } from "../helpers/mascotaService";
import LoadingView from "../views/pagCarga";
import { adoptar } from "../helpers/mascotaService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MascotaContext = createContext();

class MasoctaProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mascota: {},
      loading: true,
      firstLaunch: null,
      slideradop: null,
    };
  }

  async componentDidMount() {
    let user = await getUser();
    let isAuth = false;
    let firstLaunch = null;
    let slideradop = null;
    if (user.google) isAuth = await isAuthenticated(user);
    let misMascotass = false;

    let mascotas = await getMascotas2(user);

    if (mascotas.length > 0) misMascotass = mascotas.filter((masco) => masco.usuario == user._id);

    let mascotasAdop = await getAdop();

    await AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", JSON.stringify(true));
        firstLaunch = true;
      } else {
        firstLaunch = false;
      }
    });

    await AsyncStorage.getItem("slideradop").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("slideradop", JSON.stringify(true));
        slideradop = true;
      } else {
        slideradop = false;
      }
    });

    this.setState({
      isAuth: isAuth,
      usuario: user,
      mascotas: mascotas,
      misMascotas: misMascotass,
      mascotasAdop: mascotasAdop,
      firstLaunch: firstLaunch,
      slideradop: slideradop,
      loading: false,
    });
  }

  handlerAuth = (auth, user) => {
    this.setState({ isAuth: auth, usuario: user });
  };

  handlerMascotasGet = async () => {
    let newMascotas = await getMascotas2(this.state.usuario);
    let misMasco = await getMyPets(newMascotas, this.state.usuario._id);
    this.setState({ mascotas: newMascotas, misMascotas: misMasco });
  };

  handlerMascota = (action, mascota) => {
    switch (action) {
      case "crear":
        this.handlerMascotasGet();

        /* let newMis = this.state.misMascotas;
        
        if (this.state.misMascotas !== false) newMis.unshift(mascota);
        else newMis = mascota;

        this.setState({
          misMascotas: newMis,
        }); */

        return Alert.alert("mascota cargada !", "duracion de la busqueda: 6 dias");
      case "editar":
        let updateMascotas = this.state.mascotas;
        updateMascotas.map((masco, index) => {
          if (masco._id === mascota._id) updateMascotas.splice(index, 1);
        });
        updateMascotas.unshift(mascota);
        let updateMisMascotas = this.state.misMascotas;
        updateMisMascotas.map((masco, index) => {
          if (masco._id === mascota._id) updateMisMascotas.splice(index, 1);
        });
        updateMisMascotas.unshift(mascota);

        this.setState({
          mascotas: updateMascotas,
          misMascotas: updateMisMascotas,
        });
        return Alert.alert("mascota actualizada!");
      case "eliminar":
        let mascotasElim = this.state.mascotas.filter((masco) => masco._id !== mascota._id);
        let mismascotasElim = this.state.misMascotas.filter((masco) => masco._id !== mascota._id);

        this.setState({
          mascotas: mascotasElim,
          misMascotas: mismascotasElim,
        });

        return Alert.alert("se elimino el registro de tu mascota");
      default:
        break;
    }
  };

  handlerMyChats = () => {
    return;
  };

  handlerUsuarioAdop = (newUser) => {
    this.setState({ usuario: newUser });
  };

  handlerReport = async (mid) => {
    let result = await addReport(this.state.usuario._id, mid);
    Alert.alert("", result);
  };

  handlerAdop = async (mid) => {
    let result = await adoptar(mid);

    if (result.ok) {
      await AsyncStorage.setItem("user", JSON.stringify(result.usuario));
      let newMascotasAdop = this.state.mascotasAdop;
      let finalAdop = newMascotasAdop.filter((masco) => masco._id !== mid);
      finalAdop.push(result.mascota);
      this.setState({
        mascotasAdop: finalAdop,
        usuario: result.usuario,
      });

      return Alert.alert(result.msj);
    } else return Alert.alert("ocurrio un error :(");
  };

  handlerFirstLaunch = () => this.setState({ firstLaunch: false });

  handlerSliderAdop = () => this.setState({ slideradop: false });

  render() {
    if (this.state.loading || this.state.firstLaunch === null) return <LoadingView />;
    return (
      <MascotaContext.Provider
        value={{
          ...this.state,
          handlerAuth: this.handlerAuth,
          handlerMascota: this.handlerMascota,
          handlerMyChats: this.handlerMyChats,
          handlerMascotasGet: this.handlerMascotasGet,
          handlerUsuarioAdop: this.handlerUsuarioAdop,
          handlerReport: this.handlerReport,
          handlerAdop: this.handlerAdop,
          handlerFirstLaunch: this.handlerFirstLaunch,
          handlerSliderAdop: this.handlerSliderAdop,
        }}
      >
        {this.props.children}
      </MascotaContext.Provider>
    );
  }
}

export default MasoctaProvider;
