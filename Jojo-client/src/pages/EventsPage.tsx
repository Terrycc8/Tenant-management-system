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
  IonTitle,
} from "@ionic/react";

import { routes } from "../routes";
import { useGetEventQuery } from "../api/eventAPI";
import { CommonHeader } from "../components/CommonHeader";

import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "@ionic/react/css/ionic-swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import serverURL from "../ServerDomain";
import { EventListOutput } from "../types";

export function EventsPage() {
  const { data, isFetching, isLoading, isError } = useGetEventQuery({});

  return (
    <IonPage>
      <CommonHeader title="Event list" />

      <IonContent>
        {isError ? (
          <>error</>
        ) : isLoading ? (
          <>loading</>
        ) : isFetching ? (
          <>Fetching</>
        ) : data && data.length == 0 ? (
          <>no event</>
        ) : data && data.length > 0 ? (
          data.map((event: EventListOutput) => (
            <IonCard key={event.id} routerLink={routes.events + "/" + event.id}>
              <img src="" alt="" />
              <IonCardHeader>
                <IonCardTitle>{event.title}</IonCardTitle>
                <IonCardSubtitle>{event.type}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <Swiper
                  modules={[Autoplay]}
                  autoplay={false}
                  scrollbar={{ draggable: false }}
                >
                  {event.attachments.map((image, idx) => (
                    <SwiperSlide key={idx + 1}>
                      <img src={serverURL + "/" + image} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </IonCardContent>
              <IonButton fill="clear">Resolve</IonButton>
              <IonButton fill="clear">Reject</IonButton>
            </IonCard>
          ))
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
}
