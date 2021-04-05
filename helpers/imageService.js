import { PROD_URL } from "@env";

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