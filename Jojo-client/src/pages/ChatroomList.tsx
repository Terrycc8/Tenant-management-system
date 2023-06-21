import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonLabel,
  IonSearchbar,
  IonModal,
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
// import { createNewRoom, getRoomList, GetRoomListOutput } from "../sdk";
// import ExploreContainer from "../components/ExploreContainer";
import { routes } from "../routes";
import { contactList } from "../contactData";
import { checkmarkDone, createOutline } from "ionicons/icons";
// import './Chats.css';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatError } from "../useHook/use-toast";
import { useRef } from "react";
// import {RedirectUponLogin} from '../components/LoginRedirectGuard';
import { useSelector } from "react-redux";
import { useChatroomList } from "../api/chatroomAPI";
import { RootState } from "../RTKstore";
// import { CommonHeaderMemo } from "../components/CommonHeader";
import { ContactModal } from "../components/ContactModal";
// import { useParams } from "react-router";
import { ChatroomListOutput, ChatRecord, existingRecord } from "../types";
import { useGetChatroomQuery } from "../api/chatroomAPI";
import { useQuery } from "@tanstack/react-query";
import serverURL from "../ServerDomain";

type Props = { token: string | null };

type ChatroomInfo = {
  room_id: number;
  otherUser: string;
  senderName: string;
  content: string;
};

export function ChatroomList() {
  const token = useSelector((state: RootState) => state.auth.token);
  // const { data, isFetching, isLoading, error } = useChatroomList(token);
  // useChatroomList(token);
  // const {
  //   data,
  //   isFetching,
  //   isLoading,
  //   error: fetchError,
  //   isError,
  // } = useGetChatroomQuery({});

  // method:"POST",
  // headers:{
  //     "Content-Type":'application/json',
  //     "Authorization":`Bearer ${localStorage.getItem('token')}`
  // },
  // body: JSON.stringify({title, description})

  // const token = useSelector((state: RootState) => state.auth.token);

  let { data, isFetching, isLoading, error, isError } = useQuery({
    queryKey: ["/chat/rooms"], // todo does mean link, just reference
    retry: false,
    queryFn: async () => {
      const res = await fetch(serverURL + "/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      console.log("result", result);
      console.log("result", result.data);
      console.log("result", result.data[0].otherUser);
      return result.data;
    },
  });

  const [result, setResults] = useState<ChatroomInfo[]>([]);
  useEffect(() => {
    console.log("change data");
    setResults(data);
  }, [data]);

  function search(e: CustomEvent, data: ChatroomInfo[]) {
    console.log("in search", data);

    const searchTerm = e.detail.value;
    if (searchTerm === "") {
      setResults(data);
      return;
    }
    const otherUsers: string[] = [];
    for (let i = 0; i < result.length; i++) {
      console.log("latest", result);
      const otherUser = result[i].otherUser;
      console.log(otherUser);
      console.log("get", otherUser);
      if (!otherUsers.includes(otherUser)) {
        otherUsers.push(otherUser);
      }
    }

    if (searchTerm !== "") {
      const searchTermLower = searchTerm.toLowerCase();
      console.log(searchTermLower);
      const newResults = result.filter((chat: any) =>
        chat.otherUser.includes(searchTermLower)
      );
      console.log("newResults", newResults);
      setResults(newResults);
    }
  }

  // const error = fetchError || data?.error;
  const modalTrigger = "open-contact-modal";
  // console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start" size="large">
            Chatroom list
          </IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            className="ion-margin-end"
            id={modalTrigger}
          >
            <IonIcon size="large" icon={createOutline} />
            <ContactModal trigger={modalTrigger} />
          </IonButton>
        </IonToolbar>
        <IonSearchbar onIonChange={(e) => search(e, data)} />
      </IonHeader>
      {/* <IonContent>{result}</IonContent> */}
      <IonContent>
        {isError ? (
          <>error: {String(error)}</>
        ) : isLoading ? (
          <>loading</>
        ) : isFetching ? (
          <>Fetching</>
        ) : !result ? (
          <>no data??</>
        ) : // ) : data ? (
        //   <>no exisiting chatroom</>
        result.length == 0 ? (
          <>no chatroom yet</>
        ) : result.length > 0 ? (
          result.map((record: existingRecord) => (
            <IonCard
              key={record.room_id}
              routerLink={routes.chatroom(record.room_id)}
            >
              {/* <img src="" alt="" /> */}
              <IonCardHeader>
                <IonCardTitle>{record.otherUser}</IonCardTitle>
                {/* IonItem */}
                {/* <IonCardSubtitle>{chatroom.rent}</IonCardSubtitle> */}
                <IonCardContent>
                  {record.senderName + " : " + record.content}
                </IonCardContent>
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
