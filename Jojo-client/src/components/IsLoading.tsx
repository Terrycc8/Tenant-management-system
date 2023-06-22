import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import { memo } from "react";

export const IsLoading = memo(() => {
  return (
    <IonItem>
      <IonLabel>Default</IonLabel>
      <IonSpinner></IonSpinner>
    </IonItem>
  );
});
