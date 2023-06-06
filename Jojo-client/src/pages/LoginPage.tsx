import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
} from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useCallback, useRef } from "react";
import { routes } from "../routes";
import { usePostUserLoginMutation } from "../api/loginQuery";

export function LoginPage() {
  const ionPassword = useRef<HTMLIonInputElement | null>(null);
  const ionUsername = useRef<HTMLIonInputElement | null>(null);
  const [loginFetch] = usePostUserLoginMutation({});

  const eyeOffOnClick = useCallback(() => {
    if (ionPassword.current && ionPassword.current.type == "password")
      ionPassword.current!.type = "text";
    else if (ionPassword.current && ionPassword.current.type == "text")
      ionPassword.current!.type = "password";
  }, []);
  const loginOnClick = useCallback(() => {
    loginFetch({
      username: ionUsername.current?.value?.toString(),
      password: ionPassword.current?.value?.toString(),
    });
  }, []);
  return (
    <IonPage>
      <IonContent>
        <IonTitle size="large">Sign In</IonTitle>
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
              type="password"
              fill="solid"
              ref={ionPassword}
              placeholder="Enter text"
            ></IonInput>
            <IonButton>
              <IonIcon icon={eyeOffOutline} onClick={eyeOffOnClick}></IonIcon>
            </IonButton>
          </IonItem>
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
