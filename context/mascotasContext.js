import React, { createContext, Component } from 'react';
import { Alert } from 'react-native';

export const MascotaContext = createContext();

class MasoctaProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mascota: {},
			mascotas: props.mascotas,
			usuario: props.user,
			misMascotas: props.misMascotas,
			isAuth: props.isAuth,
		};
	}

	handlerAuth = (auth, user) => {
		this.setState({ isAuth: auth, usuario: user });
	};

	handlerMascota = (action, mascota) => {
		switch (action) {
			case 'crear':
				let newMascotas = this.state.mascotas;
				if (newMascotas) newMascotas.unshift(mascota);
				else newMascotas = mascota;
				this.state.misMascotas.unshift(mascota);

				return Alert.alert(
					'mascota cargada !',
					'duracion de la busqueda: 6 dias'
				);
				break;
			case 'editar':
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
				return Alert.alert('mascota actualizada!');
				break;
			case 'eliminar':
				let mascotasElim = this.state.mascotas.filter(
					(masco) => masco._id !== mascota._id
				);
				let mismascotasElim = this.state.misMascotas.filter(
					(masco) => masco._id !== mascota._id
				);

				this.setState({ mascotas: mascotasElim, misMascotas: mismascotasElim });

				return Alert.alert('se elimino el registro de tu mascota');
				break;
			default:
				break;
		}
	};

	handlerMyChats = () => {
		return;
	};

	render() {
		return (
			<MascotaContext.Provider
				value={{
					...this.state,
					handlerAuth: this.handlerAuth,
					handlerMascota: this.handlerMascota,
					handlerMyChats: this.handlerMyChats,
				}}
			>
				{this.props.children}
			</MascotaContext.Provider>
		);
	}
}

export default MasoctaProvider;
