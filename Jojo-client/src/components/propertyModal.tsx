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
import { useCallback, useRef } from "react";
import { onDismiss } from "../slices/createModalSlice";
import { RootState } from "../RTKstore";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeOutline, shapesOutline } from "ionicons/icons";

export function CustomModal() {
  const dispatch = useDispatch();
  const dismissOnClick = useCallback(() => {
    dispatch(onDismiss());
  }, []);
  const isShow = useSelector((state: RootState) => {
    return state.createModal.isShow;
  });
  const modal = useRef<HTMLIonModalElement>(null);
  const dismiss = useCallback(() => {
    modal.current?.dismiss();
  }, []);
  return (
    <IonModal
      isOpen={isShow}
      trigger="open-modal"
      initialBreakpoint={0.38}
      breakpoints={[0, 0.38]}
      onWillDismiss={dismiss}
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
        </IonList>
      </IonContent>
    </IonModal>
  );
}
