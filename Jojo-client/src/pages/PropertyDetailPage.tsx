import { useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import {
  IonBackButton,
  IonButton,
  IonButtons,
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
import { useGetPropertyDetailQuery } from "../api/propertyAPI";
import { routes } from "../routes";
import { useParams } from "react-router";
import { HeaderWithBackButton } from "../components/HeaderWithBackButton";
import { IsLoading } from "../components/IsLoading";
import CommonHeader from "../components/CommonHeader";

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isFetching, isLoading, isError } = useGetPropertyDetailQuery({
    token,
    id: id,
  });

  return (
    <IonPage>
      <CommonHeader title="Property Details" />
      <IonContent>
        {isError ? (
          <>error</>
        ) : isLoading ? (
          <>isLoading</>
        ) : isFetching ? (
          <>loading</>
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
