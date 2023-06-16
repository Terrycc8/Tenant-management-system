import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
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
import { EventListOutput, userRole } from "../types";

export function EventsPage() {
  const role = useSelector((state: RootState) => state.auth.role);
  const { data, isFetching, isLoading, isError } = useGetEventQuery({});
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
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
        ) : !data ? (
          <>no data?</>
        ) : data.length == 0 ? (
          <>no event</>
        ) : data && data.length > 0 ? (
          <IonAccordionGroup ref={accordionGroup} multiple={true}>
            {data.map((event: EventListOutput) => (
              <IonCard
                key={event.id}
                routerLink={routes.events + "/" + event.id}
              >
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
                <IonAccordion value={event.id}>
                  <IonItem slot="header" color="light">
                    <IonLabel>Description</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    {typeof event.description == "string" &&
                    event.description.length > 0
                      ? event.description
                      : "No description."}
                  </div>
                </IonAccordion>
                {role == userRole.landlord ? (
                  <>
                    <IonButton fill="clear">Resolve</IonButton>
                    <IonButton fill="clear">Reject</IonButton>
                  </>
                ) : (
                  <>
                    <IonButton fill="clear">Edit</IonButton>
                    <IonButton fill="clear">Delete</IonButton>
                  </>
                )}
              </IonCard>
            ))}
          </IonAccordionGroup>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
}
