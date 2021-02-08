const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { sendPushNotification } = require("./notificationConfig");

  
async function actualizarArchivo(file, perroId, token) {
  try {
    let localUri = file.uri;
    let filename = localUri.split("/").pop();

    
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const url = `http://192.168.0.104:3011/api/upload/imgMascota/${perroId}`;
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
      return alert(data.msg);
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function crearMascota(perro, token) {
  const user = await AsyncStorage.getItem("user");
  const notification = JSON.parse(user).notification
  const data = {
    perro,
    notification
  };
  const perroId = await fetch("http://192.168.0.104:3011/api/mascotas", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: token
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (!res.ok) return false;
      return res.mascota._id;
    })
    .catch((e) => console.log(e));
    
  if(!perroId) return '';

  return perroId;
    
}





module.exports = {
  actualizarArchivo,
  crearMascota,
};