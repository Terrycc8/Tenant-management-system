import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { routes } from "../routes";
import { createOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { useChatroomList } from "../api/chatroomAPI";
import { RootState } from "../RTKstore";
import { ContactModal } from "../components/ContactModalStateVersion";
import { useState } from "react";

export function ChatroomList() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isFetching, isLoading, error } = useChatroomList(token);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
              onClick={() => setIsOpen(true)}
            >
              <IonIcon size="large" icon={createOutline} />
            </IonButton>
          </IonToolbar>
          {/* <IonSearchbar onIonChange={(e) => search(e)} /> */}
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
                routerLink={routes.chatroom(chatroom.id)}
              >
                <IonCardHeader>
                  <IonCardTitle>{chatroom.username}</IonCardTitle>
                  <IonCardContent>{chatroom.last_message}</IonCardContent>
                </IonCardHeader>
              </IonCard>
            ))
          ) : (
            <>invalid data: {JSON.stringify(data)}</>
          )}
        </IonContent>
      </IonPage>
      <ContactModal isOpen={isOpen} dismissContact={() => setIsOpen(false)} />
    </>
  );
}
