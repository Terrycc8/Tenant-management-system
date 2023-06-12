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
import { usePostUserLoginMutation } from "../api/loginMutation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { FetchError } from "./types";

import { useCheckBox } from "../useHook/useCheckBox";
import { RootState } from "../RTKstore";

export function LoginPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const ionPassword = useRef<HTMLIonInputElement | null>(null);
  const ionUsername = useRef<HTMLIonInputElement | null>(null);
  const [loginFetch] = usePostUserLoginMutation();
  const dispatch = useDispatch();
  const { checked, checkBoxOnClick } = useCheckBox();
  const [errors, setErrors] = useState<string[]>([]);

  const loginOnClick = useCallback(async () => {
    let json: any;
    try {
      json = await loginFetch({
        email: ionUsername.current?.value?.toString(),
        password: ionPassword.current?.value?.toString(),
      });
    } catch (error) {
      setErrors((state) => (state = ["Fetch Failed"]));
    }

    if ("error" in json) {
      setErrors(
        (state) => (state = Array((json.error as FetchError).data.message))
      );
    } else {
      console.log(json.data);
      dispatch(setCredentials(json.data));
      setErrors((state) => (state = []));
      // window.location.href = "123";
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
            errors.map((error, idx) => <div key={idx + 1}>{error}</div>)
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
