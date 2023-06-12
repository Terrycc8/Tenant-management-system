import {
  IonModal,
  IonContent,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonHeader,
} from "@ionic/react";
import { closeOutline, shapesOutline } from "ionicons/icons";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";

import { EventsModal } from "./EventsModal";
import { PaymentsModal } from "./PaymentsModal";
import { PropertyModal } from "./PropertyModal";

export function CreateModal() {
  const createModal = useRef<HTMLIonModalElement>(null);
  const dismiss = useCallback(() => {
    createModal.current?.dismiss();
  }, []);
  return (
    <IonModal
      ref={createModal}
      trigger="open-modal"
      initialBreakpoint={0.38}
      breakpoints={[0, 0.38]}
      onWillDismiss={dismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonLabel slot="start">Create</IonLabel>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button={true} detail={false} id="open-property-modal">
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel>Create new property</IonLabel>
            <PropertyModal />
          </IonItem>

          <IonItem button={true} detail={false} id="open-events-modal">
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel>Create new event</IonLabel>
            <EventsModal />
          </IonItem>
          <IonItem button={true} detail={false} id="open-payments-modal">
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel>Create new payment</IonLabel>
            <PaymentsModal />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
