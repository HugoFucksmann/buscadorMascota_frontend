
import * as Google from "expo-google-app-auth";
import { GOOGLE_ANDROID, GOOGLE_IOS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Auth{
  constructor() {
    this.isAutenticated = false
  }
 

  async googleLogin() {
    try {
      const { type, idToken } = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID,
        iosClientId: GOOGLE_IOS,
      }).catch((err) => console.log(err));
      if (type === "success") {
        await fetch("http://192.168.0.104:3011/api/login/google", {
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
            this.isAutenticated = true;
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }

    return this.isAutenticated
  }

  async isAuthenticated() {
   let user = await AsyncStorage.getItem("user");
      if (user && JSON.parse(user).google) {
        
        let id = JSON.parse(user)._id;
        
          await fetch("http://192.168.0.104:3011/api/login/renew", {
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
          this.isAutenticated = true
        })
        .catch(e => console.log('err ', e));
      }
      
      return this.isAutenticated
  }

}


export default new Auth();