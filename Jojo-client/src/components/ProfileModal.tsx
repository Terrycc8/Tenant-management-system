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
} from "@ionic/react";
import { useGetProfileQuery } from "../api/profileAPI";
import { CustomIonColInput } from "./CustomIonColInput";
import {
  closeCircleOutline,
  closeCircleSharp,
  closeOutline,
} from "ionicons/icons";

export function ProfileModal(pros: { setModalEmpty: () => void }) {
  const {
    data,
    isFetching,
    isLoading,
    error: fetchError,
    isError,
  } = useGetProfileQuery({});
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={pros.setModalEmpty}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonList>
            <IonGrid>
              <CustomIonColInput>
                <IonItem>avatar</IonItem>
              </CustomIonColInput>
              <CustomIonColInput>
                <IonInput value="first_name"></IonInput>
                <IonInput value="last_name"></IonInput>
              </CustomIonColInput>
              <CustomIonColInput>
                <IonInput value="email"></IonInput>
              </CustomIonColInput>
              <CustomIonColInput>
                <IonInput value="user_type"></IonInput>
              </CustomIonColInput>
              <CustomIonColInput>
                <IonInput value="last_login_time"></IonInput>
              </CustomIonColInput>
              <CustomIonColInput>
                <IonInput value="registered_at"></IonInput>
              </CustomIonColInput>
            </IonGrid>
          </IonList>
        </IonCard>
        <IonButton className="ion-margin" expand="block" color="danger">
          Delete Account
        </IonButton>
      </IonContent>
    </>
  );
}
