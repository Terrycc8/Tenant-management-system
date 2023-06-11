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
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";

import { FetchError, PropertyInput, area, district } from "../pages/types";
import {
  CustomIonColInput,
  CustomIonColInput2,
  CustomIonColInput3,
} from "./CustomIonColInput";
import CustomIonDateTimeButton from "./RentDate";
import { formToJson } from "../helper";
import { setCredentials } from "../slices/authSlice";
import { Root } from "react-dom/client";

import RentEndDate from "./RentDate";
import RentDate from "./RentDate";
import { usePostPropertyMutation } from "../api/propertyAPI";
import { CustomSelector } from "./CustomSelector";

export function PropertyModal() {
  const [presentAlert] = useIonAlert();
  const propertyModal = useRef<HTMLIonModalElement>(null);
  const dismissProperty = useCallback(() => {
    propertyModal.current?.dismiss();
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);
  const [newProperty] = usePostPropertyMutation();
  const OnSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const json = await newProperty({
      propertyInput: formToJson(form, [
        "title",
        "rent",
        "area",
        "district",
        "location",
        "street",
        "building",
        "block",
        "floor",
        "room",
        "rental_start_at",
        "rental_end_at",
      ]) as PropertyInput,
      token,
    });
    if ("error" in json) {
      presentAlert({
        header: (json.error as FetchError).data.message,
        buttons: [
          {
            text: "OK",
            role: "confirm",
            handler: dismissProperty,
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
            handler: dismissProperty,
          },
        ],
      });
    }
  }, []);

  return (
    <IonModal
      ref={propertyModal}
      trigger="open-property-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onWillDismiss={dismissProperty}
    >
      <IonToolbar>
        <IonLabel slot="start">Property</IonLabel>
        <IonButtons slot="end">
          <IonButton onClick={dismissProperty}>
            <IonIcon icon={closeOutline}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonTitle>List New Property</IonTitle>
      <IonContent>
        <form onSubmit={OnSubmit}>
          <IonList>
            <IonGrid className="ion-padding">
              <CustomIonColInput2
                elem={[
                  <IonInput
                    label="Property Title"
                    labelPlacement="floating"
                    name="title"
                    maxlength={16}
                  ></IonInput>,
                  <IonInput
                    label="Monthly Rent"
                    labelPlacement="floating"
                    name="rent"
                    type="number"
                    maxlength={8}
                  ></IonInput>,
                ]}
              />
              <CustomIonColInput2
                elem={[
                  <RentDate name="rental_start_at" id="dateTimeStart" />,
                  <RentDate name="rental_end_at" id="dateTimeEnd" />,
                ]}
              />
              <CustomIonColInput3
                elem={[
                  <IonInput
                    label="Room"
                    labelPlacement="floating"
                    name="room"
                    maxlength={4}
                  />,
                  <IonInput
                    label="Floor"
                    labelPlacement="floating"
                    name="floor"
                    maxlength={4}
                  />,
                  <IonInput
                    label="Block"
                    labelPlacement="floating"
                    name="block"
                    maxlength={4}
                  />,
                ]}
              />
              <CustomIonColInput
                elem={
                  <IonInput
                    label="Building/ Estate"
                    labelPlacement="floating"
                    name="building"
                    maxlength={32}
                  />
                }
              />
              <CustomIonColInput
                elem={
                  <IonInput
                    label="Street"
                    labelPlacement="floating"
                    name="street"
                    maxlength={32}
                  />
                }
              />
              <CustomIonColInput
                elem={
                  <IonInput
                    label="Location"
                    labelPlacement="floating"
                    name="location"
                    maxlength={32}
                  />
                }
              />
              <CustomIonColInput2
                elem={[
                  <CustomSelector
                    title="District"
                    value={district}
                    name="district"
                  />,
                  <CustomSelector title="Area" value={area} name="area" />,
                ]}
              />
              <CustomIonColInput
                elem={
                  <IonInput
                    label="Upload Property Pictures"
                    labelPlacement="floating"
                  ></IonInput>
                }
              />

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
