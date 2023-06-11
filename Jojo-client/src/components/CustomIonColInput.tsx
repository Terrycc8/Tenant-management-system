import { IonRow, IonCol, IonInput } from "@ionic/react";

export function CustomIonColInput(props: { elem: JSX.Element }) {
  let { elem } = props;

  return (
    <IonRow>
      <IonCol>{elem}</IonCol>
    </IonRow>
  );
}

export function CustomIonColInput2(props: { elem: JSX.Element[] }) {
  let { elem } = props;

  return (
    <IonRow>
      <IonCol>{elem[0]}</IonCol>
      <IonCol>{elem[1]}</IonCol>
    </IonRow>
  );
}
export function CustomIonColInput3(props: { elem: JSX.Element[] }) {
  let { elem } = props;

  return (
    <IonRow>
      <IonCol>{elem[0]}</IonCol>
      <IonCol>{elem[1]}</IonCol>
      <IonCol>{elem[2]}</IonCol>
    </IonRow>
  );
}
