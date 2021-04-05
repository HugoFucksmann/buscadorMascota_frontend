import * as Location from "expo-location";


export async function myLocation() {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("acceso denegado a localizacion");
        return {}
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = await location.coords;
      
      return {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0052,
        longitudeDelta: 0.0051, 
      };
    } catch (e) {
      console.log(e);
    }

}

export async function myLocation2() {
  try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("acceso denegado a localizacion");
        return {}
      }
      let location = await Location.getCurrentPositionAsync();
      let { latitude, longitude } = await location.coords;
      
      return {
        latitude: latitude,
        longitude: longitude,
      };
    } catch (e) {
      console.log(e);
    }
}

export function getMapLocation(mascoUbi, personUbi){
  
  const latitude = (0.5 * (personUbi.latitude + mascoUbi.latitude));
  const longitude = (0.5 * (personUbi.longitude + mascoUbi.longitude));
  
   return {
     latitude: latitude,
     longitude: longitude,
     latitudeDelta: 0.0547,
     longitudeDelta: 0.0546,
   };
}

export function generateInitialRegion(location){
  return {
    ...location,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
}