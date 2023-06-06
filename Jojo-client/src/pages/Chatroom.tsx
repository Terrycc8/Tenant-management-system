import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");
interface Message {
  body: string;
  from: string;
}

export default function App() {
const [messages, setMessages] = useState<Message[]>([]);
const [message, setMessage] = useState<string>("");

useEffect(() => {
  const receiveMessage = (message: Message) => {
    setMessages([message, ...messages]);
  };

  socket.on("message", receiveMessage);

  return () => {
    socket.off("message", receiveMessage);
  };
}, [messages]);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const newMessage = {
    body: message,
    from: "Me",
  };
  setMessages([newMessage, ...messages]);
  setMessage("");
  socket.emit("message", newMessage.body);
};
}