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
          data.map(
            (event: {
              id: number;
              title: string;
              type: string;
              priority: string;
            }) => (
              <IonCard
                key={event.id}
                routerLink={routes.events + "/" + event.id}
              >
                <img src="" alt="" />
                <IonCardHeader>
                  <IonCardTitle>{event.title}</IonCardTitle>
                  <IonCardSubtitle>{event.type}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>{event.priority}</IonCardContent>
              </IonCard>
            )
          )
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
}
