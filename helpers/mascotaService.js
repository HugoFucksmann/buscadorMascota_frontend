import { PROD_URL } from "@env";
  
async function actualizarArchivo(file, perroId, token) {
  try {
    let localUri = file.uri;
    let filename = localUri.split("/").pop();

    
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const url = `https://mascotass.herokuapp.com/api/upload/imgMascota/${perroId}`;
    let formData = new FormData();
 
    formData.append("imgMascota", { uri: localUri, name: filename, type });

    
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        token: token,
      },
      body: formData,
    })
    .catch((e) => console.log(e));

    const data = await resp.json();
   
    if (data.ok) {
      return data.nombreArchivo;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

function filtrar(mascotas, user, dist2) {
  // definir una nueva variable mascotasFiltered
  var mascotasFiltered;
  var userLat = user.location.latitude;
  var userLon = user.location.longitude;
  // para cada mascota, chequeo si esta a menos de sqrt(dist) de distancia y en tal caso la agrego a mascotasFiltered
  for (let ind = 0; ind < mascotas.lenght; ind++) {
    var petLat = mascotas[ind].location.latitude;
    var petLon = mascotas[ind].location.longitude;
    if ((petLat - userLat) ** 2 + (petLon - userLon) ** 2 < dist2) {
      mascotasFiltered.append(mascotas[ind]);
    }
  }
  return mascotasFiltered;
}

async function getMascotas(user){
  
  return await fetch(`https://mascotass.herokuapp.com/api/mascotas/${user._id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if(res.ok) return res.mascotas
      else return false
    })
    .catch((error) => console.error(error));
}

async function crearMascota(perro, token, notification) {
 
  const perroId = await fetch(`https://mascotass.herokuapp.com/api/mascotas/crear`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ perro, notification }),
  })
    .then((res) => res.json())
    .then(({mascota}) => mascota._id)
    .catch((e) => console.log(e));
    
 
  if(!perroId) return false;

  return perroId;

    
}

module.exports = {
  actualizarArchivo,
  crearMascota,
  getMascotas
};