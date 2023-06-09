import {
  IonModal,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonInput,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";


export function PaymentsModal() {
  const paymentsModal = useRef<HTMLIonModalElement>(null);
  const dismissPayments = useCallback(()=>{paymentsModal.current?.dismiss()},[])
  return (
    <IonModal
      ref={paymentsModal}
      trigger="open-payments-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onWillDismiss={dismissPayments}
    >
      <IonToolbar>
        <IonLabel slot="start">Payments</IonLabel>
        <IonButtons slot="end">
          <IonButton onClick={dismissPayments}>
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
