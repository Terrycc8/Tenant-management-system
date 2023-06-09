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
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { AddressSelector } from "./AddressSelector";
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
import { usePostPropertyMutation } from "../api/propertyMutation";

export function PropertyModal() {
  const propertyModal = useRef<HTMLIonModalElement>(null);
  const dismissProperty = useCallback(() => {
    propertyModal.current?.dismiss();
  }, []);
  const [errors, setErrors] = useState<string[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const [newProperty] = usePostPropertyMutation();
  const OnSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    setErrors((state) => (state = []));
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
      setErrors(
        (state) => (state = Array((json.error as FetchError).data.message))
      );
    } else {
      //show success toast
      setErrors((state) => (state = []));
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
                  ></IonInput>,
                  <IonInput
                    label="Monthly Rent"
                    labelPlacement="floating"
                    name="rent"
                    type="number"
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
                  />,
                  <IonInput
                    label="Floor"
                    labelPlacement="floating"
                    name="floor"
                  />,
                  <IonInput
                    label="Block"
                    labelPlacement="floating"
                    name="block"
                  />,
                ]}
              />
              <CustomIonColInput
                elem={
                  <IonInput
                    label="Building/ Estate"
                    labelPlacement="floating"
                    name="building"
                  />
                }
              />
              <CustomIonColInput
                elem={
                  <IonInput
                    label="Street"
                    labelPlacement="floating"
                    name="street"
                  />
                }
              />
              <CustomIonColInput
                elem={
                  <IonInput
                    label="Location"
                    labelPlacement="floating"
                    name="location"
                  />
                }
              />
              <CustomIonColInput2
                elem={[
                  <AddressSelector
                    title="District"
                    value={district}
                    name="district"
                  />,
                  <AddressSelector title="Area" value={area} name="area" />,
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
              {errors.length > 0 ? <>{errors}</> : <></>}
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
