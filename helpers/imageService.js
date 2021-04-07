

export function mostrarFoto(img){

   if (!img) {
     return `https://mascotass.herokuapp.com/api/upload/imgMascota/no-image`;
   } else if (img.includes("https")) {
     return img;
   } else if (img) {
     return `https://mascotass.herokuapp.com/api/upload/imgMascota/${img}`;
   } else {
     return `https://mascotass.herokuapp.com/api/upload/noticias/no-image`;
   }
}