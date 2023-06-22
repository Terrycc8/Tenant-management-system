import { useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonicSlides,
} from "@ionic/react";
import { useGetPropertyQuery } from "../api/propertyAPI";
import { routes } from "../routes";
import CommonHeader from "../components/CommonHeader";
import { Autoplay, Pagination, Scrollbar } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import serverURL from "../ServerDomain";
import { PropertyListOutput } from "../types";
import { format, parseISO } from "date-fns";
import { Loading } from "../components/Loading";
import { NoItem } from "../components/NoItem";

export function PropertyPage() {
  const {
    data,
    isFetching,
    isLoading,
    error: fetchError,
    isError,
  } = useGetPropertyQuery({});
  const error = fetchError || data?.error;

  return (
    <IonPage>
      <CommonHeader
        title="Property List"
        backUrl={routes.home}
        hideHeader={true}
      />
      <IonContent fullscreen={true}>
        {isError ? (
          <>error: {String(error)}</>
        ) : isLoading ? (
          <Loading />
        ) : isFetching ? (
          <Loading />
        ) : !data ? (
          <>no data??</>
        ) : data.length == 0 ? (
          <NoItem name="property" />
        ) : data.length > 0 ? (
          data.map((property: PropertyListOutput) => (
            <IonCard key={property.id}>
              <IonCardHeader>
                <IonRow>
                  <IonCol className="propertyListTitle">
                    Tenant:{" "}
                    {property.first_name && property.last_name
                      ? property.first_name + " " + property.last_name
                      : " No tenant yet"}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonLabel>Title: {property.title}</IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel>Monthly rent: {property.rent}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonCardHeader>

              <IonCardContent>
                <Swiper
                  modules={[Pagination]}
                  // scrollbar={{ draggable: true }}
                  pagination={true}
                >
                  {property.attachments.map((image, idx) => (
                    <SwiperSlide key={idx + 1}>
                      <img src={serverURL + "/" + image} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </IonCardContent>
              <IonButton
                fill="clear"
                routerLink={routes.property + "/" + property.id}
              >
                View more Info
              </IonButton>
            </IonCard>
          ))
        ) : (
          <>Invalid Data: {JSON.stringify(data)}</>
        )}
      </IonContent>
    </IonPage>
  );
}
