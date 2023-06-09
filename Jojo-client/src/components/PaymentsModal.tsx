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
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { onPropertyDismiss } from "../slices/propertyModalSlice";
import { onEventsDismiss } from "../slices/eventsModalSlice";
import { onPaymentsDismiss } from "../slices/paymentModalSlice";

export function PaymentsModal() {
  const dispatch = useDispatch();
  const isPaymentsShow = useSelector(
    (state: RootState) => state.paymentsModal.isShow
  );
  const dismissPayments = useCallback(() => {
    dispatch(onPaymentsDismiss());
  }, []);
  return (
    <IonModal
      isOpen={isPaymentsShow}
      trigger="open-modal"
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
