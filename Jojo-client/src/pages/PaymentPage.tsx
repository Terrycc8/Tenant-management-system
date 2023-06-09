import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { CustomModal } from "../components/CustomModal";

export function PaymentPage() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Payment</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CustomModal />
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
}

export default PaymentPage;
