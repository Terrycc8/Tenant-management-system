import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonToggle,
  IonLabel,
  IonBackButton,
} from "@ionic/react";
import { closeOutline, personCircle } from "ionicons/icons";
import { FC, memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { routes } from "../routes";
import { Capacitor } from "@capacitor/core";
import { isIphone } from "../platform";
import { sleep } from "../async";

export let CommonHeader: FC<{ title: string; backUrl?: string }> = (props) => {
  const [modal, setModal] = useState("");
  const setDelayModal = useCallback(async () => {
    if (!isIphone) {
      await sleep(250);
    }
    setModal((model) => model.replace("to:", ""));
  }, [isIphone]);
  const setModalMenu = useCallback(() => setModal("main-menu"), [setModal]);
  const setModalToProfile = useCallback(
    () => setModal("to:profile"),
    [setModal]
  );
  const dispath = useDispatch();
  const setModalEmpty = useCallback(() => setModal(""), [setModal]);
  const logOutOnClick = useCallback(() => {
    dispath(logout());
  }, []);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="start">
            {props.backUrl ? (
              <IonBackButton defaultHref={props.backUrl}></IonBackButton>
            ) : null}
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={setModalMenu}>
              <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonModal
        isOpen={modal === "main-menu"}
        onIonModalDidDismiss={setDelayModal}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={setModalEmpty}>
                <IonIcon icon={closeOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button lines="none" onClick={setModalToProfile}>
              Profile
            </IonItem>
            <IonItem lines="none" button={true} onClick={logOutOnClick}>
              Logout
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
      <IonModal isOpen={modal === "profile"}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={setModalEmpty}>Back</IonButton>
            </IonButtons>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList></IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

CommonHeader = memo(CommonHeader);

export default memo(CommonHeader);
