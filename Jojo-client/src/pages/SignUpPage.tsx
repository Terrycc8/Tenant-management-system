import {
  IonButton,
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
} from "@ionic/react";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import { FormEvent, useCallback, useRef, useState } from "react";
import { usePostUserSignUpMutation } from "../api/loginQuery";
import { FetchError } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { formToJson } from "../helper";
import { RootState } from "../RTKstore";
import { setErrors } from "../slices/errorsSlice";
import { useCheckBox } from "../useHook/useCheckBox";

export function SignUpPage() {
  const [signUp] = usePostUserSignUpMutation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const { checked, checkBoxOnClick } = useCheckBox();
  const errors = useSelector((state: RootState) => state.errors.errors);

  const signUpOnSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (form["confirm_password"].value !== form["password"].value) {
      dispatch(setErrors(["Those passwords didn’t match. Try again."]));
      return;
    }
    const json = await signUp(
      formToJson(form, [
        "first_name",
        "last_name",
        "email",
        "password",
        "user_type",
      ])
    );
    if ("error" in json) {
      dispatch(setErrors((json.error as FetchError).data.message));
    } else {
      dispatch(setCredentials(json.data));
      dispatch(setErrors(""));
    }
  }, []);

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={signUpOnSubmit}>
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
                    placeholder="First Name"
                    name="first_name"
                  ></IonInput>
                </IonCol>
                <IonCol>
                  <IonInput
                    fill="solid"
                    placeholder="Last Name"
                    name="last_name"
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    fill="solid"
                    placeholder="youremail@gmail.com"
                    name="email"
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
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
                    fill="solid"
                    placeholder="Confirmed password"
                    name="confirm_password"
                    type={!checked ? "password" : "text"}
                    autoCapitalize="off"
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonCheckbox
                checked={checked}
                color="primary"
                onIonChange={checkBoxOnClick}
              >
                Show Password
              </IonCheckbox>
              {errors.length > 0 ? (
                errors.map((error, idx) => <div key={idx + 1}>{error}</div>)
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
            className="ion-padding"
            onSubmit={signUpOnSubmit}
          >
            Submit
          </IonButton>
        </form>
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
