import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { CommonHeader } from "../components/CommonHeader";

export function PaymentPage() {
  return (
    <IonPage>
      <CommonHeader title="Monthly Rent" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Payment</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}

export default PaymentPage;
