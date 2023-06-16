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
import { closeOutline } from "ionicons/icons";
import { UserListOutput } from "../types";
import { routes } from "../routes";
import { useGet } from "../useHook/use-get";

export function ContactModal(props: {
  isOpen: boolean;
  dismissContact: () => void;
}) {
  const { isOpen, dismissContact } = props;

  const got = useGet<{
    contacts: {
      id: number;
      avatar: string;
      first_name: string;
      last_name: string;
      status: string;
    }[];
  }>("/user/contacts");

  return (
    <IonModal
      isOpen={isOpen}
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
        {got.render((data) =>
          data.contacts?.length == 0 ? (
            <p>no contact yet, please add contact</p>
          ) : (
            data.contacts?.map((user: UserListOutput) => (
              <IonCard key={user.id} routerLink={routes.chatroom(user.id)}>
                <IonCardHeader>
                  <IonCardTitle>
                    {user.avatar + user.first_name + " " + user.last_name}
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))
          )
        )}
      </IonContent>
    </IonModal>
  );
}
