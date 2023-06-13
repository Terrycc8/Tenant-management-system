import {
  IonButton,
  IonCard,
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

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { memo, useCallback, useEffect, useMemo } from "react";
import { routes } from "../routes";
import { CustomIonColInput } from "../components/CustomIonColInput";
import { RouteComponentProps } from "react-router";
import { RootState } from "../RTKstore";
import { LoginPage } from "./LoginPage";
import { CommonHeader } from "../components/CommonHeader";

let props_history: RouteComponentProps[] = [];

Object.assign(window, { props_history });

export function HomePage() {
  return (
    <IonPage>
      <CommonHeader title="A App" />
      <IonContent fullscreen>
        <CustomIonColInput>
          <IonButton className="ion-margin" routerLink={routes.property}>
            Total Property
          </IonButton>
          <IonButton className="ion-margin">Total Tenant</IonButton>
        </CustomIonColInput>
        <CustomIonColInput>
          <IonButton className="ion-margin">Payment Received</IonButton>
          <IonButton className="ion-margin">To-be Received</IonButton>
        </CustomIonColInput>

        <IonCard></IonCard>
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
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default HomePage;
