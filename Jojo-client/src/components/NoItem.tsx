import {
  IonButton,
  IonButtons,
  IonLabel,
  IonRow,
  IonSpinner,
  ReactComponentOrElement,
} from "@ionic/react";
import style from "../theme/loading.module.scss";
export function NoItem(props: { name: string }) {
  return (
    <>
      <IonRow className={style.loading}>
        <IonLabel>You do not have any {props.name} yet.</IonLabel>
      </IonRow>
    </>
  );
}
