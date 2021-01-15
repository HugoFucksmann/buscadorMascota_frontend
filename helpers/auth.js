
import * as Google from "expo-google-app-auth";
import { GOOGLE_ANDROID, GOOGLE_IOS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Auth {
  constructor() {
    this.authenticated = false;
  }
  /*   async token(){
   try {
     const value = await AsyncStorage.getItem("token");
     if (value !== null && value.length === 174) {
       // We have data!!
       this.authenticated = true
     }else{
       return this.authenticated = false
     }
   } catch (error) {
     console.log(error);
   }
 };  */

  async googleLogin() {
    try {
      const { type, idToken } = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID,
        iosClientId: GOOGLE_IOS,
      }).catch((err) => console.log(err));
      if (type === "success") {
        await fetch("http://192.168.0.102:3011/api/login/google", {
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
            await AsyncStorage.setItem("token", token);
            this.authenticated = true
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async isAuthenticated() {
    await AsyncStorage.getItem("token")
      .then((token) => {
        if (token !== null && token.length === 172) {
          // We have data!!
            console.log('aa', token);
          this.authenticated = true;
        } else {
          console.log('bb', token);
          this.authenticated = false;
        }
      })
      .catch((e) => console.log(e));
      return this.authenticated;
  }
}




export default new Auth();