import {
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonInput,
  IonList,
  IonModal,
  IonToolbar,
  useIonViewDidLeave,
} from "@ionic/react";
import { closeOutline, personCircle, shapesOutline } from "ionicons/icons";
import { memo, useCallback, useRef } from "react";
import { EventsModal } from "./EventsModal";
import { event_type, event_priority } from "../pages/types";
import { CustomIonColInput } from "./CustomIonColInput";
import { CustomSelectorOnFetch, CustomSelector } from "./CustomSelector";
import { routes } from "../routes";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { SettingModal } from "./SettingModal";
import { CommonModalHeader } from "./CommonModalHeader";

export const ProfileButton = memo(() => {
  return (
    <IonButton id="open-profile-modal">
      <IonIcon icon={personCircle}></IonIcon>

      <ProfileModal />
    </IonButton>
  );
});

const ProfileModal = memo(() => {
  const profileModal = useRef<HTMLIonModalElement>(null);
  const dismissProfile = useCallback(() => {
    profileModal.current?.dismiss({ data: "1" });
  }, [profileModal]);
  // profileModal.current?.onDidDismiss().then((data) => {
  //   console.log("1");
  // });

  return (
    <IonModal
      ref={profileModal}
      trigger="open-profile-modal"
      onWillDismiss={dismissProfile}
    >
      <CommonModalHeader name="Profile" handlerOnDismiss={dismissProfile} />

      <IonContent>
        <IonList>
          <IonItem
            lines="none"
            button={true}
            onClick={dismissProfile}
            id="open-setting-modal"
            className="ion-margin"
          ></IonItem>
          <SettingModal />
        </IonList>
      </IonContent>
    </IonModal>
  );
});
