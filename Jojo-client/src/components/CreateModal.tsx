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
export function CreateModal() {
  const createModal = useRef<HTMLIonModalElement>(null);
  const dismiss = useCallback(() => {
    createModal.current?.dismiss();
  }, []);
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
            id="open-events-modal"
            className={style.createItem}
          >
            <IonIcon icon={addOutline}></IonIcon>
            <IonLabel className="ion-padding">Create new event</IonLabel>
            <EventsModal createModalHandler={dismiss} />
          </IonItem>
          <IonItem button={true} detail={false} id="open-payments-modal">
            <IonIcon icon={shapesOutline}></IonIcon>
            <IonLabel>Create new payment</IonLabel>
            <PaymentsModal createModalHandler={dismiss} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
