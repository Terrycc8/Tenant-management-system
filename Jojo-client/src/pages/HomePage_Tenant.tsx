import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { memo, useCallback, useEffect, useMemo } from "react";
import { routes } from "../routes";
import { CustomIonColInput } from "../components/CustomIonColInput";
import { RouteComponentProps } from "react-router";
import { RootState } from "../RTKstore";
import { LoginPage } from "./LoginPage";
import { CommonHeader } from "../components/CommonHeader";
import "./home.module.scss";
import { format } from "date-fns";
import { ArcElement } from "chart.js";
import { Chart, registerables } from "chart.js";

let props_history: RouteComponentProps[] = [];

Object.assign(window, { props_history });

export function Home_T_Page() {
  return (
    <IonPage>
      <CommonHeader title="Home" />

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonLabel>Welcome Back,{}</IonLabel>
          </IonRow>
          <IonRow>
            <IonCol>
              {/* <IonCard routerLink={routes.property}> */}
              <IonCardContent>Payment Remainder</IonCardContent>
              {/* </IonCard> */}
            </IonCol>

            <IonCol>
              <IonCard>
                <IonCardContent>Payment Record</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>Payment received</IonCardContent>
              </IonCard>
            </IonCol>

            {/* <IonCol>
              <IonCard>
                <IonCardContent>Payment to be received</IonCardContent>
              </IonCard>
            </IonCol> */}
          </IonRow>
        </IonGrid>
        <IonCard>
          {/* <IonCardHeader>
              Event of {format(new Date(), "MMM-yyyy")}
            </IonCardHeader>
            <IonCardContent>
              <Doughnut
                data={{
                  labels: [
                    "Notice",
                    "Complaints",
                    "reimbursement",
                    "Maintenance",
                  ],
                  datasets: [
                    {
                      label: "No.s of events",
                      data: [12, 19, 1, 5],
                      borderWidth: 2,
                    },
                  ],
                }}
              /> */}
          {/* </IonCardContent> */}
        </IonCard>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default Home_T_Page;
