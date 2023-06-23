import { IonIcon, IonLabel, IonRow, IonSpinner } from "@ionic/react";
import style from "../theme/loading.module.scss";
export function Loading() {
  return (
    <IonRow className={style.loading}>
      <IonSpinner></IonSpinner>
    </IonRow>
  );
}
