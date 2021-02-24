
export function tiempoTranscurrido(horaCero) {
  //horaCero es cuando se creo el perro, el valor es el resultado de new Date().getTime()
  let now = new Date().getTime();
  let tiempoPasado = now - horaCero;
  var segs = 1000;
  var mins = segs * 60;
  var hours = mins * 60;
  var days = hours * 24;
  var months = days * 30.416666666666668;
  var years = months * 12;

 
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

  if (minutos <= 60) return `perdido hace ${minutos} minutos`;
  else if (horas < 72) return `perdido hace ${horas}hs`;
  else return `perdido hace ${dias} dias`;
}