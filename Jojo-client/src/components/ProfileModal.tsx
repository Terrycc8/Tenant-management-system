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
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { useGetProfileQuery } from "../api/profileAPI";
import { CustomIonColInput } from "./CustomIonColInput";
import { closeOutline, image, personCircle } from "ionicons/icons";
import serverURL from "../ServerDomain";
import "../theme/menu.module.scss";
import { useState, useCallback, FormEvent } from "react";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { jojoAPI } from "../api/jojoAPI";
import {
  useDeleteUserMutation,
  usePatchUserMutation,
} from "../api/loginMutation";
import { fileToBase64String, selectImage } from "@beenotung/tslib/file";
import { dataURItoFile, resizeBase64WithRatio } from "@beenotung/tslib/image";
import { showResponseMessage } from "../helper";
import { Style } from "@capacitor/status-bar";
import style from "../theme/menu.module.scss";
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
  const [errors, setErrors] = useState<string[]>([]);
  const [presentAlert] = useIonAlert();
  const [originalData, setOriginalData] = useState({});
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
  const [images, setImages] = useState<File>();
  const pickImages = useCallback(async () => {
    let file = await selectImage({ multiple: false });

    let dataUrl = await fileToBase64String(file[0]);
    dataUrl = await resizeBase64WithRatio(
      dataUrl,
      { width: 460, height: 900 },
      "with_in"
    );
    let compressedFile = dataURItoFile(dataUrl, file[0]);

    setImages((images) => {
      return (images = compressedFile);
    });
  }, [
    selectImage,
    fileToBase64String,
    resizeBase64WithRatio,
    dataURItoFile,
    setImages,
  ]);
  const [patchUser] = usePatchUserMutation();

  const saveEditing = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;

      if (form["confirm_password"].value !== form["password"].value) {
        setErrors(
          (state) => (state = ["Those passwords didn’t match. Try again."])
        );
        return;
      }
      let fields = ["first_name", "last_name", "password"];
      if (form["password"].value.length == 0) {
        fields = ["first_name", "last_name"];
      }
      let formData = new FormData();
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

      for (let field of fields) {
        formData.set(field, form[field].value);
      }
      if (images !== undefined) {
        formData.append("image", images);
      }
      const json = await patchUser({ body: formData, id: data.id });
      setOriginalData(newData);
      showResponseMessage(json, presentAlert);
      setEditable(true);
    },
    [
      patchUser,
      setEditable,
      presentAlert,
      showResponseMessage,
      data,
      images,
      originalData,
    ]
  );

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
      <IonContent className={style.profileContent}>
        <IonCard>
          {isError ? (
            String(error)
          ) : isLoading ? (
            <>loading</>
          ) : isFetching ? (
            <>fetching</>
          ) : data ? (
            <>
              <form onSubmit={saveEditing}>
                <IonToolbar>
                  {editable ? (
                    <>
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
                        <IonButton type="submit" color="primary">
                          Modify
                        </IonButton>
                      </IonButtons>
                    </>
                  )}
                </IonToolbar>
                <div className={style.profilePicEditDiv}>
                  {data &&
                  typeof data.avatar == "string" &&
                  data.avatar.length > 0 ? (
                    <IonAvatar className={style.profilePicEdit}>
                      <img
                        className={style.test11}
                        src={serverURL + "/" + data.avatar}
                        alt=""
                      />
                    </IonAvatar>
                  ) : (
                    <IonIcon
                      className={style.profilePicEdit}
                      slot="icon-only"
                      icon={personCircle}
                    ></IonIcon>
                  )}
                </div>
                <IonList>
                  <IonGrid>
                    <CustomIonColInput>
                      <IonButtons className={style.profilePicEditBtn}>
                        <IonButton onClick={pickImages} disabled={editable}>
                          Edit Profile Pictures
                        </IonButton>
                      </IonButtons>
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
                        className="user_type"
                        maxlength={8}
                      ></IonInput>
                    </CustomIonColInput>
                    <CustomIonColInput>
                      <IonInput
                        label="Password"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        name="password"
                        className="password"
                        type="password"
                      ></IonInput>
                    </CustomIonColInput>
                    <CustomIonColInput>
                      <IonInput
                        label="Confirmed Password"
                        labelPlacement="stacked"
                        fill="solid"
                        readonly={editable}
                        name="confirm_password"
                        className="confirm_password"
                        type="password"
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
                        className="last_login_time"
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
                        className="registered_at"
                      ></IonInput>
                    </CustomIonColInput>
                  </IonGrid>
                </IonList>
              </form>
            </>
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
