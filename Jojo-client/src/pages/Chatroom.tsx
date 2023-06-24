import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { useCallback, useState, useEffect, useRef } from "react";
import { routes } from "../routes";
import { addOutline, send } from "ionicons/icons";
import "./Chatroom.css";
import { useSocket } from "../useHook/use-socket";
import { useValue } from "../useHook/use-value";
import { useParams } from "react-router";
import { chatService } from "../api";
import serverURL from "../ServerDomain";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
// import { Message } from "../../../Jojo-server/dist/src/proxy";
import { showResponseMessageSignUp } from "../helper";
import { format_long_short_time } from "@beenotung/tslib/format";
type Message = {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
  sender_first_name: string;
};

export function ChatroomPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selfId, setSelfId] = useState<number | null>(null);
  // const [chatRecords, setchatRecords] = useState<chatRecords[]>([]);

  const roomNames = useRef<{ self: string; other: string }>();
  const token = useSelector((state: RootState) => state.auth.token);
  const handleNewMessage = useCallback((event: Message) => {
    console.log("new message from ws:", event);
    setMessages((msg) => {
      console.log("msg", msg);
      console.log("e", event);
      // const newID = msg[msg.length - 1].id + 1 || 0;

      // const newEvent = { ...event, id: newID };
      return [...msg, event];
      // setMessages([]);
    });
  }, []);

  useSocket((socket) => {
    socket.on("new-message", handleNewMessage);
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  });

  async function getMessageList() {
    console.log({ id });

    const res = await fetch(`${serverURL}/chat/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.error) {
      return;
    }
    console.log("message list:", result);
    const { userID, roomMemberName, message } = result;

    setMessages(message);
    setSelfId(userID);
    roomNames.current = {
      self: roomMemberName[0].first_name,
      other: roomMemberName[1].first_name,
    };
  }

  useEffect(() => {
    token && getMessageList();
  }, [token]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={routes.chatlist} />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="main-chat-content">
        {messages.length > 0 &&
          messages.map((message) => (
            <IonItem key={message.id}>
              <IonLabel slot={message.sender_id !== selfId ? "start" : "end"}>
                {message.sender_first_name} : {message.content}
                <IonLabel>
                  {" "}
                  {format_long_short_time(
                    new Date(message.created_at).getTime(),
                    { format_duration_digit: 0 }
                  )}
                </IonLabel>
              </IonLabel>
            </IonItem>
          ))}
      </IonContent>

      <Footer
        newID={messages.length !== 0 ? messages[messages.length - 1].id + 1 : 0}
        senderName={roomNames.current?.self || ""}
      />
    </IonPage>
  );
}

function Footer(props: { newID: number; senderName: string }) {
  const { newID, senderName } = props;
  const params = useParams<{ id: string }>();
  const room_id = params.id;
  const input = useValue("");
  const token = useSelector((state: RootState) => state.auth.token);

  function addAttachment() {}

  function submitNewMessage() {
    if (input.value === "") {
      return;
    }
    // chatService.sendMessage(room_id, input.value);
    // if (message !== "") {
    // }
    fetch(`${serverURL}/chat/rooms/${room_id}/message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: newID, message: input.value, senderName }),
    });

    input.clear();
  }

  return (
    <IonFooter className="chat-footer" id="chat-footer">
      <IonItem>
        <IonButtons slot="start">
          <IonButton onClick={addAttachment}>
            <IonIcon icon={addOutline}> </IonIcon>
          </IonButton>
        </IonButtons>
        <IonTextarea
          value={input.value}
          placeholder="New message..."
          onIonInput={input.onIonChange}
        />
        <IonButtons slot="end">
          <IonButton onClick={submitNewMessage}>
            <IonIcon icon={send}> </IonIcon>
          </IonButton>
        </IonButtons>
      </IonItem>
    </IonFooter>
  );
}

/* export function ChatroomPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleNewMessage = useCallback(
    (event: { id: number; message: string }) => {
      console.log("new message from ws:", event);
      setMessages((msg) => {
        console.log("msg", msg);
        console.log("e", event);
        return [...msg, event];
        // setMessages([]);
      });
    },
    []
  );

  useSocket((socket) => {
    socket.on("new-message", handleNewMessage);
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  });

  async function getMessageList() {
    console.log({ id });

    const res = await fetch(`${serverURL}/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    console.log("message list:", { result });

    // setMessages(result);
  }

  useEffect(() => {
    token && getMessageList();
  }, [token]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={routes.chatlist} />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="main-chat-content">
        {messages.length > 0 &&
          messages.map((message) => (
            <IonCard key={message.id}>{message.message}</IonCard>
          ))}
      </IonContent>

      <Footer />
    </IonPage>
  );
}

function Footer() {
  const params = useParams<{ id: string }>();
  const room_id = params.id;
  const input = useValue("");
  const token = useSelector((state: RootState) => state.auth.token);

  function addAttachment() {}

  function submitNewMessage() {
    // chatService.sendMessage(room_id, input.value);
    // if (message !== "") {
    // }
    fetch(`${serverURL}/chat/rooms/${room_id}/message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input.value }),
    });

    input.clear();
  }

  return (
    <IonFooter className="chat-footer" id="chat-footer">
      <IonItem>
        <IonButtons slot="start">
          <IonButton onClick={addAttachment}>
            <IonIcon icon={addOutline}> </IonIcon>
          </IonButton>
        </IonButtons>
        <IonTextarea
          value={input.value}
          placeholder="New message..."
          onIonInput={input.onIonChange}
        />
        <IonButtons slot="end">
          <IonButton onClick={submitNewMessage}>
            <IonIcon icon={send}> </IonIcon>
          </IonButton>
        </IonButtons>
      </IonItem>
    </IonFooter>
  );
} */
