import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
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
import { memo, useCallback, useEffect, useMemo } from "react";
import { routes } from "../routes";
import { CustomIonColInput2 } from "../components/CustomIonColInput";
import { RouteComponentProps } from "react-router";
import { CommonHeaderMemo } from "../components/CommonHeader";
import { personCircle } from "ionicons/icons";

let props_history: RouteComponentProps[] = [];

Object.assign(window, { props_history });

function HomePage() {
  const dispatch = useDispatch();
  const logOutOnClick = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <IonPage>
      <CommonHeaderMemo />

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
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
        <IonItem>1</IonItem>
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
