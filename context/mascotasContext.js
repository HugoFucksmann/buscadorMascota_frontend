import React, { createContext, Component } from 'react';
import { Alert } from 'react-native';
import { googleLogin } from '../helpers/auth';
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

				newMascotas.push(mascota);

				this.setState({ mascotas: newMascotas });
				return Alert.alert('mascota cargada !');
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
				let mascotaEliminada = this.state.mascotas;
				mascotaEliminada = mascotaEliminada.map((masco, index) => {
					if (masco._id === mascota._id)
						return mascotaEliminada.splice(index, 1);
				});
				this.setState({ mascotas: mascotaEliminada });
				return Alert.alert('se elimino la mascota correctamente');
				break;
			default:
				break;
		}
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
				}}
			>
				{this.props.children}
			</MascotaContext.Provider>
		);
	}
}

export default MasoctaProvider;
