import {
  IonButton,
  IonButtons,
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
  IonImg,
  IonGrid,
  IonCard,
} from "@ionic/react";
import { memo, useCallback, useRef, useState } from "react";
import { routes } from "../routes";
import { usePostUserLoginMutation } from "../api/loginMutation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import style from "../theme/login.module.scss";
import { useCheckBox } from "../useHook/useCheckBox";
import { FetchError } from "../types";
import { Style } from "@capacitor/status-bar";
import companyLogo from "../assets/companyLogo.jpg";
import "./LoginPage.css";

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
      <IonContent className={style.login_form}>
        <IonItem className="logo">
          <IonImg className="logo-image" src={companyLogo} alt="companyLogo" />
        </IonItem>
        {/* <div className={style.login_app_name}>E-Housing</div> */}
        <div className={style.login_signin_label}>Sign in</div>
        <IonList>
          <IonInput
            className={style.login_input}
            label="Your Username/ Email"
            labelPlacement="stacked"
            fill="solid"
            placeholder=""
            ref={ionUsername}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                loginOnClick();
              }
            }}
          ></IonInput>

          <IonInput
            className="login-input"
            label="Your Username/ Email"
            labelPlacement="stacked"
            fill="solid"
            placeholder=""
            ref={ionUsername}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                loginOnClick();
              }
            }}
          ></IonInput>

          <IonInput
            className={style.login_input}
            label="Password"
            labelPlacement="stacked"
            type={!checked ? "password" : "text"}
            fill="solid"
            ref={ionPassword}
            placeholder=""
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                loginOnClick();
              }
            }}
          ></IonInput>

          {errors.length > 0
            ? errors.map((error, idx) => <div key={idx + 1}>{error}</div>)
            : null}
          <div className={style.login_show_pw_label}>
            <IonButtons slot="start">
              <IonCheckbox
                checked={checked}
                color="primary"
                onIonChange={checkBoxOnClick}
              ></IonCheckbox>

              <IonLabel> Show Password</IonLabel>
            </IonButtons>
          </div>
          <IonButton className={style.login_btn} onClick={loginOnClick}>
            Login
          </IonButton>
          <div className={style.login_account_label}>
            <IonLabel>Don't have an account?</IonLabel>
          </div>
          <IonButton
            className={style.login_signup_btn}
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
