import { PROD_URL } from "@env";
  
async function actualizarArchivo(file, perroId, token) {
  try {
    let localUri = file.uri;
    let filename = localUri.split("/").pop();

    
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const url = `${PROD_URL}/upload/imgMascota/${perroId}`;
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
    }).catch((e) => console.log(e));

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

async function getMascotas(){
  return await fetch(`${PROD_URL}/mascotas`)
    .then((response) => response.json())
    .then(({ mascotas }) => mascotas.reverse())
    .catch((error) => console.error(error));
}

async function crearMascota(perro, token, notification) {
 
  const perroId = await fetch(`${PROD_URL}/mascotas`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({perro, notification}),
  })
    .then((res) => res.json())
    .then((res) => res.mascota._id)
    .catch((e) => console.log(e));
    
 
  if(!perroId) return false;

  return perroId;

    
}





module.exports = {
  actualizarArchivo,
  crearMascota,
  getMascotas
};