import { BASE_URL, PROD_URL } from "@env";
export async function uploadFoto(uri) {

  let localUri = uri;
  let filename = localUri.split("/").pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  let formData = new FormData();
  formData.append("foto", { uri: localUri, name: filename, type });

  return await fetch(YOUR_SERVER_URL, {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  })
  .catch(e => console.log(e));
}

export function mostrarFoto(img){

   if (!img) {
     return `${PROD_URL}/upload/imgMascota/no-image`;
   } else if (img.includes("https")) {
     return img;
   } else if (img) {
     return `${PROD_URL}/upload/imgMascota/${img}`;
   } else {
     return `${PROD_URL}/upload/noticias/no-image`;
   }
}