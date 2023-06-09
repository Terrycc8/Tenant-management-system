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
    <>
      <CreateModal />
      <PropertyModal />
      <EventsModal />
      <PaymentsModal />
    </>
  );
}
