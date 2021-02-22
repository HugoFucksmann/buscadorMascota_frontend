import * as Location from "expo-location";


export async function myLocation() {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("acceso denegado a localizacion");
        return;
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

export function myLocation2() {
  try {
    let { status } = Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("acceso denegado a localizacion");
      return;
    }
    const location = Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    if(latitude && longitude){
      return {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0052,
        longitudeDelta: 0.0051,
      };
    }
    
  } catch (e) {
    console.log(e);
  }
}

export function getMapLocation(location){
    
   return {
     latitude: location.latitude[0],
     longitude: location.longitude[0],
     latitudeDelta: 0.0122,
     longitudeDelta: 0.0121,
   };
}

/*
latitudeDelta: 0.0052,
        longitudeDelta: 0.0051,
*/