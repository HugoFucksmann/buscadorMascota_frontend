// @refresh reset
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebaseConfig from "../firebaseConfig";
import { sendPushNotification } from "../helpers/notificationConfig";

export default function Chat({ mascotaId, usuario }) {
  
  const chatsRef = firebaseConfig().collection(mascotaId);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      appendMessages(messagesFirestore);
      
    });

    return () => unsubscribe()
  }, []);

  
  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function handleSend(messagess) {
    const writes = messagess.map((m) => chatsRef.add(m));

    await Promise.all(writes).then(() =>
      sendPushNotification(
        usuario.notification,
        "enviaron un mensaje por tu perrito!!",
        messagess[0].text
      )
    );
  }
  
  return (
    <SafeAreaView>
      <GiftedChat messages={messages} user={usuario} onSend={handleSend} />;
    </SafeAreaView>
  );
  
}
