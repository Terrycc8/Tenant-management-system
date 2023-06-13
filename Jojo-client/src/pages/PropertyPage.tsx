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
  IonToolbar,
} from "@ionic/react";
import { useGetPropertyQuery } from "../api/propertyAPI";
import { routes } from "../routes";
import CommonHeader from "../components/CommonHeader";

export function PropertyPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const {
    data,
    isFetching,
    isLoading,
    error: fetchError,
    isError,
  } = useGetPropertyQuery(token);
  const error = fetchError || data?.error;

  return (
    <IonPage>
      <CommonHeader title="Property List" />
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
          data.map(
            (property: {
              id: number;
              title: string;
              rent: number;
              rental_start_at: string;
            }) => (
              <IonCard
                key={property.id}
                routerLink={routes.property + "/" + property.id}
              >
                <img src="" alt="" />
                <IonCardHeader>
                  <IonCardTitle>{property.title}</IonCardTitle>
                  <IonCardSubtitle>{property.rent}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>{}</IonCardContent>
              </IonCard>
            )
          )
        ) : (
          <>Invalid Data: {JSON.stringify(data)}</>
        )}
      </IonContent>
    </IonPage>
  );
}
