import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
import { RootState } from "../RTKstore";

export function EventsPage() {
  const [page, setPage] = useState(1);
  const role = useSelector((state: RootState) => state.auth.role);
  const [items, setItems] = useState<EventListOutput[]>([]);
  const itemsPerPage = 3;
  const { data, isFetching, isLoading, error } = useGetEventQuery({
    page,
    itemsPerPage,
  });

  useEffect(() => {
    let KEY = "events";
    let newItems = data?.result;
    let storedItemsStr = localStorage.getItem(KEY);
    let storedItems: EventListOutput[] = JSON.parse(storedItemsStr || "[]");

    let itemMap = new Map<number, EventListOutput>();
    for (let item of storedItems) {
      itemMap.set(item.id, item);
    }
    if (newItems) {
      for (let item of newItems) {
        itemMap.set(item.id, item);
      }
    }
    let allItems = Array.from(itemMap.values());
    allItems.sort((a, b) => a.id - b.id);
    localStorage.setItem(KEY, JSON.stringify(allItems));

    const maxItemCount = page * itemsPerPage;

    setItems(allItems.slice(0, maxItemCount));
  }, [data?.result, error, page]);
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const searchNext = (e: CustomEvent) => {
    if (data && items.length < data.totalItem) {
      setPage((page) => page + 1);
    }
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <IonPage>
      <CommonHeader title="Event list" />

      <IonContent>
        {error && items.length === 0 ? (
          <>{JSON.stringify(error)}</>
        ) : isLoading ? (
          <>loading</>
        ) : items.length === 0 ? (
          <>no data?</>
        ) : (
          <>
            <IonAccordionGroup ref={accordionGroup} multiple={true}>
              {items.map((event: EventListOutput) => (
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
                  <IonAccordion value={event.id.toString()}>
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
            <IonInfiniteScroll
              onIonInfinite={searchNext}
              disabled={data ? data.result.length >= data.totalItem : false}
            >
              <IonInfiniteScrollContent
                loadingText="Please wait..."
                loadingSpinner="bubbles"
              ></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
