import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "../firebaseConfig";

export async function getMyChats(){
    let result = [];
    let storageChats = await AsyncStorage.getItem('chats')
    console.log("storageChats1 ", storageChats);
    if (storageChats){
      storageChats = JSON.parse(storageChats);
      for (let i = 0; i < storageChats.length; i++) {
       
        let chatsRef = await firebaseConfig().collection(storageChats[i]);          
        let chats = await chatsRef.orderBy("createdAt", "desc").limit(1).get();
        
        if(!chats.empty) {
          await chats.forEach((doc) => {
            result = [...result, doc.data()];
          });
        }
        else {
          //storageChats.splice(i, 1); 
          delete storageChats[i]
        }
         
      }
      let newArr = await storageChats.filter(Boolean);
      await AsyncStorage.setItem("chats", JSON.stringify(newArr));

    }else result = false

    
    return result;
}
