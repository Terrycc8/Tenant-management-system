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
  IonAvatar,
} from "@ionic/react";
import { closeOutline, personCircle } from "ionicons/icons";
import { FC, memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { routes } from "../routes";
import { Capacitor } from "@capacitor/core";
import { isIphone } from "../platform";
import { sleep } from "../async";
import { ProfileModal } from "./ProfileModal";
import style from "../theme/menu.module.scss";
import { jojoAPI } from "../api/jojoAPI";
import { RootState } from "../RTKstore";
import serverURL from "../ServerDomain";
import { useGetProfileQuery } from "../api/profileAPI";
import {
  UseIonHeaderCollapse,
  useIonHeaderCollapse,
} from "./useHeaderCollapse";

export let CommonHeader: FC<{
  title: string;
  backUrl?: string;
  hideHeader: boolean;
}> = (props) => {
  const { data, isFetching, isLoading, error, isError } = useGetProfileQuery(
    {}
  );

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
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.toggle("dark");
    } else {
      document.body.classList.toggle("dark");
    }
  }, []);
  const { ref } = useIonHeaderCollapse({} as UseIonHeaderCollapse);
  const logicalRef = props.hideHeader ? ref : null;

  return (
    <>
      <IonHeader ref={logicalRef}>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="start">
            {props.backUrl ? (
              <IonBackButton defaultHref={props.backUrl}></IonBackButton>
            ) : null}
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={setModalMenu}>
              {data &&
              typeof data.avatar == "string" &&
              data.avatar.length > 0 ? (
                <IonAvatar className={style.profilePicTopRight}>
                  <img
                    className={style.test11}
                    src={serverURL + "/" + data.avatar}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = serverURL + "/defaultProfilePic.Png";
                    }}
                  />
                </IonAvatar>
              ) : (
                <IonIcon
                  className={style.profilePicTopRight}
                  slot="icon-only"
                  icon={personCircle}
                ></IonIcon>
              )}
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
        {data && typeof data.avatar == "string" && data.avatar.length > 0 ? (
          <IonAvatar className={style.profilePicMenu}>
            <img
              className={style.test11}
              src={serverURL + "/" + data.avatar}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = serverURL + "/defaultProfilePic.Png";
              }}
            />
          </IonAvatar>
        ) : (
          <IonIcon
            className={style.profilePicMenu}
            slot="icon-only"
            icon={personCircle}
          ></IonIcon>
        )}
        <IonContent>
          <IonItem></IonItem>
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
