import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/react";
import { routes } from "../routes";
import { Link } from "react-router-dom";

export function SignUpPage() {
  return (
    <IonPage>
      <IonContent>
        <IonItem lines="none">
          <IonLabel>
            Congratulations <br /> on verifying the email belongs to you
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Sign Up</IonLabel>
        </IonItem>
        <IonList>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol>
                <IonInput fill="solid" placeholder="Firsname"></IonInput>
              </IonCol>
              <IonCol>
                <IonInput fill="solid" placeholder="Lastname"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  fill="solid"
                  placeholder="youremail@gmail.com"
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput fill="solid" placeholder="Password"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  fill="solid"
                  placeholder="Confirmed password"
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel>Type of User</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem lines="none">
                  <IonSelect
                    aria-label="UserType"
                    interface="popover"
                    placeholder="Select Your User Type"
                  >
                    <IonSelectOption value="apples">LandLord</IonSelectOption>
                    <IonSelectOption value="oranges">Tenant</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
        <IonButton
          type="submit"
          size="large"
          expand="block"
          className="ion-padding"
        >
          Submit
        </IonButton>
      </IonContent>

      <IonFooter>
        <IonItem
          routerLink={routes.login}
          lines="none"
          className="ion-text-center"
        >
          back to login
        </IonItem>
      </IonFooter>
    </IonPage>
  );
}
