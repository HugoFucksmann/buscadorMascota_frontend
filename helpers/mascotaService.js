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

function getMyPets(mascotas, uid){

  let miMascotas = mascotas.filter((masco) => masco.usuario == uid);
  
  if(miMascotas) return miMascotas
  else return false

}



async function getMascotas(user){

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function distKM(A, B) {
    const R = 6371;
    let aLat = parseFloat(A.location.latitude);
    let aLon = parseFloat(A.location.longitude);
    let bLat = parseFloat(B.location.latitude);
    let bLon = parseFloat(B.location.longitude);

    var dLat = 2 * R * Math.sin(deg2rad(aLat - bLat) / 2);
    var dLon = 2 * R * Math.sin(deg2rad(aLon - bLon) / 2);
    var dist = Math.sqrt(dLat ** 2 + dLon ** 2);

    return dist;
  }
    
  
  return await fetch(`https://mascotass.herokuapp.com/api/mascotas/${user._id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.ok) {
        
        return res.mascotas.map((mascota) => {
          let dist = distKM(mascota, user)
          if(dist < 1) dist = dist * 1000;       
          
          

          return {...mascota, dist: dist}
        })
        
      }
      else return false;
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
  getMascotas,
  getMyPets,
};