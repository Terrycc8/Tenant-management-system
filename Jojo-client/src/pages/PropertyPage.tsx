import { useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonicSlides,
} from "@ionic/react";
import { useGetPropertyQuery } from "../api/propertyAPI";
import { routes } from "../routes";
import CommonHeader from "../components/CommonHeader";
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles

import "swiper/css";

import "swiper/css/navigation";

import "swiper/css/pagination";

import "swiper/css/scrollbar";

import { Navigation } from "swiper";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import serverURL from "../ServerDomain";
import { PropertyListOutput } from "../types";

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
      <CommonHeader title="Property List" backUrl={routes.home} />
      <IonContent>
        {isError ? (
          <>error: {String(error)}</>
        ) : isLoading ? (
          <>loading</>
        ) : isFetching ? (
          <>Fetching</>
        ) : !data ? (
          <>no data??</>
        ) : data.length == 0 ? (
          <>no property yet</>
        ) : data.length > 0 ? (
          data.map((property: PropertyListOutput) => (
            <IonCard
              key={property.id}
              routerLink={routes.property + "/" + property.id}
            >
              <IonCardHeader>
                <IonCardTitle>{property.title}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <Swiper
                  modules={[Autoplay]}
                  autoplay={false}
                  scrollbar={{ draggable: false }}
                >
                  {property.attachments.map((image, idx) => (
                    <SwiperSlide key={idx + 1}>
                      <img src={serverURL + "/" + image} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </IonCardContent>
              <IonRow>
                Tenant:
                {property.tenant_id ? property.tenant_id : " No tenant yet"}
              </IonRow>
            </IonCard>
          ))
        ) : (
          <>Invalid Data: {JSON.stringify(data)}</>
        )}
      </IonContent>
    </IonPage>
  );
}
