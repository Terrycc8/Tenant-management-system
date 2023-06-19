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
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { routes } from "../routes";
import { CustomIonColInput } from "../components/CustomIonColInput";
import { RouteComponentProps } from "react-router";
import { RootState } from "../RTKstore";
import { LoginPage } from "./LoginPage";
import { CommonHeader } from "../components/CommonHeader";
import "../theme/home.modules.scss";
import { format } from "date-fns";
import { ArcElement } from "chart.js";
import { Chart, registerables } from "chart.js";
import { useGetHomeQuery } from "../api/homeAPI";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";
Chart.register(...registerables);
Chart.register(ChartDataLabels);

let props_history: RouteComponentProps[] = [];

Object.assign(window, { props_history });

export function HomePage() {
  const { data, isFetching, isLoading, error, isError } = useGetHomeQuery({});

  return (
    <IonPage>
      <CommonHeader title="Home" />

      <IonContent fullscreen>
        <IonGrid className="homeButtons">
          <IonRow>
            <IonLabel className="welcomeMsg">
              Welcome Back,{" "}
              {isError
                ? null
                : isLoading
                ? null
                : isFetching
                ? null
                : data
                ? data.name
                : null}
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonCol className="home-col">
              <IonCard
                className="top-left-card top-card"
                routerLink={routes.property}
              >
                <IonCardContent>Total Property</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol className="home-col">
              <IonCard className="top-right-card top-card">
                <IonCardContent>Total Tenant</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="home-col">
              <IonCard className="left-right-card bottom-card">
                <IonCardContent>Payment received</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol className="home-col">
              <IonCard className="bottom-right-card bottom-card">
                <IonCardContent>Payment to be received</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="stats">
                <IonCardHeader>
                  Total numbers of event in {format(new Date(), "MMM-yyyy")}
                </IonCardHeader>
                <IonCardContent className="d-chart">
                  {isError ? (
                    <>{String(error)};</>
                  ) : isLoading ? (
                    <></>
                  ) : isFetching ? (
                    <></>
                  ) : !data ? (
                    <>data??</>
                  ) : data.label.length == 0 ? (
                    <IonLabel>No new event</IonLabel>
                  ) : data.label.length > 0 ? (
                    <Doughnut
                      width="100%"
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          datalabels: {
                            color: "black",
                            font: {
                              size: 16,
                              weight: "bold",
                            },
                          },
                        },
                      }}
                      data={{
                        labels: data.label,
                        datasets: [
                          {
                            label: "No.s of events",
                            data: data.data,
                            borderWidth: 2,
                          },
                        ],
                      }}
                      redraw
                    />
                  ) : null}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default HomePage;
