import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { routes } from "../routes";
import { Link, Redirect } from "react-router-dom";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePostUserSignUpMutation } from "../api/loginMutation";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {
  formToJson,
  showResponseMessage,
  showResponseMessageSignUp,
} from "../helper";
import { RootState } from "../RTKstore";

import { useCheckBox } from "../useHook/useCheckBox";
import { FetchError, SignUpInput } from "../types";
import style from "../theme/signup.module.scss";
import { formatError } from "../components/formatError";
export function SignUpPage(props: { setPage(state: string): void }) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [signUp] = usePostUserSignUpMutation();
  const dispatch = useDispatch();
  const [password] = useState("");
  const { checked, checkBoxOnClick } = useCheckBox();
  const [presentAlert] = useIonAlert();
  const [errors, setErrors] = useState<string[]>([]);
  const SubmitBtnRef = useRef<HTMLIonButtonElement>(null);
  const signUpOnSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (SubmitBtnRef.current !== null) SubmitBtnRef.current.disabled = true;
    const form = event.target as HTMLFormElement;
    if (form["confirm_password"].value !== form["password"].value) {
      setErrors(["Those passwords didn’t match. Try again."]);
      return;
    }
    let json;
    try {
      json = await signUp(
        formToJson(form, [
          "first_name",
          "last_name",
          "email",
          "password",
          "user_type",
        ]) as SignUpInput
      );
      // const json = await signUp({
      //   first_name: "alice" + Math.floor(Math.random() * 50),
      //   last_name: "wong",
      //   email: Date.now() + "@gmail.com",
      //   password: "Aa!11234",
      //   user_type: "tenant",
      //   // user_type: "landlord",
      // });
      if ("error" in json) {
        let message = (json as any)?.error?.data?.message;

        setErrors(
          Array.isArray(message)
            ? message
            : typeof message == "string"
            ? [message]
            : [String(json.error)]
        );
        if (SubmitBtnRef.current !== null)
          SubmitBtnRef.current.disabled = false;
      } else {
        dispatch(setCredentials(json.data));
        setErrors([]);
        showResponseMessageSignUp(json, presentAlert, () => {
          if (SubmitBtnRef.current !== null)
            SubmitBtnRef.current.disabled = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const router = useIonRouter();

  useEffect(() => {
    if (token) {
      router.push(routes.home, "forward", "replace");
    }
  }, [token]);
  const setPageLogin = useCallback(() => {
    props.setPage("login");
  }, [props.setPage]);

  function renderFieldError(field: string) {
    return (
      <IonNote className={style.errorMsg}>
        {errors
          .filter((error) => error.includes(field))
          .map((error, idx) => (
            <div key={idx + 1}>{formatError(error)}</div>
          ))}
      </IonNote>
    );
  }
  console.log(errors);
  return (
    <IonPage>
      <IonContent className={style.signup_form}>
        {/* {token ? <Redirect to={routes.home} /> : null} */}

        <form onSubmit={signUpOnSubmit}>
          <div className={style.signup_label}>
            <IonLabel>Sign Up</IonLabel>
          </div>
          <div className={style.more_label}>
            <IonLabel>we need something more</IonLabel>
          </div>
          <IonList>
            <IonGrid>
              <IonRow className={style.signup_row}>
                <IonCol>
                  <IonInput
                    fill="solid"
                    placeholder="First Name"
                    name="first_name"
                    className={style.signup_input}
                  ></IonInput>
                </IonCol>
                <IonCol>
                  <IonInput
                    className={style.signup_input}
                    fill="solid"
                    placeholder="Last Name"
                    name="last_name"
                  ></IonInput>
                </IonCol>
              </IonRow>
              {renderFieldError("last_name")}
              {renderFieldError("first_name")}
              <IonRow>
                <IonCol>
                  <IonInput
                    className={style.signup_input}
                    fill="solid"
                    placeholder="please enter your email address"
                    name="email"
                  ></IonInput>
                </IonCol>
              </IonRow>
              {renderFieldError("email")}
              <IonRow>
                <IonCol>
                  <IonInput
                    className={style.signup_input}
                    fill="solid"
                    placeholder="Password"
                    name="password"
                    type={!checked ? "password" : "text"}
                    autoCapitalize="off"
                    data-initial-value={password}
                    // remark
                  ></IonInput>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonInput
                    className={style.signup_input}
                    fill="solid"
                    placeholder="Confirmed password"
                    name="confirm_password"
                    type={!checked ? "password" : "text"}
                    autoCapitalize="off"
                  ></IonInput>
                </IonCol>
              </IonRow>
              {renderFieldError("password")}
              <IonButtons>
                <IonCheckbox
                  className={style.show_pw_cb}
                  checked={checked}
                  color="primary"
                  onIonChange={checkBoxOnClick}
                ></IonCheckbox>
                <IonLabel className={style.show_pw_label}>
                  Show Password
                </IonLabel>
              </IonButtons>

              <IonRow>
                <IonCol>
                  <IonLabel className={style.user_type_label}>
                    Type of User
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className={style.select_col}>
                  <IonSelect
                    className={style.signup_select}
                    aria-label="UserType"
                    interface="popover"
                    placeholder="Select Your User Type"
                    name="user_type"
                  >
                    <IonSelectOption value="landlord">LandLord</IonSelectOption>
                    <IonSelectOption value="tenant">Tenant</IonSelectOption>
                  </IonSelect>
                </IonCol>
              </IonRow>
              {renderFieldError("user type")}
            </IonGrid>
          </IonList>
          <IonButton
            type="submit"
            size="large"
            expand="block"
            className={style.submit_btn}
            onSubmit={signUpOnSubmit}
            ref={SubmitBtnRef}
            // disabled
          >
            Submit
          </IonButton>
        </form>
      </IonContent>

      <IonFooter>
        <IonButton
          expand="block"
          // routerLink={routes.login}
          routerDirection="back"
          onClick={setPageLogin}
          className={style.back_btn}
        >
          back to login
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}
