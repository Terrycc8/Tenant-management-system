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
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { routes } from "../routes";
import { Link, Redirect } from "react-router-dom";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePostUserSignUpMutation } from "../api/loginMutation";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { formToJson } from "../helper";
import { RootState } from "../RTKstore";
import "../theme/signup.modules.scss";
import { useCheckBox } from "../useHook/useCheckBox";
import { FetchError, SignUpInput } from "../types";

export function SignUpPage(props: {
  setPage(cb: (state: string) => string): void;
}) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [signUp] = usePostUserSignUpMutation();
  const dispatch = useDispatch();
  const [password] = useState("");
  const { checked, checkBoxOnClick } = useCheckBox();

  const [errors, setErrors] = useState<string[]>([]);
  const signUpOnSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (form["confirm_password"].value !== form["password"].value) {
      setErrors(
        (state) => (state = ["Those passwords didn’t match. Try again."])
      );
      return;
    }
    // const json = await signUp(
    //   formToJson(form, [
    //     "first_name",
    //     "last_name",
    //     "email",
    //     "password",
    //     "user_type",
    //   ]) as SignUpInput
    // );
    const json = await signUp({
      first_name: "alice" + Math.floor(Math.random() * 50),
      last_name: "wong",
      email: Date.now() + "@gmail.com",
      password: "Aa!11234",
      user_type: "landlord",
    });
    if ("error" in json) {
      setErrors(
        (state) => (state = Array((json.error as FetchError).data.message))
      );
    } else {
      dispatch(setCredentials(json.data));
      setErrors((state) => (state = []));
    }
  }, []);

  const router = useIonRouter();

  useEffect(() => {
    if (token) {
      router.push(routes.home, "forward", "replace");
    }
  }, [token]);
  const setPageLogin = useCallback(() => {
    props.setPage((state: string) => (state = "login"));
  }, [props.setPage]);
  return (
    <IonPage>
      <IonContent className="signup-form">
        {/* {token ? <Redirect to={routes.home} /> : null} */}

        <form onSubmit={signUpOnSubmit}>
          <div className="signup-signup-label">
            <IonLabel>Sign Up</IonLabel>
          </div>
          <div className="signup-more-label">
            <IonLabel>we need something more</IonLabel>
          </div>
          <IonList>
            <IonGrid>
              <IonRow>
                <IonCol className="signup-col">
                  <IonInput
                    fill="solid"
                    placeholder="First Name"
                    name="first_name"
                    className="signup-input"
                  ></IonInput>
                </IonCol>
                <IonCol>
                  <IonInput
                    className="signup-input"
                    fill="solid"
                    placeholder="Last Name"
                    name="last_name"
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    className="signup-input"
                    fill="solid"
                    placeholder="please enter your email address"
                    name="email"
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    className="signup-input"
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
                    className="signup-input"
                    fill="solid"
                    placeholder="Confirmed password"
                    name="confirm_password"
                    type={!checked ? "password" : "text"}
                    autoCapitalize="off"
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonButtons>
                <IonCheckbox
                  checked={checked}
                  color="primary"
                  onIonChange={checkBoxOnClick}
                ></IonCheckbox>
                <IonLabel>Show Password</IonLabel>
              </IonButtons>

              {errors.length > 0 ? (
                errors.map((error: string, idx: number) => (
                  <div key={idx + 1}>{error}</div>
                ))
              ) : (
                <></>
              )}
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
                      name="user_type"
                    >
                      <IonSelectOption value="landlord">
                        LandLord
                      </IonSelectOption>
                      <IonSelectOption value="tenant">Tenant</IonSelectOption>
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
            className="signup-submit-btn"
            onSubmit={signUpOnSubmit}
          >
            Submit
          </IonButton>
        </form>
      </IonContent>

      <IonFooter>
        <IonItem
          // routerLink={routes.login}
          routerDirection="back"
          lines="none"
          className="ion-text-center"
          onClick={setPageLogin}
        >
          back to login
        </IonItem>
      </IonFooter>
    </IonPage>
  );
}
