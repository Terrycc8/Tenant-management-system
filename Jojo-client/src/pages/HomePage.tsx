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
import { logout, setCredentials } from "../slices/authSlice";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
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
import { Loading } from "../components/Loading";
import { Autoplay, Pagination, Scrollbar } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import style from "../theme/home.module.scss";
import { userRole } from "../types";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

export function HomePage() {
  const { data, isFetching, isLoading, error, isError } = useGetHomeQuery({});
  const role = useSelector((state: RootState) => state.auth.role);
  const [isDOMReady, setIsDOMReady] = useState(false);
  useLayoutEffect(() => {
    setIsDOMReady(true);
  }, []);

  return (
    <IonPage>
      <CommonHeader title="Home" hideHeader={false} />

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
              <IonCard
                routerLink={routes.tenants}
                className="top-right-card top-card"
              >
                <IonCardContent>Total Tenant</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          {/* <IonRow>
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
          </IonRow> */}
          <IonRow>
            <IonCol>
              <IonCard className="stats">
                <IonCardHeader>
                  Current month events ({format(new Date(), "MMM-yyyy")})
                </IonCardHeader>
                <IonCardContent className="d-chart">
                  {isError ? (
                    <>{String(error)};</>
                  ) : isLoading ? (
                    <Loading />
                  ) : isFetching ? (
                    <Loading />
                  ) : !data ? (
                    <>Data not Found</>
                  ) : role == userRole.landlord ? (
                    <Swiper
                      className={style.swiperChart}
                      modules={[Pagination]}
                      pagination={true}
                    >
                      <SwiperSlide>
                        {data.totalChart.label.length == 0 ? (
                          <IonLabel>No new event</IonLabel>
                        ) : (
                          <>
                            {!isDOMReady ? (
                              <>Loading Doughnut Chart...</>
                            ) : (
                              <Doughnut
                                width="100%"
                                plugins={[]}
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
                                  labels: data.totalChart.label,
                                  datasets: [
                                    {
                                      label: "No.s of events",
                                      data: data.totalChart.data,
                                      borderWidth: 2,
                                    },
                                  ],
                                }}
                              />
                            )}
                          </>
                        )}
                      </SwiperSlide>
                      <SwiperSlide>
                        {data.totalChart.label.length == 0 ? (
                          <IonLabel>No new event</IonLabel>
                        ) : (
                          <>
                            {!isDOMReady ? (
                              <>Loading Doughnut Chart...</>
                            ) : (
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
                                  labels: data.typeChart.label,
                                  datasets: [
                                    {
                                      label: "No.s of events",
                                      data: data.typeChart.data,
                                      borderWidth: 2,
                                    },
                                  ],
                                }}
                                redraw
                              />
                            )}
                          </>
                        )}
                      </SwiperSlide>
                    </Swiper>
                  ) : role == userRole.tenant ? (
                    <Swiper
                      className={style.swiperChart}
                      modules={[Pagination]}
                      pagination={true}
                    >
                      <SwiperSlide>
                        {data.totalChart.label.length == 0 ? (
                          <IonLabel>No new event</IonLabel>
                        ) : (
                          <>
                            {!isDOMReady ? (
                              <>Loading Doughnut Chart...</>
                            ) : (
                              <Doughnut
                                width="100%"
                                plugins={[]}
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
                                  labels: data.totalChart.label,
                                  datasets: [
                                    {
                                      label: "No.s of events",
                                      data: data.totalChart.data,
                                      borderWidth: 2,
                                    },
                                  ],
                                }}
                              />
                            )}
                          </>
                        )}
                      </SwiperSlide>
                      <SwiperSlide>
                        {data.totalChart.label.length == 0 ? (
                          <IonLabel>No new event</IonLabel>
                        ) : (
                          <>
                            {!isDOMReady ? (
                              <>Loading Doughnut Chart...</>
                            ) : (
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
                                  labels: data.typeChart.label,
                                  datasets: [
                                    {
                                      label: "No.s of events",
                                      data: data.typeChart.data,
                                      borderWidth: 2,
                                    },
                                  ],
                                }}
                                redraw
                              />
                            )}
                          </>
                        )}
                      </SwiperSlide>
                    </Swiper>
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
