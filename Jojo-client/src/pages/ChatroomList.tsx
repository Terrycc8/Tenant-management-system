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
import ExploreContainer from "../components/ExploreContainer";
import { routes } from "../routes";
import { contactList } from "../contactData";
import { checkmarkDone, createOutline } from "ionicons/icons";
// import './Chats.css';
import { useEffect, useState } from "react";
import { formatError } from "../useHook/use-toast";
import { useRef } from "react";
// import {RedirectUponLogin} from '../components/LoginRedirectGuard';
import { useSelector } from "react-redux";
import { useChatroomList } from "../api/chatroomAPI";
import { RootState } from "../RTKstore";
import { CommonHeaderMemo } from "../components/CommonHeader";
import { ContactModal } from "../components/ContactModal";
// import { useParams } from "react-router";

type Props = { token: string | null };

export function ChatroomList() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isFetching, isLoading, error } = useChatroomList(token);

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
            id="open-contact-modal"
          >
            <IonIcon size="large" icon={createOutline} />
            <ContactModal /> 
          </IonButton>
        </IonToolbar>
        <IonSearchbar onIonChange={ e => search(e) } />
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
              routerLink={routes.chat + "/" + chatroom.id}
            >
              <img src="" alt="" />
              <IonCardHeader>
                <IonCardTitle>{chatroom.username}</IonCardTitle>
                {/* <IonCardSubtitle>{chatroom.rent}</IonCardSubtitle> */}
              </IonCardHeader>

              <IonCardContent>{1}</IonCardContent>
            </IonCard>
          ))
        ) : (
          <>invalid data: {JSON.stringify(data)}</>
        )}
      </IonContent>
    </IonPage>
  );
}
