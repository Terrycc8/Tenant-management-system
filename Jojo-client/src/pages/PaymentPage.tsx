import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

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
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
  IonRow,
  IonTextarea,
  IonTitle,
} from "@ionic/react";
import { routes } from "../routes";
import { useGetPaymentQuery, usePatchPaymentMutation } from "../api/paymentAPI";
import { CommonHeader } from "../components/CommonHeader";
import serverURL from "../ServerDomain";
import { PaymentListOutput, userRole } from "../types";
import { RootState } from "../RTKstore";
import { Loading } from "../components/Loading";
import { NoItem } from "../components/NoItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export function PaymentPage() {
  const [page, setPage] = useState(1);
  const role = useSelector((state: RootState) => state.auth.role);
  const [items, setItems] = useState<PaymentListOutput[]>([]);
  const itemsPerPage = 3;
  const {
    data,
    isFetching,
    isLoading,
    error: fetchError,
    isError,
  } = useGetPaymentQuery({});

  const error = fetchError || data?.error;

  useEffect(() => {
    let KEY = "payments";
    let newItems = data?.result;
    let storedItemsStr = localStorage.getItem(KEY);
    let storedItems: PaymentListOutput[] = JSON.parse(storedItemsStr || "[]");

    let itemMap = new Map<number, PaymentListOutput>();
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
  const [patchPayment] = usePatchPaymentMutation();
  const confirmOnClick = actionOnClick("confirm");
  const rejectOnClick = actionOnClick("reject");
  const cancelOnClick = actionOnClick("cancel");
  function actionOnClick(action: string) {
    return useCallback(
      async (payment: MouseEvent) => {
        let id = +(payment.target as HTMLElement).dataset.id!;
        const comment = (
          payment.nativeEvent.target as HTMLElement
        ).parentElement?.querySelector("ion-textarea")!.value!;
        try {
          // await patchPayment({ action: { type: action, comment: "" }, id });
        } catch (error) {
          console.log(error);
        }
      },
      [action]
    );
  }

  return (
    <IonPage>
      <CommonHeader
        title="Payment List"
        backUrl={routes.home}
        hideHeader={true}
      />
      <IonContent fullscreen={true}>
        {isError ? (
          <>error: {String(error)}</>
        ) : isLoading ? (
          <Loading />
        ) : isFetching ? (
          <Loading />
        ) : !data ? (
          <>no data??</>
        ) : data.length == 0 ? (
          <NoItem name="property" />
        ) : data.length > 0 ? (
          data.map((payment: PaymentListOutput) => (
            <IonCard key={payment.id}>
              <IonCardHeader>
                <IonRow>
                  <IonCol className="paymentListTitle">
                    Tenant:{" "}
                    {/* {payment.first_name && payment.last_name
                      ? payment.first_name + " " + payment.last_name
                      : " No tenant yet"} */}
                    {/* {payment.status && payment.status
                      ? payment.status + " " + payment.status
                      : " No tenant yet"} */}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonLabel>Title: {payment.status}</IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel>Monthly rent: {payment.status}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonCardHeader>

              <IonCardContent>
                <Swiper
                  modules={[Pagination]}
                  // scrollbar={{ draggable: true }}
                  pagination={true}
                >
                  {payment.attachments.map((image, idx) => (
                    <SwiperSlide key={idx + 1}>
                      <img src={serverURL + "/" + image} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </IonCardContent>
              <IonButton
                fill="clear"
                routerLink={routes.payments + "/" + payment.id}
              >
                View more Info
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

export default PaymentPage;

// {role == userRole.landlord && payment.status == "pending" ? (
//   <>
//     <IonButton
//       data-id={payment.id}
//       fill="clear"
//       onClick={confirmOnClick}
//     >
//       Confirm
//     </IonButton>
//     <IonButton
//       data-id={payment.id}
//       fill="clear"
//       onClick={rejectOnClick}
//     >
//       Reject
//     </IonButton>
//   </>
// ) : role == userRole.tenant && payment.status == "pending" ? (
//   <>
//     <IonButton
//       fill="clear"
//       data-id={payment.id}
//       onClick={cancelOnClick}
//     >
//       Cancel
//     </IonButton>
//   </>
// ) : (
//   <IonItem color="medium">Closed</IonItem>
// )}
