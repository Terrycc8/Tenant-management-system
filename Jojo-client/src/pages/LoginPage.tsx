import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";

export function LoginPage() {
  return (
    <IonPage>
      <IonList>
        <IonLabel>Sign In</IonLabel>
        <IonItem>
          <IonInput
            label="Your Username/ Email"
            labelPlacement="stacked"
            fill="solid"
            placeholder="Enter text"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            label="Password"
            labelPlacement="stacked"
            type="password"
            fill="solid"
            placeholder="Enter text"
          ></IonInput>
          <IonButton fill="clear"></IonButton>
        </IonItem>
        <IonButton expand="block" className="ion-margin" color={"danger"}>
          Login
        </IonButton>
        <IonLabel className="">Don't have an account?</IonLabel>

        <IonButton expand="block" className="ion-margin" color={"dark"}>
          Create An Account
        </IonButton>
      </IonList>
    </IonPage>
  );
}
