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
import { useGetPropertyDetailQuery } from "../api/propertyAPI";
import { routes } from "../routes";
import { useParams } from "react-router";

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();

  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isFetching, isLoading, isError } = useGetPropertyDetailQuery({
    token,
    id: id,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Property detail</IonTitle>
      </IonHeader>
      <IonContent>
        <IonButton routerLink={routes.property}>back</IonButton>
        {isError ? (
          <>error</>
        ) : isLoading ? (
          <>loading</>
        ) : isFetching ? (
          <>Fetching</>
        ) : data ? (
          <IonCard key={data.id}>
            <img src="" alt="" />
            <IonCardHeader>
              <IonCardTitle>{data.title}</IonCardTitle>
              <IonCardSubtitle>{data.rent}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{data.created_at}</IonCardContent>
            <IonButton>add tenant</IonButton>
          </IonCard>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
}
