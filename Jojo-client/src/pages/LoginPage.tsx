import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useCallback, useRef, useState } from "react";
import { routes } from "../routes";
import { usePostUserLoginMutation } from "../api/loginQuery";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { FetchError } from "./types";
import { RootState } from "../RTKstore";
import { setErrors } from "../slices/errorsSlice";
import { useCheckBox } from "../useHook/useCheckBox";

export function LoginPage() {
  const ionPassword = useRef<HTMLIonInputElement | null>(null);
  const ionUsername = useRef<HTMLIonInputElement | null>(null);
  const [loginFetch] = usePostUserLoginMutation();
  const dispatch = useDispatch();
  const { checked, checkBoxOnClick } = useCheckBox();
  const errors = useSelector((state: RootState) => state.errors.errors);

  const loginOnClick = useCallback(async () => {
    let json: any;
    try {
      json = await loginFetch({
        email: ionUsername.current?.value?.toString(),
        password: ionPassword.current?.value?.toString(),
      });
    } catch (error) {
      dispatch(setErrors("Fetch Failed"));
    }

    if ("error" in json) {
      dispatch(setErrors((json.error as FetchError).data.message));
    } else {
      dispatch(setCredentials(json.data));
      dispatch(setErrors(""));
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonInput
              label="Your Username/ Email"
              labelPlacement="stacked"
              fill="solid"
              placeholder="Enter text"
              ref={ionUsername}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Password"
              labelPlacement="stacked"
              type={!checked ? "password" : "text"}
              fill="solid"
              ref={ionPassword}
              placeholder="Enter text"
            ></IonInput>
          </IonItem>
          {errors.length > 0 ? (
            errors.map((error, idx) => {
              return <div key={idx + 1}>{error}</div>;
            })
          ) : (
            <></>
          )}
          <IonCheckbox
            checked={checked}
            color="primary"
            onIonChange={checkBoxOnClick}
          >
            Show Password
          </IonCheckbox>
          <IonButton
            expand="block"
            className="ion-margin"
            color={"danger"}
            onClick={loginOnClick}
          >
            Login
          </IonButton>
          <IonLabel className="ion-text-center">
            Don't have an account?
          </IonLabel>

          <IonButton
            expand="block"
            className="ion-margin"
            color={"dark"}
            routerLink={routes.signup}
          >
            Create An Account
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
