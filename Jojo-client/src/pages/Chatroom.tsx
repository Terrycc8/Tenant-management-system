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
} from "@ionic/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAppSelector } from "../../redux/hooks"
import { selectIsLoading, selectRooms } from "../../redux/room/roomSlice"
import { useGetUsersQuery } from "../api/loginMutation";
import { routes } from "../routes";

const socket = io("/");
interface Message {
  body: string;
  from: string;
}

export function ChatroomPage() {
  const {
    data,
    isFetching,
    isLoading,
    error: fetchError,
    isError,
  } = useGetUsersQuery({});
  const error = fetchError || data?.error;

  // const [messages, setMessages] = useState<Message[]>([]);
  // const [message, setMessage] = useState<string>("");

  // useEffect(() => {
  //   const receiveMessage = (message: Message) => {
  //     setMessages([message, ...messages]);
  //   };

  //   socket.on("message", receiveMessage);

  //   return () => {
  //     socket.off("message", receiveMessage);
  //   };
  // }, [messages]);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const newMessage = {
  //     body: message,
  //     from: "Me",
  //   };
  //   setMessages([newMessage, ...messages]);
  //   setMessage("");
  //   socket.emit("message", newMessage.body);


    
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
                <IonBackButton slot="start" text={ (notificationCount > 0) ? notificationCount : "" } />
                <IonTitle>

                    <div className="chat-contact">
                        <img src={ contact.avatar } alt="avatar" />
                        <div className="chat-contact-details">
                            <p>{ contact.name }</p>
                        </div>
                    </div>
                </IonTitle>
            </IonToolbar>
          </IonHeader>
        <IonContent>
            {error ? (
              <>error: {String(error)}</>
            ) : isLoading ? (
              <>loading</>
            ) : isFetching ? (
              <>Fetching</>
            ) : !data ? (
              <>no data??</>
            ) : data.rooms.length == 0 ? (
              <>no chatroom yet</>
            ) : data.rooms.length > 0 ? (
              data.rooms.map((chatroom) => (
                <IonCard
                  key={chatroom.id}
                  routerLink={routes.chat + "/" 
                  + chatroom.id
                }
                >
                  {/* <img src="" alt="" /> */}
                  <IonCardHeader>
                    <IonCardTitle>{chatroom.username}</IonCardTitle>
                    {/* IonItem */}
                    {/* <IonCardSubtitle>{chatroom.rent}</IonCardSubtitle> */}
                    <IonCardContent>{chatroom.last_message}</IonCardContent>
                  </IonCardHeader>

                  {/* <IonCardContent>{chatroom.last_message}</IonCardContent> */}
                </IonCard>
              ))
            ) : (
              <>invalid data: {JSON.stringify(data)}</>
            )}
          </IonContent>
        </IonPage>
      );
    }
    
  };
}

