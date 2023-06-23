import {
  IonHeader,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { memo } from "react";

export const CommonModalHeader = memo(
  (props: { handlerOnDismiss: () => void; name: string }) => {
    return (
      <IonHeader>
        <IonToolbar>
          <IonLabel slot="start">{props.name}</IonLabel>
          <IonButtons slot="end">
            <IonButton onClick={props.handlerOnDismiss}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    );
  }
);
