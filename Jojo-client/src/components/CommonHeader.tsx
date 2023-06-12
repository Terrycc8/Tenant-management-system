import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { memo } from "react";

export const CommonHeaderMemo = memo(function CommonHeader() {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
          </IonButton>

          <IonButton>
            <IonIcon
              slot="icon-only"
              icon={personCircle}
              size="large"
            ></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
});
