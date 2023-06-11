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
import { useGetPropertyQuery } from "../api/propertyAPI";
import { routes } from "../routes";

export function PropertyPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isFetching, isLoading, isError } = useGetPropertyQuery(token);

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Property list</IonTitle>
      </IonHeader>
      <IonContent>
        {isError ? (
          <>error</>
        ) : isLoading ? (
          <>loading</>
        ) : isFetching ? (
          <>Fetching</>
        ) : data && data.length == 0 ? (
          <>no property yet</>
        ) : data && data.length > 0 ? (
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
          <></>
        )}
      </IonContent>
    </IonPage>
  );
}
