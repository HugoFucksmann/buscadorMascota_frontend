// @refresh reset
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebaseConfig from "../firebaseConfig";
import { PROD_URL } from "@env";
import { toogleMascotaContext } from "../context/toogleContext";

export default function Chat() {
  const { usuario, mascota , handlerFeed } = useContext(toogleMascotaContext);
  const chatsRef = firebaseConfig().collection( mascota._id);
  const [messages, setMessages] = useState([]);
  const chatUser = {
    name: usuario.name,
    _id: usuario._id,
    img: usuario.img,
    notification: usuario.notification,
    petName:  mascota.petName,
    petPicture:  mascota.petPicture,
    petId:  mascota._id
  };
  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      appendMessages(messagesFirestore);
    });
    return () => {unsubscribe(); backHandler.remove()};
  }, []);
  
  const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
   
    handlerFeed({}, "tarjetas");
    return true;
  });

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );
    
  async function handleSend(messagess) {
    await messagess.map((m) => chatsRef.add(m));
    let chatTokens =[];
    const uIdMascota =  mascota.usuario
    const chats = await chatsRef.get()
    chats.forEach((doc) => {
      chatTokens = [...chatTokens, doc.data().user.notification];
    });
    await fetch(`${PROD_URL}/chat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatTokens, uIdMascota }),
    }).catch((e) => console.log(e));



    let userChat = await AsyncStorage.getItem("chats");
  
    if(userChat){
      userChat = JSON.parse(userChat);
      userChat = [...userChat,  mascota._id ];
      userChat = userChat.filter((chat, index) => {
        return userChat.indexOf(chat) === index;
      });
      await AsyncStorage.setItem("chats", JSON.stringify(userChat));
    }else{
      userChat = [ mascota._id];
      await AsyncStorage.setItem("chats", JSON.stringify(userChat));
    }
    
  }

  return (
   
        <GiftedChat
      placeholder="escribe aqui..."
      renderUsernameOnMessage
      isLoadingEarlier
      renderAvatar={null}
      messages={messages}
      user={chatUser}
      onSend={handleSend}
      scrollToBottom={true}
    />
  
  );
}
