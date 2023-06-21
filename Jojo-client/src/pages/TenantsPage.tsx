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
  IonRow,
  IonTextarea,
  IonTitle,
} from "@ionic/react";

import { routes } from "../routes";

import { CommonHeader } from "../components/CommonHeader";

import { Autoplay, Pagination, Scrollbar } from "swiper";
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
import { EventListOutput, TenantListOutput, userRole } from "../types";
import { RootState } from "../RTKstore";
import { Loading } from "../components/Loading";
import { useGetTenantQuery } from "../api/tenantAPI";

export function TenantsPage() {
  const [page, setPage] = useState(1);
  const role = useSelector((state: RootState) => state.auth.role);
  const [items, setItems] = useState<TenantListOutput[]>([]);
  const itemsPerPage = 10;
  const { data, isFetching, isLoading, error } = useGetTenantQuery({
    page,
    itemsPerPage,
  });

  useEffect(() => {
    let KEY = "tenants";
    let newItems = data?.result;
    let storedItemsStr = localStorage.getItem(KEY);
    let storedItems: TenantListOutput[] = JSON.parse(storedItemsStr || "[]");

    let itemMap = new Map<number, TenantListOutput>();
    for (let item of storedItems) {
      itemMap.set(item.tenant_id, item);
    }
    if (newItems) {
      for (let item of newItems) {
        itemMap.set(item.tenant_id, item);
      }
    }
    let allItems = Array.from(itemMap.values());
    allItems.sort((a, b) => b.first_name.localeCompare(a.first_name));
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
      <CommonHeader
        title="Tenant list"
        hideHeader={true}
        backUrl={routes.home}
      />

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
              {items.map((tenant: TenantListOutput) => (
                <IonCard key={tenant.tenant_id}>
                  <IonCardHeader>
                    <img src={serverURL + "/" + tenant.avatar} alt="" />
                  </IonCardHeader>

                  <IonCardContent>
                    <IonItem>
                      <IonLabel>Name:</IonLabel>
                      {tenant.first_name} {tenant.last_name}
                    </IonItem>
                    <IonItem>
                      <IonLabel>Email:</IonLabel>
                      {tenant.email}
                    </IonItem>
                    <IonItem>
                      <IonLabel>Property:</IonLabel>
                      {tenant.title}
                    </IonItem>
                  </IonCardContent>
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
