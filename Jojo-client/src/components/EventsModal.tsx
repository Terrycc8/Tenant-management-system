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
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { onPropertyDismiss } from "../slices/propertyModalSlice";
import { onEventsDismiss } from "../slices/eventsModalSlice";

export function EventsModal() {
  const dispatch = useDispatch();
  const dismissEvents = useCallback(() => {
    dispatch(onEventsDismiss());
  }, []);

  const isEventsShow = useSelector(
    (state: RootState) => state.eventsModal.isShow
  );
  return (
    <IonModal
      isOpen={isEventsShow}
      trigger="open-modal"
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
