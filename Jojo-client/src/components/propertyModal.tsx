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

export function PropertyModal() {
  const dispatch = useDispatch();
  const isPropertyShow = useSelector(
    (state: RootState) => state.propertyModal.isShow
  );
  const dismissProperty = useCallback(() => {
    dispatch(onPropertyDismiss());
  }, []);
  return (
    <IonModal
      isOpen={isPropertyShow}
      trigger="open-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onWillDismiss={dismissProperty}
    >
      <IonToolbar>
        <IonLabel slot="start">Property</IonLabel>
        <IonButtons slot="end">
          <IonButton onClick={dismissProperty}>
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
