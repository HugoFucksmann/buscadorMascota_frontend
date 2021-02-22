
import * as Google from "expo-google-app-auth";
import { GOOGLE_ANDROID, GOOGLE_IOS, PROD_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "./notificationConfig";

export async function googleLogin() {
  
  try {
    const { type, idToken } = await Google.logInAsync({
      androidClientId: GOOGLE_ANDROID,
      iosClientId: GOOGLE_IOS,
    }).catch((err) => console.log(err));
    if (type === "success") {
      const notificationToken = await registerForPushNotificationsAsync();
     
      let authh = await fetch(`${PROD_URL}/login/google`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: idToken,
          notificationToken: notificationToken,
        }),
      })
        .then((res) => res.json())
        .then(async ({ token, usuario }) => {
         
          await AsyncStorage.setItem("user", JSON.stringify(usuario));
          await AsyncStorage.setItem("token", JSON.stringify(token));
          return true;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
              
        return authh
    }
  } catch (e) {
    console.log(e);
  }
}

export async function isAuthenticated(user) {
  
  if (user && JSON.parse(user).google) {
    let id = JSON.parse(user)._id;
    
    let authh = await fetch(`${PROD_URL}/login/renew`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
       
        if(!res.ok) return false
        await AsyncStorage.setItem("token", res.token);
        
        return true;
      })
      .catch((e) => {
        console.log("err 4 ", e);
        return false;
      });

    return authh;
  }

  return false;
}

export async function usuarioRandom() {
  const notificationToken = await registerForPushNotificationsAsync();
  const user = {
    name: `usuario: ${Math.random() * 100}`, //todo: ver round y metodo
    password: "@@@",
    img: "",
    google: false,
    notification: notificationToken,
  };
  const userDB = await fetch(`${PROD_URL}/usuarios`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
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