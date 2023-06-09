import {
  IonModal,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonInput,
  IonList,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";


export function EventsModal() {
  const eventsModal = useRef<HTMLIonModalElement>(null);
  const dismissEvents = useCallback(()=>{eventsModal.current?.dismiss()},[])

  return (
    <IonModal
      ref={eventsModal}
      trigger="open-events-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onWillDismiss={dismissEvents}
    >
      <IonToolbar>
        <IonLabel slot="start">Events</IonLabel>
        <IonButtons slot="end">
          <IonButton onClick={dismissEvents}>
            <IonIcon icon={closeOutline}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <IonLabel position="stacked">Enter your name</IonLabel>
        <IonInput type="text" placeholder="Your name" />
      </IonContent>
    </IonModal>
  );
}
