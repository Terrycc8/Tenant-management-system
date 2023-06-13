import {
  IonModal,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonInput,
  IonList,
  IonGrid,
  useIonAlert,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";

import { CustomSelector, CustomSelectorOnFetch } from "./CustomSelector";
import {
  EventInput,
  FetchError,
  event_priority,
  event_type,
} from "../pages/types";
import { usePostEventMutation } from "../api/eventAPI";
import { formToJson } from "../helper";
import { useGetPropertyQuery } from "../api/propertyAPI";
import { CustomIonColInput } from "./CustomIonColInput";
import { CommonModalHeader } from "./CommonModalHeader";

export function EventsModal(props: { createModalHandler: () => void }) {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data } = useGetPropertyQuery(token);
  const [presentAlert] = useIonAlert();
  const eventsModal = useRef<HTMLIonModalElement>(null);
  const dismissEvents = useCallback(() => {
    eventsModal.current?.dismiss();
  }, [eventsModal]);
  const dismissAll = useCallback(() => {
    eventsModal.current?.dismiss();
    props.createModalHandler();
  }, [props, eventsModal]);

  const [newEvent] = usePostEventMutation();
  const OnSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const json = await newEvent({
      eventInput: formToJson(form, [
        "property_id",
        "title",
        "type",
        "priority",
        "description",
      ]) as EventInput,
      token,
    });
    if ("error" in json) {
      presentAlert({
        header: (json.error as FetchError).data.message,
        buttons: [
          {
            text: "OK",
            role: "confirm",
          },
        ],
      });
    } else {
      presentAlert({
        header: "Successful",
        buttons: [
          {
            text: "OK",
            role: "confirm",
            handler: dismissAll,
          },
        ],
      });
    }
  }, []);
  return (
    <IonModal
      ref={eventsModal}
      trigger="open-events-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onWillDismiss={dismissEvents}
    >
      <CommonModalHeader
        handlerOnDismiss={dismissEvents}
        name="Event"
      ></CommonModalHeader>
      <IonContent>
        <form onSubmit={OnSubmit}>
          <IonList>
            <IonGrid>
              <CustomIonColInput>
                <CustomSelectorOnFetch
                  title="Property"
                  value={data}
                  name="property_id"
                />
              </CustomIonColInput>

              <CustomIonColInput>
                <IonInput
                  label="Event title"
                  labelPlacement="floating"
                  name="title"
                  maxlength={32}
                />
              </CustomIonColInput>
              <CustomIonColInput>
                <CustomSelector title="Type" value={event_type} name="type" />
                <CustomSelector
                  title="Priority"
                  value={event_priority}
                  name="priority"
                />
              </CustomIonColInput>
              <CustomIonColInput>
                <IonInput
                  label="Description"
                  labelPlacement="floating"
                  name="description"
                  maxlength={256}
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
