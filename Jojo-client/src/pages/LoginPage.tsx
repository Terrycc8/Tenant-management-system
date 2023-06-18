import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { memo, useCallback, useRef, useState } from "react";
import { routes } from "../routes";
import { usePostUserLoginMutation } from "../api/loginMutation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

import { useCheckBox } from "../useHook/useCheckBox";
import { FetchError } from "../types";

export function LoginPage(props: {
  setPage(cb: (state: string) => string): void;
}) {
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
      console.log("setC");
      dispatch(setCredentials(json.data));
      setErrors((state) => (state = []));
    }
  }, [
    loginFetch,
    setCredentials,
    setErrors,
    dispatch,
    ionUsername,
    ionPassword,
  ]);
  const setPageRegister = useCallback(() => {
    props.setPage((state: string) => (state = "register"));
  }, [props.setPage]);
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
          {errors.length > 0
            ? errors.map((error, idx) => <div key={idx + 1}>{error}</div>)
            : null}
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
            // routerLink={routes.signup}
            onClick={setPageRegister}
          >
            Create An Account
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
