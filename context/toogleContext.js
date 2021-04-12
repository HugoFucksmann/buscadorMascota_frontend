import React, { createContext, Component } from 'react'
import { Alert } from 'react-native';
import {getMyPets} from '../helpers/mascotaService'

export const toogleMascotaContext = createContext();

class ToogleMasoctaProvider extends Component {

    state = {
        toogle: false,
        mascota: {},
        mascotas: {},
        renderFeed: 'tarjetas',
        renderTabs: 'feed',
        usuario: {},
        misMascotas: {}
    }

    setToogle = () => {
        this.setState({toogle: !this.state.toogle});
    }

    handlerFeed = (mascota, render) =>  this.setState({mascota: mascota, renderFeed: render})
    handlerTabs = (render) =>  this.setState({ renderTabs: render})
   
  

    handlerMascota = (action , mascota) => {
        switch (action){

            case 'crear':
                let newMascotas = this.state.mascotas
                newMascotas.push(mascota)
                this.setState({mascotas: newMascotas, renderTabs: 'perfil'})
            break
            case 'editar':
                let updateMascotas = this.state.mascotas
                updateMascotas =  updateMascotas.map((masco, index) => {
                    if(masco._id === mascota._id) return updateMascotas[index] = mascota
                })
                this.setState({mascotas: updateMascotas, renderTabs: 'perfil'})
                return Alert.alert('mascota actualizada!')
            break
            case 'eliminar':
                let mascotaEliminada = this.state.mascotas
                mascotaEliminada =  mascotaEliminada.map((masco, index) => {
                    if(masco._id === mascota._id) return mascotaEliminada.splice(index, 1)
                })
                this.setState({mascotas: mascotaEliminada, renderTabs: 'perfil'})
                return Alert.alert('se elimino la mascota correctamente')
            break
            default:
                break;    
        }
    }
    

    render(){
        this.state.mascotas = this.props.mascotas;
        this.state.usuario = this.props.user
        this.state.misMascotas = getMyPets(this.props.mascotas, this.props.user._id)
        
        return (
            <toogleMascotaContext.Provider value={{...this.state, setToogle: this.setToogle, handlerFeed: this.handlerFeed, handlerMascota: this.handlerMascota, handlerTabs: this.handlerTabs}} >
                { this.props.children }
            </toogleMascotaContext.Provider>
        )
    }
}

export default ToogleMasoctaProvider;