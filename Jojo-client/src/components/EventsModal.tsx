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
import { closeOutline, images } from "ionicons/icons";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";

import { formToJson, showResponseMessage } from "../helper";

import { CustomIonColInput } from "./CustomIonColInput";
import { CommonModalHeader } from "./CommonModalHeader";
import { useGetPropertyQuery } from "../api/propertyAPI";
import { usePostEventMutation } from "../api/eventAPI";
import { event_type, event_priority } from "../types";
import { CustomSelector, CustomSelectorOnFetch } from "./CustomSelector";
import { resizeBase64WithRatio, dataURItoFile } from "@beenotung/tslib/image";
import { fileToBase64String, selectImage } from "@beenotung/tslib/file";

export function EventsModal(props: { createModalHandler: () => void }) {
  const { data } = useGetPropertyQuery({});
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
  const OnSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;

      const formData = new FormData(form);
      for (let image of images) {
        formData.append("image", image);
      }
      const json = await newEvent(formData);
      showResponseMessage(json, presentAlert, dismissAll);
    },
    [presentAlert, dismissAll, showResponseMessage, newEvent]
  );
  const [images, setImages] = useState<File[]>([]);
  const pickImages = useCallback(async () => {
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

    setImages((images) => {
      return (images = files);
    });
  }, [
    selectImage,
    fileToBase64String,
    resizeBase64WithRatio,
    dataURItoFile,
    setImages,
  ]);
  return (
    <IonModal
      ref={eventsModal}
      trigger="open-events-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
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
              <CustomIonColInput>
                <IonButtons>
                  <IonButton onClick={pickImages}>
                    Upload Property Pictures
                  </IonButton>
                  <IonLabel>Total files selected:{images.length}/5</IonLabel>
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
