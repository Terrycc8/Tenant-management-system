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
import { useCallback, useRef } from "react";
import { usePostUserSignUpMutation } from "../api/loginQuery";
import { FetchError } from "./types";
import { useDispatch } from "react-redux";
import { setCredentials } from "../loginSlice";

export function SignUpPage() {
  const firstName = useRef<HTMLIonInputElement | null>(null);
  const lastName = useRef<HTMLIonInputElement | null>(null);
  const email = useRef<HTMLIonInputElement | null>(null);
  const password = useRef<HTMLIonInputElement | null>(null);
  const confirmedPassword = useRef<HTMLIonInputElement | null>(null);
  const userType = useRef<HTMLIonSelectElement | null>(null);
  const [signUp] = usePostUserSignUpMutation();
  const dispatch = useDispatch();

  const signUpOnSubmit = useCallback(async () => {
    const json = await signUp({
      firstName: firstName.current?.value?.toString(),
      lastName: lastName.current?.value?.toString(),
      email: email.current?.value?.toString(),
      password: password.current?.value?.toString(),
      confirmedPassword: confirmedPassword.current?.value?.toString(),
      userType: userType.current?.value.toString(),
    });
    if ("error" in json) {
      console.log((json.error as FetchError).data.message);
    } else {
      dispatch(setCredentials(json.data));
    }
  }, []);
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
                <IonInput
                  fill="solid"
                  label="First Name"
                  ref={firstName}
                ></IonInput>
              </IonCol>
              <IonCol>
                <IonInput
                  fill="solid"
                  placeholder="Lastname"
                  ref={lastName}
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  fill="solid"
                  placeholder="youremail@gmail.com"
                  ref={email}
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  fill="solid"
                  placeholder="Password"
                  ref={password}
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput
                  fill="solid"
                  placeholder="Confirmed password"
                  ref={confirmedPassword}
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
                    ref={userType}
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
          onSubmit={signUpOnSubmit}
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
