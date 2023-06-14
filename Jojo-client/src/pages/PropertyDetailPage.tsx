import { FormEvent, useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import {
  useGetPropertyDetailQuery,
  usePatchPropertyMutation,
} from "../api/propertyAPI";
import { useParams } from "react-router";
import CommonHeader from "../components/CommonHeader";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import "@ionic/react/css/ionic-swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import serverURL from "../ServerDomain";
import { showMessage } from "../helper";
import { CustomSelector } from "../components/CustomSelector";
import { district, area } from "../types";
import RentDate from "../components/RentDate";

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, isLoading, isError } =
    useGetPropertyDetailQuery(id);
  const [editable, setEditable] = useState(true);
  const editMode = useCallback(() => {
    setEditable((state) => (state = !state));
  }, [setEditable]);
  const [presentAlert] = useIonAlert();
  const [updateProperty] = usePatchPropertyMutation();
  const saveEditing = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      let formData = new FormData(form);

      const json = await updateProperty({
        body: formData,
        id: data.id as number,
      });
      showMessage(json, presentAlert);
      setEditable((state) => (state = true));
    },
    [updateProperty, setEditable, presentAlert, showMessage, data]
  );

  return (
    <IonPage>
      <CommonHeader title="Property Details" />
      <IonContent>
        {isError ? (
          <>error</>
        ) : isLoading ? (
          <>isLoading</>
        ) : isFetching ? (
          <>loading</>
        ) : data ? (
          <form onSubmit={saveEditing}>
            <IonCard key={data.id}>
              <IonToolbar color="light">
                <IonButtons slot="end">
                  {editable ? (
                    <IonButton onClick={editMode} color="primary">
                      Edit
                    </IonButton>
                  ) : (
                    <IonButton type="submit" color="primary">
                      Save
                    </IonButton>
                  )}
                </IonButtons>
              </IonToolbar>
              <IonCardHeader>
                <IonCardTitle>
                  <IonInput
                    label="Title"
                    labelPlacement="stacked"
                    fill="solid"
                    readonly={editable}
                    value={data.title}
                    name="title"
                    maxlength={16}
                  ></IonInput>
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        label="Monthly rent"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.rent}
                        name="rent"
                        type="number"
                        maxlength={8}
                      ></IonInput>
                    </IonCol>
                    <IonCol>
                      <IonInput
                        label="tenant"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.tenant_id}
                        name="tenant_id"
                      ></IonInput>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <RentDate
                        readonly={editable}
                        name="rental_start_at"
                        id="dateTimeStart"
                        value={data.rental_start_at}
                      />
                    </IonCol>
                    <IonCol>
                      <RentDate
                        readonly={editable}
                        name="rental_end_at"
                        id="dateTimeEnd"
                        value={data.rental_end_at}
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        label="Room"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.room}
                        name="room"
                        maxlength={4}
                      ></IonInput>
                    </IonCol>
                    <IonCol>
                      <IonInput
                        label="Floor"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.floor}
                        name="floor"
                        maxlength={4}
                      ></IonInput>
                    </IonCol>
                    <IonCol>
                      <IonInput
                        label="Block"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.block}
                        name="block"
                        maxlength={4}
                      ></IonInput>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        label="Building / Estate"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.building}
                        name="building"
                        maxlength={32}
                      ></IonInput>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        label="Street"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.street}
                        name="street"
                        maxlength={32}
                      ></IonInput>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        label="Location"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        value={data.location}
                        name="location"
                        maxlength={32}
                      ></IonInput>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <CustomSelector
                        defaultValue={data.district}
                        readonly={editable}
                        title="District"
                        value={district}
                        name="district"
                      />
                    </IonCol>
                    <IonCol>
                      <CustomSelector
                        defaultValue={data.area}
                        readonly={editable}
                        title="Area"
                        value={area}
                        name="area"
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonInput
                      label="Last Modified: "
                      labelPlacement="stacked"
                      fill="outline"
                      readonly={true}
                      value={data.edited_at}
                      name="edited_at"
                    ></IonInput>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
              <Swiper
                modules={[Autoplay]}
                autoplay={false}
                scrollbar={{ draggable: false }}
              >
                {data.attachments.map((image: string, idx: number) => (
                  <SwiperSlide key={idx + 1}>
                    <img src={serverURL + "/" + image} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </IonCard>
          </form>
        ) : null}
      </IonContent>
    </IonPage>
  );
}
function updateProperty(formData: FormData, arg1: number) {
  throw new Error("Function not implemented.");
}
