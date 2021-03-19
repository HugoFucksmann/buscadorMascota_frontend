
export function tiempoTranscurrido(horaCero) {
  var nacimiento = new Date(1936, 11, 29);
  var hoy = new Date();
  let msj;
  var tiempoPasado = hoy - horaCero;
  var segs = 1000;
  var mins = segs * 60;
  var hours = mins * 60;
  var days = hours * 24;
  var months = days * 30.416666666666668;
  var years = months * 12;

  //calculo
  var anos = Math.floor(tiempoPasado / years);

  tiempoPasado = tiempoPasado - anos * years;
  var meses = Math.floor(tiempoPasado / months);

  tiempoPasado = tiempoPasado - meses * months;
  var dias = Math.floor(tiempoPasado / days);

  tiempoPasado = tiempoPasado - dias * days;
  var horas = Math.floor(tiempoPasado / hours);

  tiempoPasado = tiempoPasado - horas * hours;
  var minutos = Math.floor(tiempoPasado / mins);

  tiempoPasado = tiempoPasado - minutos * mins;
  var segundos = Math.floor(tiempoPasado / segs);

  if (dias === 0 && horas === 0 && minutos == 0 ) msj = `Hace ${segundos} segundos`;
  else if (dias === 0 && horas === 0) msj = `Hace ${minutos} minutos`;
  else if (dias === 0 && horas > 0) msj = `Hace ${horas} horas`;
  else msj = `Hace ${dias} dias`;
 
  return msj;
}