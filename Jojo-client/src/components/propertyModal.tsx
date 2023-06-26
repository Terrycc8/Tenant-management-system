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
import { usePostPropertyMutation } from "../api/propertyAPI";
import { CustomSelector } from "./CustomSelector";
import { CommonModalHeader } from "./CommonModalHeader";
import { CustomIonColInput } from "./CustomIonColInput";
import { fileToBase64String, selectImage } from "@beenotung/tslib/file";
import { dataURItoFile, resizeBase64WithRatio } from "@beenotung/tslib/image";
import { area, district } from "../types";
export function PropertyModal(props: { createModalHandler: () => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [presentAlert] = useIonAlert();
  const propertyModal = useRef<HTMLIonModalElement>(null);
  const dismissAll = useCallback(() => {
    propertyModal.current?.dismiss();
    props.createModalHandler();
  }, [propertyModal, props]);
  const dismissProperty = useCallback(() => {
    setImages([]);
    propertyModal.current?.dismiss();
  }, [propertyModal]);
  const [newProperty] = usePostPropertyMutation();
  const pickImages = useCallback(async () => {
    console.log(123);
    let files = await selectImage({ multiple: true });

    for (let file of files) {
      let dataUrl = await fileToBase64String(file);
      dataUrl = await resizeBase64WithRatio(
        dataUrl,
        { width: 460, height: 900 },
        "with_in"
      );
      file = dataURItoFile(dataUrl, file);
    }
    console.log("12");
    setImages(files);
  }, [
    selectImage,
    fileToBase64String,
    resizeBase64WithRatio,
    dataURItoFile,
    setImages,
  ]);
  const OnSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      let formData = new FormData(form);
      for (let image of images) {
        formData.append("image", image);
      }
      let json;
      try {
        json = await newProperty(formData);
      } catch (error) {
        console.log(error);
      }
      showResponseMessage(json, presentAlert, dismissAll);
    },
    [presentAlert, dismissAll, newProperty, showResponseMessage, images]
  );

  const dev = useCallback((event: any) => {
    const form = event.target.parentElement;
    form.title.value = "sample title";
    form.rent.value = 123;
    form.area.value = "hong_kong";
    form.district.value = "eastern";
    form.location.value = "sample location";
    form.street.value = "sample value";
    form.building.value = "sample value";
    form.block.value = "A";
    form.floor.value = "11";
    form.room.value = "03";
    form.rental_start_at.value = new Date().toISOString();
    form.rental_end_at.value = new Date(Date.now() + 10000).toISOString();
  }, []);

  return (
    <IonModal
      ref={propertyModal}
      trigger="open-property-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <CommonModalHeader
        handlerOnDismiss={dismissProperty}
        name="List New Property"
      ></CommonModalHeader>
      <IonContent>
        <form onSubmit={OnSubmit}>
          {/* <IonButton onClick={dev}>dev</IonButton> */}
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
                <IonButtons>
                  <IonButton onClick={pickImages}>
                    Upload Property Pictures
                  </IonButton>
                  <IonLabel>Total files selected:{images.length}/20</IonLabel>
                </IonButtons>
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
