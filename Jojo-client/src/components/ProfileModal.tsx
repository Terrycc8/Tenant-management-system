import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonGrid,
  IonInput,
  IonItem,
  IonCard,
  IonIcon,
  useIonAlert,
} from "@ionic/react";
import { useGetProfileQuery } from "../api/profileAPI";
import { CustomIonColInput } from "./CustomIonColInput";
import { closeOutline, image, personCircle } from "ionicons/icons";
import serverURL from "../ServerDomain";
import "../theme/menu.modules.scss";
import { useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { jojoAPI } from "../api/jojoAPI";
import { useDeleteUserMutation } from "../api/loginMutation";
export function ProfileModal(pros: { setModalEmpty: () => void }) {
  const { data, isFetching, isLoading, error, isError } = useGetProfileQuery(
    {}
  );
  const [deleteUser] = useDeleteUserMutation();
  const [editable, setEditable] = useState(true);
  const editMode = useCallback(() => {
    setEditable((state) => {
      return (state = !state);
    });
  }, [setEditable]);
  const dispatch = useDispatch();

  const [presentAlert] = useIonAlert();
  const showAlert = useCallback(() => {
    presentAlert({
      header: "Delete Account",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            const json = await deleteUser({});
            dispatch(logout());
            dispatch(jojoAPI.util.resetApiState());
          },
        },
      ],
    });
  }, [deleteUser, dispatch, logout, presentAlert, jojoAPI]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={pros.setModalEmpty}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          {isError ? (
            String(error)
          ) : isLoading ? (
            <>loading</>
          ) : isFetching ? (
            <>fetching</>
          ) : data ? (
            <IonList>
              <IonGrid>
                <CustomIonColInput>
                  {data.avatar ? (
                    <img
                      className="profilePic"
                      src={serverURL + "/" + data.avatar}
                    />
                  ) : (
                    <IonIcon
                      className="profilePic"
                      icon={personCircle}
                    ></IonIcon>
                  )}
                </CustomIonColInput>
                <CustomIonColInput>
                  <IonInput
                    label="First Name"
                    labelPlacement="stacked"
                    fill="solid"
                    readonly={editable}
                    value={data.first_name}
                    name="first_name"
                    maxlength={10}
                  ></IonInput>
                  <IonInput
                    label="Last Name"
                    labelPlacement="stacked"
                    fill="solid"
                    readonly={editable}
                    value={data.last_name}
                    name="last_name"
                    maxlength={10}
                  ></IonInput>
                </CustomIonColInput>
                <CustomIonColInput>
                  <IonInput
                    label="Email"
                    labelPlacement="stacked"
                    fill="solid"
                    readonly
                    value={data.email}
                    name="email"
                    maxlength={128}
                  ></IonInput>
                </CustomIonColInput>
                <CustomIonColInput>
                  <IonInput
                    label="User Type"
                    labelPlacement="stacked"
                    fill="solid"
                    readonly
                    value={data.user_type}
                    name="user_type"
                    maxlength={8}
                  ></IonInput>
                </CustomIonColInput>
                <CustomIonColInput>
                  <IonInput
                    label="Last Login Time"
                    labelPlacement="stacked"
                    fill="solid"
                    readonly
                    value={format(
                      parseISO(data.last_login_time),
                      "yyyy-MMM-dd-p"
                    )}
                    name="last_login_time"
                  ></IonInput>
                </CustomIonColInput>
                <CustomIonColInput>
                  <IonInput
                    label="Registered at"
                    labelPlacement="stacked"
                    fill="solid"
                    readonly
                    value={format(
                      parseISO(data.registered_at),
                      "yyyy-MMM-dd-p"
                    )}
                    name="registered_at"
                  ></IonInput>
                </CustomIonColInput>
              </IonGrid>
            </IonList>
          ) : null}
        </IonCard>
        <IonButton
          className="ion-margin"
          expand="block"
          color="danger"
          onClick={showAlert}
        >
          Delete Account
        </IonButton>
      </IonContent>
    </>
  );
}
