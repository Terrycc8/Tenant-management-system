import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { routes } from "../routes";
import style from "../theme/error.module.scss";
export function ErrorPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={style.container}>
        <IonLabel className={style.oops}>Opps!</IonLabel>
        <IonLabel className={style.label1}>
          The page you are looking for might have been removed.
        </IonLabel>
        <IonLabel className={style.label2}>
          had its name changed or is temporarily unavailable.
        </IonLabel>
        <IonButtons className={style.backButtons}>
          <IonButton routerLink={routes.home} className={style.backButton}>
            GO TO HOMEPAGE
          </IonButton>
        </IonButtons>
      </IonContent>
    </IonPage>
  );
}
