import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export function ErrorPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
}
