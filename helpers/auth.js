import * as Google from "expo-google-app-auth";
import { GOOGLE_ANDROID, GOOGLE_IOS, PROD_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "./notificationConfig";
import { myLocation2 } from "./getLocation";

export async function googleLogin(user) {
 
  try {
    const { type, idToken } = await Google.logInAsync({
      androidClientId:
        "548192272734-2a7sfnf2m8vdkqdlt478jqet3q53hh2p.apps.googleusercontent.com", //Auth2 buscan
      androidStandaloneAppClientId:
        "548192272734-g31apkn3i99591l8nhqr992e9ovgiiov.apps.googleusercontent.com", //Auth2 BuscanProduction
      iosClientId:
        "548192272734-u25bqjc1kc6jd3oq4pn0vm7oo1k3ber1.apps.googleusercontent.com", //Auth2 mascotassIOS
      clientId:
        "548192272734-ocb924v8112pvm8400110nfrmicfg1ib.apps.googleusercontent.com", //Auth2 buscanWeb
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
        .then(async ({ token, usuario }) => {
          await AsyncStorage.setItem("token", JSON.stringify(token));
          return usuario;
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

export async function usuarioRandom() {
  const notificationToken = await registerForPushNotificationsAsync();
  //const ubi = await myLocation2();
  const userDB = await fetch(`https://mascotass.herokuapp.com/api/usuarios`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notificationToken,
    }),
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (!res.ok) return false;
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      return res.user;
    })
    .catch((e) => {
      console.log("err ", e);
      return false;
    });

  return userDB;
}

export async function actualizarLocation(user) {
  const ubi = await myLocation2();

  const userDB = await fetch(
    `https://mascotass.herokuapp.com/api/usuarios/location`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ubi,
        user,
      }),
    }
  )
    .then((res) => res.json())
    .then(async (res) => {
      if (!res.ok) return {};
      await AsyncStorage.setItem("user", JSON.stringify(res.usuario));
      return res.usuario;
    })
    .catch((e) => {
      console.log("err ", e);
      return {};
    });

  return userDB;
}
