export function tiempoTranscurrido(horaCero) {
	let hoy = new Date().getTime();
	let msj;
	let tiempoPasado = hoy - horaCero;
	let segs = 1000;
	let mins = segs * 60;
	let hours = mins * 60;
	let days = hours * 24;
	let months = days * 30.416666666666668;
	let years = months * 12;

	//calculo
	let anos = Math.floor(tiempoPasado / years);

	tiempoPasado = tiempoPasado - anos * years;
	let meses = Math.floor(tiempoPasado / months);

	tiempoPasado = tiempoPasado - meses * months;
	let dias = Math.floor(tiempoPasado / days);

	tiempoPasado = tiempoPasado - dias * days;
	let horas = Math.floor(tiempoPasado / hours);

	tiempoPasado = tiempoPasado - horas * hours;
	let minutos = Math.floor(tiempoPasado / mins);

	tiempoPasado = tiempoPasado - minutos * mins;
	let segundos = Math.floor(tiempoPasado / segs);

	if (dias === 0 && horas === 0 && minutos == 0)
		msj = `Hace ${segundos} segundos`;
	else if (dias === 0 && horas === 0) msj = `Hace ${minutos} minutos`;
	else if (dias === 0 && horas > 0) msj = `Hace ${horas} horas`;
	else msj = `Hace ${dias} dias`;

	return msj;
}

export function primerosTreinta(horaCero) {
	let hoy = new Date().getTime();

	let tiempoPasado = hoy - horaCero;
	let segs = 1000;
	let mins = segs * 60;
	let hours = mins * 60;
	let days = hours * 24;
	let months = days * 30.416666666666668;
	let years = months * 12;
	let mediaHora;
	//calculo
	let anos = Math.floor(tiempoPasado / years);

	tiempoPasado = tiempoPasado - anos * years;
	let meses = Math.floor(tiempoPasado / months);

	tiempoPasado = tiempoPasado - meses * months;
	let dias = Math.floor(tiempoPasado / days);

	tiempoPasado = tiempoPasado - dias * days;
	let horas = Math.floor(tiempoPasado / hours);

	tiempoPasado = tiempoPasado - horas * hours;
	let minutos = Math.floor(tiempoPasado / mins);

	if (dias === 0 && horas === 0 && minutos < 40) mediaHora = true;
	else mediaHora = false;

	return mediaHora;
}

export function getFechaChat(createdAt) {
	let date = new Date(createdAt.seconds * 1000);
	let hoy = new Date();
	let diaHoy = hoy.getDate();
	let hora = date.getHours();
	let minutos = date.getMinutes();
	let dia = date.getDate();
	let mes = date.getMonth() + 1;
	let fechaFinal;

	if (diaHoy === dia) {
		if (hora < 10 && minutos < 10) fechaFinal = `0${hora}:0${minutos} hs`;
		else if (hora < 10 && minutos >= 10) fechaFinal = `0${hora}:${minutos} hs`;
		else if (hora >= 10 && minutos < 10) fechaFinal = `${hora}:0${minutos} hs`;
		else fechaFinal = `${hora}:${minutos} hs`;
	} else {
		if (dia < 10 && mes + 1 < 10) fechaFinal = `0${dia}/0${mes}`;
		else if (dia >= 10 && mes + 1 < 10) fechaFinal = `${dia}/0${mes}`;
		else if (dia < 10 && mes + 1 >= 10) fechaFinal = `0${dia}/${mes}`;
		else fechaFinal = `${dia}/${mes}`;
	}

	return fechaFinal;
}
