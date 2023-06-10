import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useCallback } from "react";
import { routes } from "../routes";
import { CustomIonColInput2 } from "../components/CustomIonColInput";

function HomePage() {
  const dispatch = useDispatch();
  const logOutOnClick = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CustomIonColInput2
          elem={[
            <IonButton className="ion-margin" routerLink={routes.property}>
              Total Property
            </IonButton>,
            <IonButton className="ion-margin">Total Tenant</IonButton>,
          ]}
        />
        <CustomIonColInput2
          elem={[
            <IonButton className="ion-margin">Payment Received</IonButton>,
            <IonButton className="ion-margin">To-be Received</IonButton>,
          ]}
        />
      </IonContent>
      <IonFooter>
        <IonButton
          onClick={logOutOnClick}
          routerLink={routes.login}
          className="ion-margin"
        >
          Logout
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}

export default HomePage;
