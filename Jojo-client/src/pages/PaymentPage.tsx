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

export function PaymentPage() {
  const [page, setPage] = useState(1);
  const role = useSelector((state: RootState) => state.auth.role);
  const [items, setItems] = useState<PaymentListOutput[]>([]);
  const itemsPerPage = 3;
  const { data, isFetching, isLoading, error } = useGetPaymentQuery({
    page,
    itemsPerPage,
  });

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
  const resolveOnClick = actionOnClick("resolve");
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
          await patchPayment({ action: { type: action, comment: "" }, id });
        } catch (error) {
          console.log(error);
        }
      },
      [action]
    );
  }

  return (
    <IonPage>
      <CommonHeader title="Payment list" hideHeader={true} />
      <IonContent fullscreen>
        {error && items.length === 0 ? (
          <>{JSON.stringify(error)}</>
        ) : isLoading ? (
          <Loading />
        ) : items.length === 0 ? (
          <></>
        ) : (
          <>
            <IonAccordionGroup ref={accordionGroup} multiple={true}>
              {items.map((payment: PaymentListOutput) => (
                <IonCard
                  key={payment.id}
                  routerLink={routes.payment + "/" + payment.id}
                >
                  <IonCardHeader>
                    <IonCardTitle>{payment.event_title}</IonCardTitle>
                    <IonCardTitle color="medium">
                      {payment.property_title}
                    </IonCardTitle>
                    <IonCardSubtitle>{payment.type}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent></IonCardContent>
                  <IonAccordion value={payment.id.toString()}>
                    <IonItem slot="header" color="light">
                      <IonLabel>Description</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      {typeof payment.description == "string" &&
                      payment.description.length > 0
                        ? payment.description
                        : "No description."}
                    </div>
                  </IonAccordion>
                  {/* <IonAccordion value={payment.id.toString() + "comment"}>
                    <IonItem slot="header" color="light">
                      <IonLabel>Comment</IonLabel>
                    </IonItem>
                    <IonTextarea
                      id="test"
                      className="ion-padding"
                      slot="content"
                    >
                      {typeof payment.comment == "string" &&
                      payment.comment.length > 0
                        ? payment.comment
                        : "Please input your comment below:"}
                    </IonTextarea>
                  </IonAccordion> */}
                  {role == userRole.landlord && payment.status == "pending" ? (
                    <>
                      <IonButton
                        data-id={payment.id}
                        fill="clear"
                        onClick={resolveOnClick}
                      >
                        Resolve
                      </IonButton>
                      <IonButton
                        data-id={payment.id}
                        fill="clear"
                        onClick={rejectOnClick}
                      >
                        Reject
                      </IonButton>
                    </>
                  ) : role == userRole.tenant && payment.status == "pending" ? (
                    <>
                      <IonButton
                        fill="clear"
                        data-id={payment.id}
                        onClick={cancelOnClick}
                      >
                        Cancel
                      </IonButton>
                    </>
                  ) : (
                    <IonItem color="medium">Closed</IonItem>
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

export default PaymentPage;
