import {
  IonModal,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonInput,
  IonTitle,
  IonRow,
  IonCol,
  IonList,
  IonDatetime,
  IonItem,
  IonGrid,
  useIonAlert,
  IonHeader,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import {
  FormEvent,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";

import { showResponseMessage } from "../helper";
import RentDate from "./RentDate";
import {
  useGetPropertyQuery,
  usePostPropertyMutation,
} from "../api/propertyAPI";
import {
  CustomSelector,
  CustomSelectorOnFetch,
  CustomSelectorOnFetchTenant,
} from "./CustomSelector";
import { CommonModalHeader } from "./CommonModalHeader";
import { CustomIonColInput } from "./CustomIonColInput";
import { fileToBase64String, selectImage } from "@beenotung/tslib/file";
import { dataURItoFile, resizeBase64WithRatio } from "@beenotung/tslib/image";
import { area, district } from "../types";
import { useGetTenantNoPaginationQuery } from "../api/tenantAPI";

export function TenantModal(props: { createModalHandler: () => void }) {
  const [presentAlert] = useIonAlert();
  const tenantModal = useRef<HTMLIonModalElement>(null);
  const dismissAll = useCallback(() => {
    tenantModal.current?.dismiss();
    props.createModalHandler();
  }, [tenantModal, props]);
  const dismissTenant = useCallback(() => {
    tenantModal.current?.dismiss();
  }, [tenantModal]);
  const { data: dataProperty } = useGetPropertyQuery({});
  const { data: dataTenant } = useGetTenantNoPaginationQuery({});
  const OnSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      let formData = new FormData(form);

      const json: any = 1;
      // = await newTenant(formData);
      showResponseMessage(json, presentAlert, dismissAll);
    },
    [presentAlert, dismissAll, showResponseMessage]
  );
  console.log(dataTenant, dataProperty);
  return (
    <IonModal
      ref={tenantModal}
      trigger="open-tenant-modal"
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5]}
    >
      <CommonModalHeader
        handlerOnDismiss={dismissTenant}
        name="Property"
      ></CommonModalHeader>
      <IonContent>
        <form onSubmit={OnSubmit}>
          <IonList>
            <IonGrid className="ion-padding">
              <CustomIonColInput>
                <CustomSelectorOnFetch
                  title="Property"
                  name="property_id"
                  value={dataProperty}
                />
              </CustomIonColInput>

              <CustomIonColInput>
                <CustomSelectorOnFetchTenant
                  title="Tenant"
                  name="id"
                  value={dataTenant}
                />
              </CustomIonColInput>

              <IonButton type="submit" expand="block">
                SUBMIT
              </IonButton>
            </IonGrid>
          </IonList>
        </form>
      </IonContent>
    </IonModal>
  );
}
