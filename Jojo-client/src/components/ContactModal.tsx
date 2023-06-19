import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonCard,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/react";
import { useCallback, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { closeOutline } from "ionicons/icons";
import { UserListOutput } from "../types";
import { routes } from "../routes";
import serverURL from "../ServerDomain";

export function ContactModal(props: { trigger: string }) {
  const contactModal = useRef<HTMLIonModalElement>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  const [data, setData] = useState([]);

  const dismissContact = useCallback(() => {
    contactModal.current?.dismiss();
  }, [contactModal]);

  async function getUserList() {
    const res = await fetch(`${serverURL}/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    console.log(result);

    setData(result);
  }

  useEffect(() => {
    token && getUserList();
  }, [token]);

  return (
    <IonModal
      ref={contactModal}
      trigger={props.trigger}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onWillDismiss={dismissContact}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Contact</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={dismissContact}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {data.length == 0 ? (
          <>no contact yet, please add contact</>
        ) : (
          data.map((user: UserListOutput) => (
            <IonCard key={user.id} routerLink={routes.chatroom(user.id)}>
              <IonCardHeader>
                <IonCardTitle>
                  {user.avatar + user.first_name + " " + user.last_name}
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonModal>
  );
}
