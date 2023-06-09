import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useRef, useState } from "react";
import { onDismiss } from "../slices/createModalSlice";
import { RootState } from "../RTKstore";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeOutline, shapesOutline } from "ionicons/icons";
import {
  onPropertyDismiss,
  onPropertyPresent,
} from "../slices/propertyModalSlice";
import { onEventsDismiss, onEventsPresent } from "../slices/eventsModalSlice";
import {
  onPaymentsDismiss,
  onPaymentsPresent,
} from "../slices/paymentModalSlice";
import { PropertyModal } from "./PropertyModal";
import { EventsModal } from "./EventsModal";
import { PaymentsModal } from "./PaymentsModal";
import { CreateModal } from "./CreateModal";

export function CustomModal() {
  return (
<<<<<<< HEAD
    <>
      <CreateModal />
      <PropertyModal />
      <EventsModal />
      <PaymentsModal />
    </>
=======
    <IonModal
      isOpen={isShow}
      trigger="open-modal"
      initialBreakpoint={0.38}
      breakpoints={[0, 0.38]}
      onWillDismiss={dismissOnClick}
      ref={modal}
    >
      <IonContent>
        <IonToolbar>
          <IonLabel slot="start">Create</IonLabel>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonList>
          <IonItem button={true} detail={false} onClick={dismiss}>
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel>Create new property</IonLabel>
          </IonItem>

          <IonItem button={true} detail={false} onClick={dismiss}>
            Create new complaint
          </IonItem>
          <IonItem button={true} detail={false} onClick={dismiss}>
            Create new payment
          </IonItem>
          <IonItem button={true} detail={false} onClick={dismiss}>
            Create Chat
          </IonItem>

        </IonList>
      </IonContent>
    </IonModal>
>>>>>>> 4e6743539406df91b406b7b2f9d0b39e79788e1a
  );
}
