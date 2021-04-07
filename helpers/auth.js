import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "./notificationConfig";
import { myLocation2 } from "./getLocation";

export async function googleLogin(user) {
 
  try {
    /* const { type, idToken } = await Google.logInAsync({
      androidClientId: `${AUTH2_BUSCAN}`,
      androidStandaloneAppClientId: `${AUTH2_BUSCAN_PRODUCTION}`,
      iosClientId: `${AUTH2_MASCOTAS_IOS}`,
      clientId: `${AUTH2_BUSCAN_WEB}`,
    }).catch((err) => console.log(err)); */
    const { type, idToken } = await Google.logInAsync({
      androidClientId: `548192272734-2a7sfnf2m8vdkqdlt478jqet3q53hh2p.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `548192272734-g31apkn3i99591l8nhqr992e9ovgiiov.apps.googleusercontent.com`,
      iosClientId: `548192272734-u25bqjc1kc6jd3oq4pn0vm7oo1k3ber1.apps.googleusercontent.com`,
      clientId: `548192272734-ocb924v8112pvm8400110nfrmicfg1ib.apps.googleusercontent.com`,
    }).catch((err) => console.log(err));

    if (type === "success") {
      let authh = await fetch(
        `https://mascotass.herokuapp.com/api/login/google`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: idToken,
            user,
          }),
        }
      )
        .then((res) => res.json())
        .then(async (res) => {
          if (res.ok) {
            await AsyncStorage.setItem("token", JSON.stringify(res.token));
            return res.usuario;
          } else return false;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
      return authh;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function isAuthenticated(user) {
  let authh = await fetch(`https://mascotass.herokuapp.com/api/login/renew`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user._id,
    }),
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (!res.ok) return false;
      await AsyncStorage.setItem("token", res.token);

      return true;
    })
    .catch((e) => {
      console.log("err 4 ", e);
      return false;
    });

  return authh;
}



export async function usuarioRandom2(){
  const notificationToken = await registerForPushNotificationsAsync();
  
  const id = Math.random().toString().slice(2, 7);
  user = {
    "_id": id,
    "google": false,
    "name": "usuario no registrado",
    "notification": notificationToken,
    "img": ''
  }
  await AsyncStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function actualizarLocation2(user) {
  const ubi = await myLocation2();
  let userLocation = {...user, location: ubi}
  await AsyncStorage.setItem("user", JSON.stringify(userLocation));
  return userLocation;  
}

