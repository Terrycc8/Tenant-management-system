import {
  IonModal,
  IonContent,
  IonLabel,
  IonIcon,
  IonList,
  IonItem,
} from "@ionic/react";
import { addOutline, shapesOutline } from "ionicons/icons";
import { useCallback, useRef } from "react";

import { EventsModal } from "./EventsModal";
import { PaymentsModal } from "./PaymentsModal";
import { CommonModalHeader } from "./CommonModalHeader";
import { PropertyModal } from "./propertyModal";
import style from "../theme/createModal.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { userRole } from "../types";
import { TenantModal } from "./tenantModal";
export function CreateModal() {
  const createModal = useRef<HTMLIonModalElement>(null);
  const dismiss = useCallback(() => {
    createModal.current?.dismiss();
  }, []);
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <IonModal
      ref={createModal}
      trigger="open-modal"
      initialBreakpoint={0.38}
      breakpoints={[0, 0.38]}
      onWillDismiss={dismiss}
    >
      <CommonModalHeader
        handlerOnDismiss={dismiss}
        name="Create"
      ></CommonModalHeader>
      <IonContent>
        <IonList className={style.createList}>
          {role == userRole.landlord ? (
            <>
              <IonItem
                button={true}
                detail={false}
                id="open-property-modal"
                className={style.createItem}
              >
                <IonIcon icon={addOutline}></IonIcon>
                <IonLabel className="ion-padding">Create new property</IonLabel>
                <PropertyModal createModalHandler={dismiss} />
              </IonItem>
              <IonItem
                button={true}
                detail={false}
                id="open-tenant-modal"
                className={style.createItem}
              >
                <IonIcon icon={addOutline}></IonIcon>
                <IonLabel className="ion-padding">Add new tenant</IonLabel>
                <TenantModal createModalHandler={dismiss} />
              </IonItem>
            </>
          ) : null}
          {role == userRole.tenant ? (
            <IonItem
              button={true}
              detail={false}
              id="open-events-modal"
              className={style.createItem}
            >
              <IonIcon icon={addOutline}></IonIcon>
              <IonLabel className="ion-padding">Create new event</IonLabel>
              <EventsModal createModalHandler={dismiss} />
            </IonItem>
          ) : null}

          <IonItem button={true} detail={false} id="open-payments-modal">
            <IonIcon icon={addOutline}></IonIcon>
            <IonLabel className="ion-padding">Create new payment</IonLabel>
            <PaymentsModal createModalHandler={dismiss} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
