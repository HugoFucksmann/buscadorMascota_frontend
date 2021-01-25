
import * as Google from "expo-google-app-auth";
import { GOOGLE_ANDROID, GOOGLE_IOS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function googleLogin() {
  try {
    const { type, idToken } = await Google.logInAsync({
      androidClientId: GOOGLE_ANDROID,
      iosClientId: GOOGLE_IOS,
    }).catch((err) => console.log(err));
    if (type === "success") {
      let authh = await fetch("http://192.168.0.104:3011/api/login/google", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: idToken,
        }),
      })
        .then((res) => res.json())
        .then(async ({ token, usuario }) => {
          await AsyncStorage.setItem("user", JSON.stringify(usuario));
          return true
        })
        .catch((e) => {console.log(e); return false});
              
        return authh
    }
  } catch (e) {
    console.log(e);
  }
}

export async function isAuthenticated() {
  let user = await AsyncStorage.getItem("user");
  if (user && JSON.parse(user).google) {
    
    let id = JSON.parse(user)._id;
    
    let authh = await fetch("http://192.168.0.104:3011/api/login/renew", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then( res => res.json())
    .then(async res => {
      await AsyncStorage.setItem('token', res.token);
      return true
    })
    .catch(e => {console.log('err ', e); return false});

     return authh;
  }
  
  return false;
}