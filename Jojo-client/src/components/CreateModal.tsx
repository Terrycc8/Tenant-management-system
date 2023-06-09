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
} from "@ionic/react";
import { closeOutline, shapesOutline } from "ionicons/icons";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { onDismiss } from "../slices/createModalSlice";
import { onEventsPresent } from "../slices/eventsModalSlice";
import { onPaymentsPresent } from "../slices/paymentModalSlice";
import { onPropertyPresent } from "../slices/propertyModalSlice";

export function CreateModal() {
  const dispatch = useDispatch();
  const dismissOnClick = useCallback(() => {
    dispatch(onDismiss());
  }, []);

  const isShow = useSelector((state: RootState) => {
    return state.createModal.isShow;
  });

  const showProperty = useCallback(() => {
    dispatch(onPropertyPresent());
  }, []);
  const showEvents = useCallback(() => {
    dispatch(onEventsPresent());
  }, []);
  const showPayments = useCallback(() => {
    dispatch(onPaymentsPresent());
  }, []);
  return (
    <IonModal
      isOpen={isShow}
      trigger="open-modal"
      initialBreakpoint={0.38}
      breakpoints={[0, 0.38]}
      onWillDismiss={dismissOnClick}
    >
      <IonContent>
        <IonToolbar>
          <IonLabel slot="start">Create</IonLabel>
          <IonButtons slot="end">
            <IonButton onClick={dismissOnClick}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonList>
          <IonItem button={true} detail={false} onClick={dismissOnClick}>
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel onClick={showProperty}>Create new property</IonLabel>
          </IonItem>

          <IonItem button={true} detail={false} onClick={dismissOnClick}>
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel onClick={showEvents}>Create new events</IonLabel>
          </IonItem>
          <IonItem button={true} detail={false} onClick={dismissOnClick}>
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel onClick={showPayments}>Create new payment</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
