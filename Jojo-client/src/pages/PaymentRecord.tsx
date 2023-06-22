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
import { useGetPaymentQuery } from "../api/paymentAPI";
import { routes } from "../routes";
import CommonHeader from "../components/CommonHeader";
import serverURL from "../ServerDomain";
import { PaymentListOutput } from "../types";
import { format, parseISO } from "date-fns";

export function PaymentRecord() {
  const {
    data,
    isFetching,
    isLoading,
    error: fetchError,
    isError,
  } = useGetPaymentQuery({});
  const error = fetchError || data?.error;

  return (
    <IonPage>
      {/* <CommonHeader title="Payment Record" backUrl={routes.home} /> */}
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
          data.map((payment: PaymentListOutput) => (
            <IonCard key={payment.id}>
              <IonCardHeader>
                <IonRow>
                  <IonCol>
                    Property:{" "}
                    {payment.first_name && payment.last_name
                      ? payment.first_name + " " + payment.last_name
                      : " No tenant yet"}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonLabel>Title: {payment.status}</IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel>Monthly rent: {payment.amount}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonCardHeader>

              <IonCardContent>
                {/* <Swiper
                  modules={[Autoplay]}
                  autoplay={false}
                  scrollbar={{ draggable: false }}
                > */}
                {/* {property.attachments.map((image, idx) => (
                  <SwiperSlide key={idx + 1}>
                    <img src={serverURL + "/" + image} alt="" /> */}
                {/* </SwiperSlide>
                ))} */}
                {/* </Swiper> */}
                {payment.billing_period_from +
                  " to " +
                  payment.billing_period_to}
              </IonCardContent>
              <IonButton fill="clear" routerLink={routes.chatroom(payment.id)}>
                View more detail
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
