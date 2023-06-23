import { FormEvent, MouseEvent, useCallback, useEffect, useState } from "react";

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
  useIonViewDidLeave,
} from "@ionic/react";
import {
  useDeletePropertyMutation,
  useGetPropertyDetailQuery,
  usePatchPropertyMutation,
} from "../api/propertyAPI";
import { Redirect, useParams } from "react-router";
import CommonHeader from "../components/CommonHeader";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";

import "swiper/css/autoplay";
import "@ionic/react/css/ionic-swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import serverURL from "../ServerDomain";
import { showResponseMessage } from "../helper";
import { CustomSelector } from "../components/CustomSelector";
import { district, area, PropertyListOutput } from "../types";
import RentDate from "../components/RentDate";
import { routes } from "../routes";
import { format, parseISO } from "date-fns";
import { Loading } from "../components/Loading";

function noop() {}

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, isLoading, isError } =
    useGetPropertyDetailQuery(id);
  const [editable, setEditable] = useState(true);
  const [originalData, setOriginalData] = useState({});
  const editMode = useCallback((event: MouseEvent) => {
    setOriginalData(data);
    setEditable((state) => !state);
  }, []);
  const [presentAlert] = useIonAlert();
  const [updateProperty] = usePatchPropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const saveEditing = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const form = (event.nativeEvent.target as HTMLElement).closest(
        "form"
      ) as HTMLFormElement;

      // console.log("check if changed:", {
      //   originalData,
      //   form,
      // });

      const fields = [
        "title",
        "area",
        "district",
        "location",
        "street",
        "building",
        "block",
        "floor",
        "room",
        "rent",
        "rental_start_at",
        "rental_end_at",
      ];

      let formData = new FormData();
      formData.set("id", id);

      let newData = {};

      let hasChanged = false;
      for (let field of fields) {
        const oldValue = (originalData as any)[field];
        const newValue = form[field].value;

        formData.set(field, newValue);
        Object.assign(newData, { [field]: newValue });
        if (form[field].value != oldValue) {
          hasChanged = true;
        }
      }
      if (!hasChanged) {
        return;
      }
      let json;
      try {
        json = await updateProperty({
          body: formData,
          id: data.id as number,
        });
      } catch (error) {
        console.log(error);
      }

      setOriginalData(newData);

      showResponseMessage(json, presentAlert);
      setEditable(true);
    },
    [updateProperty, presentAlert, showResponseMessage, data, originalData]
  );

  useIonViewDidLeave(() => {
    setEditable(true);
  });
  const showAlert = useCallback(() => {
    presentAlert({
      header: "Delete property",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            let json;
            try {
              json = await deleteProperty({ id: data.id });
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    });
  }, [deleteProperty, data]);
  return (
    <IonPage>
      <CommonHeader
        title="Property Details"
        backUrl={routes.property}
        hideHeader={true}
      />
      <IonContent fullscreen>
        {isError ? (
          <Redirect to={routes.property}></Redirect>
        ) : isLoading ? (
          <Loading />
        ) : data ? (
          <form>
            <IonCard key={data.id}>
              <IonToolbar color="light">
                {editable ? (
                  <>
                    <IonButtons slot="start">
                      <IonButton onClick={showAlert} color="danger">
                        Delete
                      </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                      <IonButton onClick={editMode} color="primary">
                        Edit
                      </IonButton>
                    </IonButtons>
                  </>
                ) : (
                  <>
                    <IonButtons slot="start">
                      <IonButton onClick={editMode} color="primary">
                        Cancel
                      </IonButton>
                    </IonButtons>

                    <IonButtons slot="end">
                      <IonButton onClick={saveEditing} color="primary">
                        Update
                      </IonButton>
                    </IonButtons>
                  </>
                )}
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
                      value={format(parseISO(data.edited_at), "yyyy-MMM-dd-p")}
                      name="edited_at"
                      className="edited_at"
                    ></IonInput>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                navigation
                loop={false}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
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
