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
import { ProfileModal } from "./ProfileModal";
import "../theme/menu.modules.scss";
import { jojoAPI } from "../api/jojoAPI";
export let CommonHeader: FC<{ title: string; backUrl?: string }> = (props) => {
  const [modal, setModal] = useState("");
  const setDelayModal = useCallback(async () => {
    if (!isIphone) {
      await sleep(250);
    }
    setModal((model) => model.replace("to:", ""));
  }, [isIphone, sleep, setModal, modal]);
  const setModalMenu = useCallback(() => setModal("main-menu"), [setModal]);
  const setModalToProfile = useCallback(
    () => setModal("to:profile"),
    [setModal]
  );
  const dispatch = useDispatch();
  const setModalEmpty = useCallback(() => setModal(""), [setModal]);
  const logOutOnClick = useCallback(() => {
    dispatch(logout());
    dispatch(jojoAPI.util.resetApiState());
  }, [dispatch, logout, jojoAPI]);
  const toggleDarkModeHandler = useCallback(() => {
    document.body.classList.toggle("dark");
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
          <IonItem className="menu">
            <IonIcon icon={personCircle}></IonIcon>
          </IonItem>
          <IonList>
            <IonItem lines="none" onClick={setModalToProfile}>
              Profile
            </IonItem>
            <IonItem lines="none">
              Switch Light / Dark Mode
              <IonToggle
                slot="end"
                name="darkMode"
                onIonChange={toggleDarkModeHandler}
              />
            </IonItem>
            <IonItem lines="none" onClick={logOutOnClick}>
              Logout
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
      <IonModal isOpen={modal === "profile"}>
        <ProfileModal setModalEmpty={setModalEmpty} />
      </IonModal>
    </>
  );
};

CommonHeader = memo(CommonHeader);

export default memo(CommonHeader);
