import React, { createContext, Component } from 'react';
import { Alert } from 'react-native';
import { getMyPets } from '../helpers/mascotaService';

export const MascotaContext = createContext();

class MasoctaProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mascota: {},
			mascotas: props.mascotas,
			usuario: props.user,
			misMascotas: {},
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

				this.setState({ mascotas: newMascotas });
				return Alert.alert(
					'mascota cargada !',
					'duracion de la busqueda: 6 dias'
				);
				break;
			case 'editar':
				let updateMascotas = this.state.mascotas;
				updateMascotas = updateMascotas.map((masco, index) => {
					if (masco._id === mascota._id)
						return (updateMascotas[index] = mascota);
				});
				this.setState({ mascotas: updateMascotas });
				return Alert.alert('mascota actualizada!');
				break;
			case 'eliminar':
				let mascotasElim = this.state.mascotas.filter(
					(masco) => masco._id !== mascota._id
				);

				this.setState({ mascotas: mascotasElim });

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
		this.state.misMascotas = getMyPets(
			this.state.mascotas,
			this.state.usuario._id
		);

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
