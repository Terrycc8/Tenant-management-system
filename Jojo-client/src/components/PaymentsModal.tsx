import {
  IonModal,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonInput,
  useIonAlert,
  IonGrid,
  IonList,
  IonItem,
} from "@ionic/react";
import { showResponseMessage } from "../helper";
import { closeOutline } from "ionicons/icons";
import { FormEvent, useCallback, useRef, useState } from "react";
import {
  CustomSelector,
  CustomSelectorOnFetch,
  CustomSelectorOnFetchTenant,
} from "./CustomSelector";
import {
  useGetPropertyQuery,
  useGetPropertyDetailQuery,
} from "../api/propertyAPI";
import { usePostPaymentMutation } from "../api/paymentAPI";
import { CommonModalHeader } from "./CommonModalHeader";
import { CustomIonColInput } from "./CustomIonColInput";
import { fileToBase64String, selectImage } from "@beenotung/tslib/file";
import { dataURItoFile, resizeBase64WithRatio } from "@beenotung/tslib/image";
import RentDate from "./RentDate";
import { useQuery } from "@tanstack/react-query";
import serverURL from "../ServerDomain";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { PropertyListOutput } from "../types";

export function PaymentsModal(props: { createModalHandler: () => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [presentAlert] = useIonAlert();
  const paymentsModal = useRef<HTMLIonModalElement>(null);
  const dismissAll = useCallback(() => {
    paymentsModal.current?.dismiss();
    props.createModalHandler();
  }, [paymentsModal, props]);
  const dismissPayment = useCallback(() => {
    setImages([]);
    paymentsModal.current?.dismiss();
  }, [paymentsModal]);
  const [newPayment] = usePostPaymentMutation();
  const { data: dataProperty } = useGetPropertyQuery({});
  // const { data: dataPropertyList } = useGetPropertyDetailQuery({} as any);
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
      const json = await newPayment(formData);
      showResponseMessage(json, presentAlert, dismissAll);
    },
    [presentAlert, dismissAll, newPayment, showResponseMessage, images]
  );

  const token = useSelector((state: RootState) => state.auth.token);

  // let { data, isFetching, isLoading, error, isError } = useQuery({
  //   queryKey: ["/property"], // todo only, not a link, just a reference
  //   retry: false,
  //   queryFn: async () => {
  //     const res = await fetch(serverURL + "/property", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const result = await res.json();
  //     return result.data;
  //   },
  // });

  return (
    <IonModal
      ref={paymentsModal}
      trigger="open-payments-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <CommonModalHeader
        handlerOnDismiss={dismissPayment}
        name="Payment"
      ></CommonModalHeader>
      <IonContent>
        <form onSubmit={OnSubmit}>
          <IonList>
            <IonGrid className="ion-padding">
              <CustomIonColInput>
                <CustomSelectorOnFetch
                  title="Property"
                  name="title"
                  value={dataProperty}
                />
              </CustomIonColInput>
              {/* {data.length == 0 ? (
                <>no contact yet, please add contact first</>
              ) : (
                data.map((property: PropertyListOutput) => ( */}
              <IonInput
                label="Rent amount"
                name="rent"
                type="number"
                maxlength={8}
              >
                {/* {" "} */}
              </IonInput>
              {/* ))
              )} */}

              {/* <CustomIonColInput>
                <IonInput
                  label="Term:"
                  labelPlacement="floating"
                  name="term"
                  type="number"
                  maxlength={2}
                ></IonInput>
              </CustomIonColInput> */}

              {/* <CustomIonColInput>
                    <CustomSelectorOnFetch
                      title="Monthly rent"
                      name="rent"
                      value={property.rent}
                    />
                  </CustomIonColInput> */}

              <CustomIonColInput>
                <IonLabel>Start date</IonLabel>
                <RentDate name="billing_period_from" id="dateTimeStart" />
                <IonLabel>End date </IonLabel>
                <RentDate name="billing_period_to" id="dateTimeEnd" />
              </CustomIonColInput>

              <CustomIonColInput>
                <IonButtons>
                  <IonButton onClick={pickImages}>
                    Upload payment invoices
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
