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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonActionSheet,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
// import { useAppSelector } from "../../redux/hooks";
// import { selectIsLoading, selectRooms } from "../../redux/room/roomSlice"
import { useGetUsersQuery } from "../api/loginMutation";
import { routes } from "../routes";
import {
  addOutline,
  alertOutline,
  callOutline,
  cameraOutline,
  micOutline,
  send,
  shareOutline,
  starOutline,
  trashOutline,
} from "ionicons/icons";
// import { chatroom, MessageOutput } from "../../../Jojo-server/dist/src/types";
import serverURL from "../ServerDomain";
import "./Chatroom.css";

// let socket: any;
const socket = io();
URL, { autoConnect: false };

interface Message {
  author: string;
  message: string;
}

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export function ChatroomPage() {
  const {
    data,
    isFetching,
    isLoading,
    error: fetchError,
    isError,
  } = useGetUsersQuery({});

  const error = fetchError || data?.error;
  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log(messages);
    });
  };

  const sendMessage = async () => {
    console.log("chosenUsername:", chosenUsername);
    console.log("message:", message);
    socket.emit("createdMessage", { message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: chosenUsername, message },
    ]);
    setMessage("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  // const getNotificationCount = (allChats) => {

  //   let notificationCount = 0;

  //   allChats.forEach(chats => {

  //     chats.chats.forEach(chat => {

  //       if (!chat.read) {

  //         notificationCount++;
  //       }
  //     })
  //   });

  //   return notificationCount;
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={routes.chatlist}
              // text={ (notificationCount > 0) ? notificationCount : "" }
            />
          </IonButtons>
          <IonTitle>
            Chat
            <div className="chat-contact">
              <img src={user.avatar} alt="avatar" />
              <div className="chat-contact-details">
                <p>{user.first_name}</p>
              </div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="main-chat-content">
        {/* {isError ? (
              <Redirect to={routes.chat}></Redirect>
            ) : isLoading ? (
              <>loading</>
            ) : isFetching ? (
              <>Fetching</>
            ) : !data ? (
              <>no data??</>
            ) : data.message.length == 0 ? (
              <>no message yet</>
            ) : data.message.length > 0 ? (
              data.message.map((message) => ( */}

        <IonCard
        //   key={chatroom.id}
        //   routerLink={routes.chat + "/"
        //   + chat.id
        // }
        ></IonCard>
        {/* // )} */}

        {messages.map((user, msg, i) => {
          return (
            <div className="w-full py-1 px-2 border-b border-gray-200" key={i}>
              {user.first_name} : {msg.message}
            </div>
          );
        })}
        <IonActionSheet></IonActionSheet>
      </IonContent>

      <IonFooter className="chat-footer" id="chat-footer">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            {/* <IonCol size="1">
              <IonIcon
                icon={addOutline}
                color="primary"
                // onClick={sendMessage}
              /> 
            </IonCol> */}

            <IonItem className="chat-input-container">
              <IonTextarea
                rows="1"
                value={message}
                placeholder="New message..."
                onIonChange={(e) => setMessage(e.target.value)}
              />
            </IonItem>

            <IonCol
              size="1"
              className="chat-send-button"
              onClick={() => {
                sendMessage();
              }}
            >
              <IonIcon icon={send} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>

      {/* )) */}
      {/* ) : (
              <>invalid data: {JSON.stringify(data)}</> */}
      {/* ) */}
    </IonPage>
  );
}
