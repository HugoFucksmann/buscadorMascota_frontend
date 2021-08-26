import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "../firebaseConfig";

export async function getMyChats() {
  let result = [];
  let storageChats = await AsyncStorage.getItem("chats");

  if (storageChats) {
    storageChats = JSON.parse(storageChats);
    for (let i = 0; i < storageChats.length; i++) {
      //obtener ultimo msj del chat

      let chatsRef = await firebaseConfig().collection(storageChats[i]);
      //await checkFireStoreChats(chatsRef);
      let chats = await chatsRef.orderBy("createdAt", "desc").limit(1).get();

      if (!chats.empty) {
        await chats.forEach((doc) => {
          result = [...result, doc.data()];
        });
      } else delete storageChats[i];
    }
    let newArr = await storageChats.filter(Boolean);
    await AsyncStorage.setItem("chats", JSON.stringify(newArr));
  } else result = false;

  return result;
}

async function checkFireStoreChats(chatsRef) {
  let chat = await chatsRef.orderBy("createdAt", "asc").limit(1).get();
  let expire = false;
  await chat.forEach((doc) => {
    if (expirateChat(doc.data().createdAt)) expire = true;
  });

  if (expire) {
    chatsRef.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        ref.doc(doc.id).delete();
      });
    });
  }
}

function expirateChat(createdAt) {
  let date = new Date(createdAt.seconds * 1000).getDate();
  let hoy = new Date().getDate();

  if (hoy - date >= 1) return true;
  else return false;
}
