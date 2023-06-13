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
import { FormEvent, useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";

import { FetchError, PropertyInput, area, district } from "../pages/types";

import CustomIonDateTimeButton from "./RentDate";
import { formToJson } from "../helper";
import { setCredentials } from "../slices/authSlice";
import { Root } from "react-dom/client";

import RentEndDate from "./RentDate";
import RentDate from "./RentDate";
import { usePostPropertyMutation } from "../api/propertyAPI";
import { CustomSelector } from "./CustomSelector";
import { CommonModalHeader } from "./CommonModalHeader";
import { CustomIonColInput } from "./CustomIonColInput";

export function PropertyModal(props: { createModalHandler: () => void }) {
  const [presentAlert] = useIonAlert();
  const propertyModal = useRef<HTMLIonModalElement>(null);
  const dismissAll = useCallback(() => {
    propertyModal.current?.dismiss();
    props.createModalHandler();
  }, [propertyModal, props]);
  const dismissProperty = useCallback(() => {
    propertyModal.current?.dismiss();
  }, [propertyModal]);
  const token = useSelector((state: RootState) => state.auth.token);
  const [newProperty] = usePostPropertyMutation();

  const OnSubmit = useCallback(
    async (event: FormEvent) => {
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
          header: (json.error as FetchError).data.message[0],
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
    },
    [presentAlert, token, dismissAll, newProperty]
  );

  return (
    <IonModal
      ref={propertyModal}
      trigger="open-property-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <CommonModalHeader
        handlerOnDismiss={dismissProperty}
        name="Property"
      ></CommonModalHeader>
      <IonContent>
        <form onSubmit={OnSubmit}>
          <IonList>
            <IonGrid className="ion-padding">
              <CustomIonColInput>
                <IonInput
                  label="Property Title"
                  labelPlacement="floating"
                  name="title"
                  maxlength={16}
                ></IonInput>
                <IonInput
                  label="Monthly Rent"
                  labelPlacement="floating"
                  name="rent"
                  type="number"
                  maxlength={8}
                ></IonInput>
              </CustomIonColInput>

              <CustomIonColInput>
                <RentDate name="rental_start_at" id="dateTimeStart" />
                <RentDate name="rental_end_at" id="dateTimeEnd" />
              </CustomIonColInput>

              <CustomIonColInput>
                <IonInput
                  label="Room"
                  labelPlacement="floating"
                  name="room"
                  maxlength={4}
                />
                <IonInput
                  label="Floor"
                  labelPlacement="floating"
                  name="floor"
                  maxlength={4}
                />
                <IonInput
                  label="Block"
                  labelPlacement="floating"
                  name="block"
                  maxlength={4}
                />
              </CustomIonColInput>

              <CustomIonColInput>
                <IonInput
                  label="Building/ Estate"
                  labelPlacement="floating"
                  name="building"
                  maxlength={32}
                />
              </CustomIonColInput>
              <CustomIonColInput>
                <IonInput
                  label="Street"
                  labelPlacement="floating"
                  name="street"
                  maxlength={32}
                />
              </CustomIonColInput>

              <CustomIonColInput>
                <IonInput
                  label="Location"
                  labelPlacement="floating"
                  name="location"
                  maxlength={32}
                />
              </CustomIonColInput>
              <CustomIonColInput>
                <CustomSelector
                  title="District"
                  value={district}
                  name="district"
                />
                <CustomSelector title="Area" value={area} name="area" />
              </CustomIonColInput>

              <CustomIonColInput>
                <IonInput
                  label="Upload Property Pictures"
                  labelPlacement="floating"
                ></IonInput>
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
